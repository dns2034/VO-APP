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
	('00000000-0000-0000-0000-000000000000', 'e7606dab-c268-4fc6-a531-038dd10d9e88', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-17 14:01:11.979606+00', ''),
	('00000000-0000-0000-0000-000000000000', '00da29b6-963d-404c-bfc8-2dbd149284b1', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 01:41:01.922864+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8143f43-a25b-4afa-8a9f-46332779a635', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 01:42:11.043543+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e33225e6-9b12-4778-a144-ea8c94372a8d', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:23:17.838449+00', ''),
	('00000000-0000-0000-0000-000000000000', '44165968-5135-462b-8784-f31609f48b4e', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:34:46.93633+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b12d1ea1-2e74-4581-a169-9ee4193d043a', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:44:05.686921+00', ''),
	('00000000-0000-0000-0000-000000000000', '60850e7c-4acf-42e7-b579-685014d3739c', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:45:47.37871+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9b59de1-022b-4e70-9ad5-00f91dd8413c', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:47:24.311204+00', ''),
	('00000000-0000-0000-0000-000000000000', '1db63df6-e671-43e8-ac05-8e6aeda7d76a', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:54:30.876528+00', ''),
	('00000000-0000-0000-0000-000000000000', '3199d3b2-9498-4ff5-8e78-2148fa3e7d09', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:54:36.728506+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1275cbd-49fb-4952-8161-10a96cd82c37', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 02:54:51.974031+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da2c8760-a716-4df1-bff9-cd8b6b852d5e', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 04:58:41.657089+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c21bd25d-0276-49e8-9e71-058be6ea2e0a', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 04:59:01.683617+00', ''),
	('00000000-0000-0000-0000-000000000000', '86c178f9-1665-4547-8d77-e2ee11a9e4ed', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 04:59:11.630495+00', ''),
	('00000000-0000-0000-0000-000000000000', '66342048-ff1e-466a-8136-a417bcf4b9a8', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:01:33.014421+00', ''),
	('00000000-0000-0000-0000-000000000000', '353963e0-e3e6-47b1-9e26-83a912dbea5a', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:08:06.887133+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'authenticated', 'authenticated', 'jd@incub8space.com', '$2a$10$R36dm12HMH0jpt27cuRCve2bJGpjbQRk2TVSLL64InY2L2GSWQ8aK', '2025-07-17 13:57:22.888743+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-07-20 05:08:06.88856+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-07-17 13:57:22.885157+00', '2025-07-20 05:08:06.892243+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


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
	('f8a6a21a-9a8d-4367-a804-5d34b12be532', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-17 14:01:11.980175+00', '2025-07-17 14:01:11.980175+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('1d2091c4-0fc0-4731-b1d9-2da483d74a99', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 01:41:01.924781+00', '2025-07-20 01:41:01.924781+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('654fcff7-2429-43f5-8955-946b8756de52', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 01:42:11.044186+00', '2025-07-20 01:42:11.044186+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('bdc4eb10-0dbe-4465-9d75-f6dd5dcb9261', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:23:17.843503+00', '2025-07-20 02:23:17.843503+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('01482ec4-006b-4e28-8d63-235c169b039e', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:34:46.940623+00', '2025-07-20 02:34:46.940623+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('601ef58b-efe5-474d-bd7b-330cadec5082', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:44:05.692482+00', '2025-07-20 02:44:05.692482+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('35def541-3b16-4585-814b-c87b5763a579', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:45:47.38497+00', '2025-07-20 02:45:47.38497+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('0d85b9a1-5287-4016-b9e5-aacc15821b4d', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:47:24.331165+00', '2025-07-20 02:47:24.331165+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('e3f44fcd-0968-4c34-be74-96de776cdcc1', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:54:30.881982+00', '2025-07-20 02:54:30.881982+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('a9d1af3a-3395-4f80-b273-f66c27ba8a04', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:54:36.868855+00', '2025-07-20 02:54:36.868855+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('974fab66-7329-468c-86dc-41c0584350f5', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 02:54:51.977106+00', '2025-07-20 02:54:51.977106+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('c634f4f8-2d3b-41fd-9ea7-b8d022f0fab7', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 04:58:41.66004+00', '2025-07-20 04:58:41.66004+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('4f5c5337-f044-48c1-8105-b2de5a321a60', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 04:59:01.683964+00', '2025-07-20 04:59:01.683964+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('e6e98623-e349-454f-bc11-41397c86bd1e', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 04:59:11.630824+00', '2025-07-20 04:59:11.630824+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('70f8e692-2482-4ee1-bf81-3f66ef92ad5d', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:01:33.015077+00', '2025-07-20 05:01:33.015077+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('8ab5f2c6-3952-4716-9c64-ba02d1a52d78', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:08:06.888605+00', '2025-07-20 05:08:06.888605+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('5a518f03-62fc-4dc8-b3f3-f5e5d691347e', '2025-07-17 13:58:11.402233+00', '2025-07-17 13:58:11.402233+00', 'password', '9488e3bd-cc8c-441d-843e-e1468e21410e'),
	('f8a6a21a-9a8d-4367-a804-5d34b12be532', '2025-07-17 14:01:11.981073+00', '2025-07-17 14:01:11.981073+00', 'password', '8c0183c9-5798-429f-b91d-0fd704bd8342'),
	('1d2091c4-0fc0-4731-b1d9-2da483d74a99', '2025-07-20 01:41:01.92995+00', '2025-07-20 01:41:01.92995+00', 'password', '5e9be240-0d44-4aed-bee1-22a2297db03a'),
	('654fcff7-2429-43f5-8955-946b8756de52', '2025-07-20 01:42:11.045613+00', '2025-07-20 01:42:11.045613+00', 'password', 'bcfd6b22-7bcb-4fc6-9e8c-1d7b38c52282'),
	('bdc4eb10-0dbe-4465-9d75-f6dd5dcb9261', '2025-07-20 02:23:17.851912+00', '2025-07-20 02:23:17.851912+00', 'password', 'c2d42674-ab12-46df-91b2-46dd275d65ca'),
	('01482ec4-006b-4e28-8d63-235c169b039e', '2025-07-20 02:34:46.947575+00', '2025-07-20 02:34:46.947575+00', 'password', 'bbabb4ac-ab15-4946-9086-8204be2d7337'),
	('601ef58b-efe5-474d-bd7b-330cadec5082', '2025-07-20 02:44:05.697811+00', '2025-07-20 02:44:05.697811+00', 'password', '4c8f82ea-6edf-4d5d-ae7c-f4d5fbd35028'),
	('35def541-3b16-4585-814b-c87b5763a579', '2025-07-20 02:45:47.389017+00', '2025-07-20 02:45:47.389017+00', 'password', '832fe15c-7316-4894-b974-58945bc95029'),
	('0d85b9a1-5287-4016-b9e5-aacc15821b4d', '2025-07-20 02:47:24.35477+00', '2025-07-20 02:47:24.35477+00', 'password', '1f810073-f962-4421-8f35-c7e1ab6c262c'),
	('e3f44fcd-0968-4c34-be74-96de776cdcc1', '2025-07-20 02:54:30.889284+00', '2025-07-20 02:54:30.889284+00', 'password', '59201860-41ec-46c8-91db-d73194543196'),
	('a9d1af3a-3395-4f80-b273-f66c27ba8a04', '2025-07-20 02:54:37.552828+00', '2025-07-20 02:54:37.552828+00', 'password', '8ab75bb2-be1c-4efc-a220-059affd7b629'),
	('974fab66-7329-468c-86dc-41c0584350f5', '2025-07-20 02:54:51.983542+00', '2025-07-20 02:54:51.983542+00', 'password', '310236b4-7bbc-41d6-b457-528f92652ecb'),
	('c634f4f8-2d3b-41fd-9ea7-b8d022f0fab7', '2025-07-20 04:58:41.665994+00', '2025-07-20 04:58:41.665994+00', 'password', 'ad7e7186-0514-4f0b-bffa-68c8d084a35a'),
	('4f5c5337-f044-48c1-8105-b2de5a321a60', '2025-07-20 04:59:01.68559+00', '2025-07-20 04:59:01.68559+00', 'password', '8300af6e-7844-44e4-9a74-b620189e4e61'),
	('e6e98623-e349-454f-bc11-41397c86bd1e', '2025-07-20 04:59:11.631969+00', '2025-07-20 04:59:11.631969+00', 'password', 'b46ef5dd-557a-417e-b849-6e31a3cdd4d5'),
	('70f8e692-2482-4ee1-bf81-3f66ef92ad5d', '2025-07-20 05:01:33.016172+00', '2025-07-20 05:01:33.016172+00', 'password', 'ff4178ae-86e7-4ccf-b2d1-68b19df55cf9'),
	('8ab5f2c6-3952-4716-9c64-ba02d1a52d78', '2025-07-20 05:08:06.892653+00', '2025-07-20 05:08:06.892653+00', 'password', 'bcb02823-5627-443f-bf8a-307dbf63432b');


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
	('00000000-0000-0000-0000-000000000000', 2, 'xdm3yoslslh2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-17 14:01:11.980471+00', '2025-07-17 14:01:11.980471+00', NULL, 'f8a6a21a-9a8d-4367-a804-5d34b12be532'),
	('00000000-0000-0000-0000-000000000000', 3, 'ye46lrykdvbt', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 01:41:01.926462+00', '2025-07-20 01:41:01.926462+00', NULL, '1d2091c4-0fc0-4731-b1d9-2da483d74a99'),
	('00000000-0000-0000-0000-000000000000', 4, '4f4ixnrx4eau', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 01:42:11.044604+00', '2025-07-20 01:42:11.044604+00', NULL, '654fcff7-2429-43f5-8955-946b8756de52'),
	('00000000-0000-0000-0000-000000000000', 5, '3ym5jhozpgx4', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:23:17.847253+00', '2025-07-20 02:23:17.847253+00', NULL, 'bdc4eb10-0dbe-4465-9d75-f6dd5dcb9261'),
	('00000000-0000-0000-0000-000000000000', 6, 'dwej3syag22i', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:34:46.942975+00', '2025-07-20 02:34:46.942975+00', NULL, '01482ec4-006b-4e28-8d63-235c169b039e'),
	('00000000-0000-0000-0000-000000000000', 7, 'olma4wb5py47', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:44:05.694881+00', '2025-07-20 02:44:05.694881+00', NULL, '601ef58b-efe5-474d-bd7b-330cadec5082'),
	('00000000-0000-0000-0000-000000000000', 8, 'yav2tb7mek5a', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:45:47.38657+00', '2025-07-20 02:45:47.38657+00', NULL, '35def541-3b16-4585-814b-c87b5763a579'),
	('00000000-0000-0000-0000-000000000000', 9, 'r3cjtosqv36a', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:47:24.337372+00', '2025-07-20 02:47:24.337372+00', NULL, '0d85b9a1-5287-4016-b9e5-aacc15821b4d'),
	('00000000-0000-0000-0000-000000000000', 10, 'bsvtmeo3tqgo', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:54:30.886663+00', '2025-07-20 02:54:30.886663+00', NULL, 'e3f44fcd-0968-4c34-be74-96de776cdcc1'),
	('00000000-0000-0000-0000-000000000000', 11, 'szk2oe3j2rzd', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:54:37.155134+00', '2025-07-20 02:54:37.155134+00', NULL, 'a9d1af3a-3395-4f80-b273-f66c27ba8a04'),
	('00000000-0000-0000-0000-000000000000', 12, 'wogr2mdbdll5', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 02:54:51.979711+00', '2025-07-20 02:54:51.979711+00', NULL, '974fab66-7329-468c-86dc-41c0584350f5'),
	('00000000-0000-0000-0000-000000000000', 13, 'fle6dyrfte3o', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 04:58:41.662303+00', '2025-07-20 04:58:41.662303+00', NULL, 'c634f4f8-2d3b-41fd-9ea7-b8d022f0fab7'),
	('00000000-0000-0000-0000-000000000000', 14, 'mbtt7libmqrw', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 04:59:01.68432+00', '2025-07-20 04:59:01.68432+00', NULL, '4f5c5337-f044-48c1-8105-b2de5a321a60'),
	('00000000-0000-0000-0000-000000000000', 15, 'u3yu76osqbmz', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 04:59:11.631137+00', '2025-07-20 04:59:11.631137+00', NULL, 'e6e98623-e349-454f-bc11-41397c86bd1e'),
	('00000000-0000-0000-0000-000000000000', 16, 'hpxbu57vqt7k', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:01:33.015582+00', '2025-07-20 05:01:33.015582+00', NULL, '70f8e692-2482-4ee1-bf81-3f66ef92ad5d'),
	('00000000-0000-0000-0000-000000000000', 49, 'oe6555gs3v2y', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:08:06.89021+00', '2025-07-20 05:08:06.89021+00', NULL, '8ab5f2c6-3952-4716-9c64-ba02d1a52d78');


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
-- Data for Name: available_points; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."available_points" ("count") VALUES
	(2);


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
	('c71bfbd6-9d81-4667-a01b-0f64f4b69e1b', '2025-07-17 13:57:46.650455+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-08-16 13:57:46.650455+00', 'used');


--
-- Data for Name: points; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."points" ("id", "created_at", "user_id", "expires_at", "status") VALUES
	('868dfe99-da0c-4f77-a04d-248d0c739ddb', '2025-07-20 04:58:56.798121+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-08-19 04:58:56.798121+00', 'active');


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
	('fe1e5261-d444-4f53-b73d-f121b4c4a5d1', '2025-07-20 02:47:24.504726+00', 'E0FA7FFA', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 02:47:24.504726+00', 'active'),
	('ab499990-1d45-4733-acaa-e5db1e310c48', '2025-07-20 02:54:31.208283+00', '91E5B691', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 02:54:31.208283+00', 'active'),
	('7776cdb5-4f18-4a93-8fa3-02a41fa575f9', '2025-07-20 02:54:39.575387+00', '993D1020', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 02:54:39.575387+00', 'active'),
	('3ff90ef9-a3bf-414a-89be-3aeb4ebf003a', '2025-07-20 02:54:52.145543+00', '4489E6D1', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 02:54:52.145543+00', 'active');


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
	('23b766b6-181f-4f90-b561-502c580039ca', '2025-07-17 06:11:12.533109+00', 'Notebook', 'Lined notebook with company branding.', 150, '/placeholder.png', '0021c85b-7419-453f-8287-83c47347d431'),
	('966923b4-8946-4c22-9ef3-851a4d973ed5', '2025-07-17 06:11:12.533109+00', 'Sticker Pack', 'A pack of cool stickers.', 1, '/placeholder.png', '0021c85b-7419-453f-8287-83c47347d431');


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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 49, true);


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
