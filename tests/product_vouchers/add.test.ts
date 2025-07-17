import { describe, it, expect } from 'vitest'
import { supabase } from '../supabaseClient'

const testUserId = '29764f2c-81f3-4a4f-a04b-5f55167c2fef'
const testProductId = 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436'

describe('reward_vouchers table', () => {
  it('inserts a reward voucher with real data', async () => {
    const { data, error } = await supabase
      .from('product_vouchers')
      .insert([
        {
          user_id: testUserId,
          product_id: testProductId,
        }
      ])
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.user_id).toBe(testUserId)
    expect(data?.product_id).toBe(testProductId)
    expect(data?.status).toBe('active')
  })
})