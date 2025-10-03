import { NextResponse } from 'next/server'

// Minimal placeholder counts endpoint
export async function GET() {
  return NextResponse.json({
    contactSubmissions: 0,
    jobApplications: 0,
    emailsSentToday: 0,
  })
}



