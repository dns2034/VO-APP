import { supabase } from '../supabaseClient';
import { test, expect } from 'vitest'

test('Login with valid credentials', async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'jd@incub8space.com',
    password: 'Samalamig21',
  })

  expect(error).toBeNull()
  expect(data.session).toBeDefined()
  expect(data.user).toBeDefined()

  console.log('Access token:', data.session?.access_token)
})