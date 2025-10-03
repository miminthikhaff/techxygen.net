#!/usr/bin/env node

/**
 * Script to create an admin user in Supabase
 * Usage: node scripts/create-admin-user.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check your .env.local file contains:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdminUser() {
  console.log('🚀 Creating admin user...')
  
  // Get user input
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve))

  try {
    const email = await question('📧 Admin email: ')
    const password = await question('🔒 Admin password: ')
    const name = await question('👤 Admin name: ')
    const role = await question('🎭 Role (super_admin/hr_admin/content_admin): ')

    if (!['super_admin', 'hr_admin', 'content_admin'].includes(role)) {
      throw new Error('Invalid role. Must be: super_admin, hr_admin, or content_admin')
    }

    // Create user in Supabase Auth
    console.log('👤 Creating user in Supabase Auth...')
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`)
    }

    console.log('✅ User created in Auth:', authData.user.id)

    // Create admin profile
    console.log('👔 Creating admin profile...')
    const { data: profileData, error: profileError } = await supabase
      .from('admin_profiles')
      .insert({
        user_id: authData.user.id,
        role,
        name,
        email
      })
      .select()
      .single()

    if (profileError) {
      throw new Error(`Profile error: ${profileError.message}`)
    }

    console.log('✅ Admin profile created:', profileData.id)
    console.log('🎉 Admin user created successfully!')
    console.log('')
    console.log('📋 Login Details:')
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password}`)
    console.log(`   Role: ${role}`)
    console.log('')
    console.log('🔗 You can now login at: http://localhost:3000/admin/login')

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
  } finally {
    rl.close()
  }
}

// Check if required packages are installed
try {
  require('dotenv')
  require('readline')
} catch (error) {
  console.error('❌ Missing required packages!')
  console.error('Please install: npm install dotenv')
  process.exit(1)
}

createAdminUser()


