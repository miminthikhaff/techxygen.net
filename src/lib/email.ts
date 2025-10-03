/**
 * Email service utilities for TechXygen
 * Supports multiple email providers with fallback options
 * - Resend (API-based)
 * - SendGrid (API-based) 
 * - Nodemailer (SMTP-based)
 */

import nodemailer from 'nodemailer'

export interface EmailData {
  to: string | string[]
  from: string
  subject: string
  html: string
  replyTo?: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  phone?: string
  role?: string
  projectType: string
  budget: string
  timeline: string
  message: string
  submissionId: string
}

export interface JobApplicationData {
  name: string
  email: string
  phone?: string
  position: string
  experience: string
  coverLetter: string
  resumeUrl?: string
  applicationId: string
}

/**
 * Send email using Resend service
 */
export async function sendEmailWithResend(data: EmailData): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Resend API error: ${errorData.message || 'Unknown error'}`)
  }

  return await response.json()
}

/**
 * Send email using SendGrid service
 */
export async function sendEmailWithSendGrid(data: EmailData): Promise<void> {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
  
  if (!SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY not configured')
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: Array.isArray(data.to) ? data.to.map(email => ({ email })) : [{ email: data.to }],
        reply_to: data.replyTo ? { email: data.replyTo } : undefined,
      }],
      from: { email: data.from },
      subject: data.subject,
      content: [{
        type: 'text/html',
        value: data.html,
      }],
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`SendGrid API error: ${errorData.message || 'Unknown error'}`)
  }
}

/**
 * Send email using Nodemailer SMTP
 */
export async function sendEmailWithSMTP(data: EmailData): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration incomplete. Required: SMTP_HOST, SMTP_USER, SMTP_PASS')
  }

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587'),
    secure: SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    // Additional options for better deliverability
    tls: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  })

  // Verify connection configuration
  try {
    await transporter.verify()
  } catch (error) {
    throw new Error(`SMTP connection failed: ${error}`)
  }

  // Prepare mail options
  const mailOptions = {
    from: SMTP_FROM || SMTP_USER,
    to: Array.isArray(data.to) ? data.to.join(', ') : data.to,
    subject: data.subject,
    html: data.html,
    replyTo: data.replyTo,
  }

  // Send email
  const result = await transporter.sendMail(mailOptions)
  console.log('SMTP email sent successfully:', result.messageId)
}

/**
 * Send email with automatic provider selection
 * Priority: Resend → SendGrid → SMTP → Console fallback
 */
export async function sendEmail(data: EmailData): Promise<void> {
  const errors: Record<string, unknown> = {}

  // Try Resend first (if configured)
  if (process.env.RESEND_API_KEY) {
    try {
      await sendEmailWithResend(data)
      return // Success, exit early
    } catch (resendError) {
      errors.resend = resendError
      console.warn('Resend failed:', resendError)
    }
  }

  // Try SendGrid (if configured)
  if (process.env.SENDGRID_API_KEY) {
    try {
      await sendEmailWithSendGrid(data)
      return // Success, exit early
    } catch (sendGridError) {
      errors.sendgrid = sendGridError
      console.warn('SendGrid failed:', sendGridError)
    }
  }

  // Try SMTP (if configured)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      await sendEmailWithSMTP(data)
      return // Success, exit early
    } catch (smtpError) {
      errors.smtp = smtpError
      console.warn('SMTP failed:', smtpError)
    }
  }

  // All services failed, log to console as fallback
  console.error('All email services failed:', errors)
  console.log('--- FALLBACK EMAIL LOG ---')
  console.log('To:', data.to)
  console.log('Subject:', data.subject)
  console.log('From:', data.from)
  console.log('HTML Content:', data.html)
  console.log('----------------------------')
  
  // Don't throw error in development, just log
  if (process.env.NODE_ENV === 'production') {
    throw new Error('All email services unavailable')
  }
}

/**
 * Generate contact form email HTML
 */
export function generateContactEmailHTML(data: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3A0519;">New Enterprise Consultation Request</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #3A0519; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.role ? `<p><strong>Role:</strong> ${data.role}</p>` : ''}
      </div>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #3A0519; margin-top: 0;">Project Details</h3>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Budget Range:</strong> ${data.budget}</p>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
      </div>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #3A0519; margin-top: 0;">Project Description</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>

      <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #666;">
          <strong>Submission ID:</strong> ${data.submissionId}<br>
          <strong>Received:</strong> ${new Date().toLocaleString()}
        </p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          This is an automated notification from the TechXygen contact form.
        </p>
      </div>
    </div>
  `
}

/**
 * Generate job application email HTML
 */
export function generateJobApplicationEmailHTML(data: JobApplicationData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3A0519;">New Job Application Received</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #3A0519; margin-top: 0;">Applicant Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Position:</strong> ${data.position}</p>
        <p><strong>Experience:</strong> ${data.experience}</p>
      </div>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #3A0519; margin-top: 0;">Cover Letter</h3>
        <p style="white-space: pre-wrap;">${data.coverLetter}</p>
      </div>

      ${data.resumeUrl ? `
        <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3A0519; margin-top: 0;">Resume</h3>
          <p><a href="${data.resumeUrl}" style="color: #3A0519; text-decoration: none;">📄 Download Resume</a></p>
        </div>
      ` : ''}

      <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #666;">
          <strong>Application ID:</strong> ${data.applicationId}<br>
          <strong>Received:</strong> ${new Date().toLocaleString()}
        </p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">
          This is an automated notification from the TechXygen job application system.
        </p>
      </div>
    </div>
  `
}

/**
 * Send contact form notification email
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const emailData: EmailData = {
    from: 'TechXygen Contact <noreply@techxygen.net>',
    to: ['info@techxygen.net'],
    subject: `New Enterprise Consultation Request from ${data.name} - ${data.company}`,
    html: generateContactEmailHTML(data),
    replyTo: data.email,
  }

  await sendEmail(emailData)
}

/**
 * Send job application notification email
 */
export async function sendJobApplicationEmail(data: JobApplicationData): Promise<void> {
  const emailData: EmailData = {
    from: 'TechXygen Careers <careers@techxygen.net>',
    to: ['hr@techxygen.net'],
    subject: `New Job Application: ${data.name} for ${data.position}`,
    html: generateJobApplicationEmailHTML(data),
    replyTo: data.email,
  }

  await sendEmail(emailData)
}
