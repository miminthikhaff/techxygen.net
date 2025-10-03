/**
 * Simple test script for API endpoints
 * Run with: node test-api.js
 */

const BASE_URL = 'http://localhost:3001' // Adjust port if needed

// Test contact form API
async function testContactAPI() {
  console.log('🧪 Testing Contact Form API...')
  
  const contactData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    phone: '+1234567890',
    role: 'CTO',
    projectType: 'Web Application',
    budget: '$50K - $100K',
    timeline: '3-6 months',
    message: 'This is a test message for the contact form API.'
  }

  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log('✅ Contact API test passed:', result.message)
    } else {
      console.log('❌ Contact API test failed:', result.error)
    }
  } catch (error) {
    console.log('❌ Contact API test error:', error.message)
  }
}

// Test job application API (without file)
async function testJobApplicationAPI() {
  console.log('🧪 Testing Job Application API...')
  
  const formData = new FormData()
  formData.append('name', 'Test Applicant')
  formData.append('email', 'applicant@example.com')
  formData.append('phone', '+1234567890')
  formData.append('position', 'Senior Full-Stack Developer')
  formData.append('experience', '5+ years')
  formData.append('coverLetter', 'This is a test cover letter for the job application API.')

  try {
    const response = await fetch(`${BASE_URL}/api/job-application`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    
    if (response.ok) {
      console.log('✅ Job Application API test passed:', result.message)
    } else {
      console.log('❌ Job Application API test failed:', result.error)
    }
  } catch (error) {
    console.log('❌ Job Application API test error:', error.message)
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting API Tests...\n')
  
  await testContactAPI()
  console.log('')
  await testJobApplicationAPI()
  
  console.log('\n✨ API tests completed!')
  console.log('\n📝 Note: These tests require:')
  console.log('   - Supabase database setup')
  console.log('   - Environment variables configured')
  console.log('   - Development server running')
}

// Check if running in Node.js environment
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ with fetch support')
  console.log('   Or install node-fetch: npm install node-fetch')
  process.exit(1)
}

runTests().catch(console.error)





