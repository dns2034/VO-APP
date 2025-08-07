SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '4763d134-b21b-4d7e-97b7-3121b8e91126', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"jd@incub8space.com","user_id":"5c2b372e-3d02-4f16-9a0b-4bc9491d1d31","user_phone":""}}', '2025-08-06 09:30:53.926233+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bc158a12-f106-49f6-8b44-f8a18d2fbf5f', '{"action":"login","actor_id":"5c2b372e-3d02-4f16-9a0b-4bc9491d1d31","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-06 09:33:51.394784+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', 'authenticated', 'authenticated', 'jd@incub8space.com', '$2a$10$jxRaMJ4zcouhEZJArNJBIef/F6lzWwFlzXQSY1Lkf20WUdac/Tk7C', '2025-08-06 09:30:53.928023+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-08-06 09:33:51.395263+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-08-06 09:30:53.923105+00', '2025-08-06 09:33:51.400143+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '{"sub": "5c2b372e-3d02-4f16-9a0b-4bc9491d1d31", "email": "jd@incub8space.com", "email_verified": false, "phone_verified": false}', 'email', '2025-08-06 09:30:53.92536+00', '2025-08-06 09:30:53.925401+00', '2025-08-06 09:30:53.925401+00', '53291d12-d0c9-46d2-a6f4-3f7b4e975991');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('305fb51c-a561-47f3-9f77-15356be9ab9c', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '2025-08-06 09:33:51.395325+00', '2025-08-06 09:33:51.395325+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '172.18.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('305fb51c-a561-47f3-9f77-15356be9ab9c', '2025-08-06 09:33:51.400555+00', '2025-08-06 09:33:51.400555+00', 'password', '3c7b893f-e5de-4455-8c23-085dd52f85c6');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'wlthug3heolj', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', false, '2025-08-06 09:33:51.396589+00', '2025-08-06 09:33:51.396589+00', NULL, '305fb51c-a561-47f3-9f77-15356be9ab9c');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organizations" ("id", "created_at", "name") VALUES
	('2a2a474f-d78a-454a-b309-c6eb066a2738', '2025-08-06 09:26:13.56371+00', 'Incub8Space');


--
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."branches" ("created_at", "name", "organization_id", "id", "image_path", "location") VALUES
	('2025-08-06 09:26:44.022756+00', 'Kawit Branch', '2a2a474f-d78a-454a-b309-c6eb066a2738', '13ac33d8-96f0-4009-abbb-ab0eb5960205', NULL, '2F Robertson Plaza, Centennial Road, Brgy. Tabon 1, Kawit, Cavite');


--
-- Data for Name: spaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."spaces" ("id", "created_at", "name", "is_available", "branch_id") VALUES
	('de64b755-378f-4959-a933-48ed5cd875fd', '2025-08-06 09:27:24.432041+00', 'Meeting Room', true, '13ac33d8-96f0-4009-abbb-ab0eb5960205');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products" ("id", "created_at", "name", "description", "image_path", "price", "space_id", "duration") VALUES
	('88771121-ff21-4dc4-88fe-1701c9ce9667', '2025-08-06 09:32:29.570096+00', '1-Hour Meeting Room', 'sdas', '/placeholder.png', 1, 'de64b755-378f-4959-a933-48ed5cd875fd', 1);


--
-- Data for Name: product_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_vouchers" ("id", "created_at", "code", "user_id", "product_id", "expiring_at", "status", "is_refundable") VALUES
	('714a1128-c56f-44ca-b388-ed83da900926', '2025-08-06 09:36:25.181143+00', '29A10476', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '88771121-ff21-4dc4-88fe-1701c9ce9667', '2025-09-05 09:36:25.181143+00', 'active', 'true');


--
-- Data for Name: space_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."space_units" ("id", "created_at", "name", "space_id") VALUES
	('48df0f5d-7365-4d28-8660-fa95a4bdec80', '2025-08-06 09:30:36.580919+00', 'Meeting Room 1', 'de64b755-378f-4959-a933-48ed5cd875fd');


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bookings" ("created_at", "booked_by", "start_time", "end_time", "date", "status", "id", "remarks", "product_voucher_id", "space_unit_id") VALUES
	('2025-08-06 09:39:48.165211+00', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '05:00:00+00', '06:00:00+00', '2025-08-06', 'booked', '49418908-d9b9-4740-b542-d0af03b015b6', '', '714a1128-c56f-44ca-b388-ed83da900926', '48df0f5d-7365-4d28-8660-fa95a4bdec80'),
	('2025-08-06 09:43:56.332066+00', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '10:00:00+00', '11:00:00+00', '2025-08-06', 'booked', 'e36309f7-a426-4521-a2a3-fdbe734a89c5', '', '714a1128-c56f-44ca-b388-ed83da900926', '48df0f5d-7365-4d28-8660-fa95a4bdec80');


--
-- Data for Name: booking_cancellations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: credits; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."credits" ("id", "created_at", "user_id", "expires_at", "status") VALUES
	('45eefade-bdd3-4665-adc4-ccc84c88aae6', '2025-08-06 09:31:11.485051+00', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '2025-09-05 09:31:11.485051+00', 'active');


--
-- Data for Name: organization_pages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: points; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: referrals; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: reward_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: space_availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."space_availability" ("id", "created_at", "date", "opening_time", "closing_time", "space_id") VALUES
	('b72b68c7-971b-4ae3-a6fd-5abd065b41d8', '2025-08-06 09:37:36.54193+00', '2025-08-06', '10:00:00+08', '20:00:00+08', 'de64b755-378f-4959-a933-48ed5cd875fd');


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_organizations" ("id", "created_at", "user_id", "organization_id") VALUES
	('a82b0594-f3b6-4bd5-87fa-649c783d9c1e', '2025-08-06 09:31:35.069855+00', '5c2b372e-3d02-4f16-9a0b-4bc9491d1d31', '2a2a474f-d78a-454a-b309-c6eb066a2738');


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
