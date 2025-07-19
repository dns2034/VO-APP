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
	('00000000-0000-0000-0000-000000000000', '9c1ae615-c637-4b54-b828-c99f0a936e1a', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"jd@incub8space.com","user_id":"29764f2c-81f3-4a4f-a04b-5f55167c2fef","user_phone":""}}', '2025-07-17 11:12:40.700188+00', ''),
	('00000000-0000-0000-0000-000000000000', '019b3c2a-696d-4ce3-adc1-1d7603e962b0', '{"action":"user_recovery_requested","actor_id":"29764f2c-81f3-4a4f-a04b-5f55167c2fef","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"user"}', '2025-07-17 13:57:04.335586+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f203ce6-42b0-4b63-8f36-761ffb52ff55', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"29764f2c-81f3-4a4f-a04b-5f55167c2fef","user_phone":""}}', '2025-07-17 13:57:10.431892+00', ''),
	('00000000-0000-0000-0000-000000000000', '63d4594c-c5b4-4315-9359-45e742a444de', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"jd@incub8space.com","user_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","user_phone":""}}', '2025-07-17 13:57:22.887048+00', ''),
	('00000000-0000-0000-0000-000000000000', '71af36a7-6b29-45ed-a997-096c3087bdde', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-17 13:58:11.398783+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7606dab-c268-4fc6-a531-038dd10d9e88', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-17 14:01:11.979606+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'authenticated', 'authenticated', 'jd@incub8space.com', '$2a$10$R36dm12HMH0jpt27cuRCve2bJGpjbQRk2TVSLL64InY2L2GSWQ8aK', '2025-07-17 13:57:22.888743+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-07-17 14:01:11.98013+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-07-17 13:57:22.885157+00', '2025-07-17 14:01:11.980929+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('e2039206-f313-49c3-bc16-0596c11e4a5d', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '{"sub": "e2039206-f313-49c3-bc16-0596c11e4a5d", "email": "jd@incub8space.com", "email_verified": false, "phone_verified": false}', 'email', '2025-07-17 13:57:22.886517+00', '2025-07-17 13:57:22.886556+00', '2025-07-17 13:57:22.886556+00', '618d07ef-9951-43a3-aa6d-03eb3829080b');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('5a518f03-62fc-4dc8-b3f3-f5e5d691347e', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-17 13:58:11.399192+00', '2025-07-17 13:58:11.399192+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('f8a6a21a-9a8d-4367-a804-5d34b12be532', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-17 14:01:11.980175+00', '2025-07-17 14:01:11.980175+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('5a518f03-62fc-4dc8-b3f3-f5e5d691347e', '2025-07-17 13:58:11.402233+00', '2025-07-17 13:58:11.402233+00', 'password', '9488e3bd-cc8c-441d-843e-e1468e21410e'),
	('f8a6a21a-9a8d-4367-a804-5d34b12be532', '2025-07-17 14:01:11.981073+00', '2025-07-17 14:01:11.981073+00', 'password', '8c0183c9-5798-429f-b91d-0fd704bd8342');


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
	('00000000-0000-0000-0000-000000000000', 1, 'zkoxt5grogg5', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-17 13:58:11.399844+00', '2025-07-17 13:58:11.399844+00', NULL, '5a518f03-62fc-4dc8-b3f3-f5e5d691347e'),
	('00000000-0000-0000-0000-000000000000', 2, 'xdm3yoslslh2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-17 14:01:11.980471+00', '2025-07-17 14:01:11.980471+00', NULL, 'f8a6a21a-9a8d-4367-a804-5d34b12be532');


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
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organizations" ("id", "created_at", "name") VALUES
	('0021c85b-7419-453f-8287-83c47347d431', '2025-07-17 06:10:47.472771+00', 'Incub8Space');


--
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: credits; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."credits" ("id", "created_at", "user_id", "expires_at", "status") VALUES
	('c71bfbd6-9d81-4667-a01b-0f64f4b69e1b', '2025-07-17 13:57:46.650455+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-08-16 13:57:46.650455+00', 'active');


--
-- Data for Name: points; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products" ("id", "created_at", "name", "description", "image_path", "price", "organization_id") VALUES
	('b9c3d025-8c3c-4413-9dd9-6fcf9c1a3ee2', '2025-07-17 06:11:12.533109+00', '1-Hour Meeting Room', 'Access to a private meeting room for 1 hour with amenities.', '/placeholder.png', 300, '0021c85b-7419-453f-8287-83c47347d431'),
	('a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-07-17 06:11:12.533109+00', '1-Day Coworking Pass', 'Full-day access to shared coworking spaces with high-speed internet.', '/placeholder.png', 1, '0021c85b-7419-453f-8287-83c47347d431');


--
-- Data for Name: product_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_vouchers" ("id", "created_at", "code", "user_id", "product_id", "expiring_at", "status") VALUES
	('2b957df3-e5e5-42ba-be34-eac7be71ce87', '2025-07-17 14:05:10.5731+00', 'BCE8A9D9', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-16 14:05:10.5731+00', 'active'),
	('117191a0-e509-4ae3-87a2-4e9bd4fe09c1', '2025-07-17 14:05:54.045276+00', '39BDB304', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-16 14:05:54.045276+00', 'active');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: referrals; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."rewards" ("id", "created_at", "name", "description", "price", "image_path", "organization_id") VALUES
	('430534d7-412e-4b48-bffa-a28f192060cb', '2025-07-17 06:11:12.533109+00', 'Coffee Mug', 'A branded coffee mug for everyday use.', 100, '/placeholder.png', '0021c85b-7419-453f-8287-83c47347d431'),
	('21a73aef-bc3a-4db3-9c53-8f1d5a5146b4', '2025-07-17 06:11:12.533109+00', 'T-Shirt', 'Comfy t-shirt with our logo.', 200, '/placeholder.png', '0021c85b-7419-453f-8287-83c47347d431'),
	('966923b4-8946-4c22-9ef3-851a4d973ed5', '2025-07-17 06:11:12.533109+00', 'Sticker Pack', 'A pack of cool stickers.', 50, '/placeholder.png', '0021c85b-7419-453f-8287-83c47347d431'),
	('23b766b6-181f-4f90-b561-502c580039ca', '2025-07-17 06:11:12.533109+00', 'Notebook', 'Lined notebook with company branding.', 150, '/placeholder.png', '0021c85b-7419-453f-8287-83c47347d431');


--
-- Data for Name: reward_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: spaces; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: space_availability; Type: TABLE DATA; Schema: public; Owner: postgres
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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 2, true);


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."bookings_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
