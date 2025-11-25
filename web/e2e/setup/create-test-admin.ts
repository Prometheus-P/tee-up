import { createClient } from '@supabase/supabase-js'

/**
 * Create test admin account for E2E tests
 * This script runs once to set up the test environment
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yrdfopkerrrhsafynakg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZGZvcGtlcnJyaHNhZnluYWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjA3MTQsImV4cCI6MjA3OTUzNjcxNH0.OJ0VkIC6p3jJQkV7Lo3XWU9svYnDpOmeMu5ITtFpW24'

const testAdminEmail = 'admin@teeup.com'
const testAdminPassword = 'TestPassword123!'

async function createTestAdmin() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  console.log('Creating test admin account...')
  console.log('Email:', testAdminEmail)

  const { data, error } = await supabase.auth.signUp({
    email: testAdminEmail,
    password: testAdminPassword,
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('✓ Test admin account already exists')
      return true
    }
    console.error('✗ Error creating test admin:', error.message)
    return false
  }

  if (data.user) {
    console.log('✓ Test admin account created successfully')
    console.log('User ID:', data.user.id)
    return true
  }

  return false
}

createTestAdmin()
  .then((success) => {
    if (success) {
      console.log('\nTest admin credentials:')
      console.log('Email:', testAdminEmail)
      console.log('Password:', testAdminPassword)
      console.log('\nAdd these to your .env.test file:')
      console.log(`TEST_ADMIN_EMAIL=${testAdminEmail}`)
      console.log(`TEST_ADMIN_PASSWORD=${testAdminPassword}`)
      process.exit(0)
    } else {
      console.error('\nFailed to create test admin account')
      process.exit(1)
    }
  })
  .catch((err) => {
    console.error('Unexpected error:', err)
    process.exit(1)
  })
