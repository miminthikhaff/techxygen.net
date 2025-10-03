import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendJobApplicationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const experience = formData.get('experience') as string
    const coverLetter = formData.get('coverLetter') as string
    const resume = formData.get('resume') as File | null

    // Validate required fields
    if (!name || !email || !position || !experience || !coverLetter) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate file if provided
    if (resume && resume.size > 0) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      
      if (resume.size > maxSize) {
        return NextResponse.json(
          { error: 'Resume file too large. Maximum size is 10MB.' },
          { status: 400 }
        )
      }

      if (!allowedTypes.includes(resume.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload PDF, DOC, or DOCX files only.' },
          { status: 400 }
        )
      }
    }

    // Create Supabase client
    const supabase = await createClient()

    let resumeUrl = null

    // Upload resume file if provided
    if (resume && resume.size > 0) {
      try {
        const fileExt = resume.name.split('.').pop()
        const fileName = `${Date.now()}-${name.replace(/\s+/g, '-').toLowerCase()}.${fileExt}`
        const filePath = `resumes/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('job-applications')
          .upload(filePath, resume, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('File upload error:', uploadError)
          return NextResponse.json(
            { error: 'Failed to upload resume file' },
            { status: 500 }
          )
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('job-applications')
          .getPublicUrl(filePath)

        resumeUrl = urlData.publicUrl
      } catch (fileError) {
        console.error('File processing error:', fileError)
        return NextResponse.json(
          { error: 'Failed to process resume file' },
          { status: 500 }
        )
      }
    }

    // Find the job posting ID by position title
    const { data: jobPosting, error: jobError } = await supabase
      .from('job_postings')
      .select('id')
      .eq('title', position)
      .eq('is_active', true)
      .single()

    if (jobError || !jobPosting) {
      console.error('Job posting not found:', jobError)
      return NextResponse.json(
        { error: 'Job posting not found or no longer active' },
        { status: 400 }
      )
    }

    // Save application to database
    const { data: application, error: dbError } = await supabase
      .from('job_applications')
      .insert({
        job_id: jobPosting.id,
        name,
        email,
        phone: phone || null,
        experience,
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        status: 'pending'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save application' },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      await sendJobApplicationEmail({
        name,
        email,
        phone,
        position,
        experience,
        coverLetter,
        resumeUrl: resumeUrl ?? undefined,
        applicationId: application.id
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Job application submitted successfully',
        applicationId: application.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Job application error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

