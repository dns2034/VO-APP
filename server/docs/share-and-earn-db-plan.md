# Share & Earn Database Plan

## 1. Purpose
Simplify schema by removing redundant tables.  
Unify all audit/logging into a single `logs` table.  
Make `referrals` the single source of truth for all referral types (business partners and fans).

## 2. Canonical Tables (kept)
- `users`
- `referrals` (replaces `partners` + `partner_referrals`)
- `cash_vouchers`

## 3. To Be Merged Into `logs`
- `submissions_audit`
- `dead_letter`
- `ap_runs`
- `email_events`
- `voucher_claims`
- `odoo_won_events`

## 4. Roles
- **fan**  
  - Replaces “individual partner” concept.  
  - Created only via the Share & Earn signup page.  
  - Can generate/share referral codes.  
  - Can earn credits/vouchers when referrals convert.  
  - Cannot log in to VO app or access management features.  

- **partner/client**  
  - Business entities with full app access.  
  - Can manage referrals, spaces, products, etc.  

- **staff/admin/service_role**  
  - Internal operators with full access to reporting and management.

## 5. Logs Table Structure
**Columns**  
- `id` uuid pk  
- `created_at` timestamptz default now()  
- `source` text (lp, ap, odoo, listmonk, ops, etc.)  
- `event_type` text (submission, ap_run, email_event, claim, odoo_won, etc.)  
- `ref_id` text (voucher_id, referral_id, odoo_id, etc. for quick lookups)  
- `payload` jsonb (full data blob)

**Sample JSON Payloads**
```json
{
  "op": "submission",
  "referral_id": "uuid-123",
  "lead_email": "lead@example.com",
  "utm": { "source": "fb", "campaign": "q3" }
}
