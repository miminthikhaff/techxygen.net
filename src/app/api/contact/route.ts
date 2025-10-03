import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, role, projectType, budget, timeline, message } = body

    // Validate required fields
    if (!name || !email || !company || !projectType || !budget || !timeline || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Save to database
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        company,
        message: JSON.stringify({
          role,
          projectType,
          budget,
          timeline,
          phone,
          details: message
        })
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        company,
        phone,
        role,
        projectType,
        budget,
        timeline,
        message,
        submissionId: submission.id
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        submissionId: submission.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

