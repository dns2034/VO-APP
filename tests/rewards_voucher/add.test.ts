import { describe, it, expect } from 'vitest'
import { supabase } from '../supabaseClient'

const testUserId = '29764f2c-81f3-4a4f-a04b-5f55167c2fef'
const testRewardId = '21a73aef-bc3a-4db3-9c53-8f1d5a5146b4'

describe('reward_vouchers table', () => {
  it('inserts a reward voucher with real data', async () => {
    const code = `REALTEST-${Date.now()}`
    const { data, error } = await supabase
      .from('reward_vouchers')
      .insert([
        {
          code,
          user_id: testUserId,
          reward_id: testRewardId,
          expiry_date: '2099-12-31'
        }
      ])
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.code).toBe(code)
    expect(data?.user_id).toBe(testUserId)
    expect(data?.reward_id).toBe(testRewardId)
    expect(data?.status).toBe('active')
  })
})