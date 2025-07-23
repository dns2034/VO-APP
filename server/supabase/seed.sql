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
	('00000000-0000-0000-0000-000000000000', '353963e0-e3e6-47b1-9e26-83a912dbea5a', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:08:06.887133+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca9640bc-4def-4616-84b3-564e1657bf12', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:16:14.334266+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7fa21ba-afea-4052-9aab-524cf2bf0a3f', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:22:28.55899+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3ea52b5-72e3-4077-b2d2-8b3079cc77c8', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:24:49.019421+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e3e712e-2f81-469f-b692-67a3447e61b0', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:25:15.161569+00', ''),
	('00000000-0000-0000-0000-000000000000', '01b7f580-0554-4140-ba8d-30ae64c42fd3', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:25:48.799267+00', ''),
	('00000000-0000-0000-0000-000000000000', '18eea9e1-5daf-46a0-9f6f-e6c35b3f7fc7', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:26:26.388681+00', ''),
	('00000000-0000-0000-0000-000000000000', '302a4986-d0a5-446b-8992-405e5ec8b216', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:27:16.768675+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b90d0dd-39c4-46f9-93fc-bf97bb6c6bfb', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:28:52.753444+00', ''),
	('00000000-0000-0000-0000-000000000000', '45ba795a-4f0b-4824-9d69-6c922a2c77b6', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:30:27.531501+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a67dd9fc-2d13-4dfc-a27b-6f23af43f619', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:31:13.741121+00', ''),
	('00000000-0000-0000-0000-000000000000', '8efe7745-c455-46db-b353-e869db6aa611', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:38:35.003281+00', ''),
	('00000000-0000-0000-0000-000000000000', '595a2177-85f7-4682-adc2-4dc5b29459de', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:41:12.343756+00', ''),
	('00000000-0000-0000-0000-000000000000', '774ba07b-b582-4585-be93-f8d1e7f25793', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:41:34.035403+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5b5e6bb-d55f-4139-8769-139fc440a23d', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:42:23.070532+00', ''),
	('00000000-0000-0000-0000-000000000000', '17f65980-11d8-4be9-a172-7ccf96adc307', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:42:31.611727+00', ''),
	('00000000-0000-0000-0000-000000000000', '84600157-edf3-4ec8-988d-7eb1068f465f', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:48:23.30501+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d293711-23fe-45c8-977a-0a64fed026b2', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:52:35.696846+00', ''),
	('00000000-0000-0000-0000-000000000000', '2866219b-ca08-423f-8ba3-c6d7471238bb', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:52:39.482269+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d3253c4-1bac-44b4-8520-a2f51992e83b', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 05:52:49.368416+00', ''),
	('00000000-0000-0000-0000-000000000000', '12017ac3-0d74-440e-a7c4-0c92b6ab7096', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 09:53:44.086081+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0876754-f37e-490d-ad16-077b5d1ea8ec', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 10:52:01.90863+00', ''),
	('00000000-0000-0000-0000-000000000000', '06b0d179-edf6-49f6-ae64-df75f95f243f', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 10:52:01.910614+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4b8ddf4-6e5a-4eb2-ab12-f3437d318f3d', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 11:50:24.243903+00', ''),
	('00000000-0000-0000-0000-000000000000', '8640176f-d5a3-40a5-bef0-61a3aebe0f2f', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 11:50:24.245929+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ba14ff8-a0df-4119-8c4b-cb841ae0a005', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 12:53:53.581021+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b671bb0c-4afb-4030-b266-39658ad0b111', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 12:53:53.581609+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4501dbc-4c89-4459-b23a-ff6352a85e7b', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 13:52:27.758137+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d5f766e-e602-46c6-ac49-8ba813f0e8d6', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 13:52:27.760584+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e595ca6-fad5-465f-9544-9caa436ebf13', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 13:52:40.074587+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b01b4dd-3b89-4782-bdce-a7fbb83fc951', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 15:48:18.72988+00', ''),
	('00000000-0000-0000-0000-000000000000', '7324a108-d1bc-4621-967b-ad33ba842ecc', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 15:48:18.732613+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e709389b-2921-40ef-9834-ba40500ea715', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 15:48:43.30242+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef0da9ba-d89f-420d-b22e-445c8381c868', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 15:50:26.024876+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cdee5aaf-2881-4aa8-8eba-77d8a67d2586', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 15:50:26.045719+00', ''),
	('00000000-0000-0000-0000-000000000000', '18a597df-d271-4153-9c3c-72b4f7a60120', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-20 15:50:26.049208+00', ''),
	('00000000-0000-0000-0000-000000000000', '081de3a6-bcb8-464c-8a6d-3c7d367db5d0', '{"action":"user_recovery_requested","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"user"}', '2025-07-20 16:15:41.166611+00', ''),
	('00000000-0000-0000-0000-000000000000', '98e7dab1-223d-4e73-82de-cb0022c6587d', '{"action":"user_recovery_requested","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"user"}', '2025-07-20 16:18:50.55279+00', ''),
	('00000000-0000-0000-0000-000000000000', '91904769-1418-4a05-a74c-c958e1563bef', '{"action":"user_recovery_requested","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"user"}', '2025-07-20 16:25:55.511002+00', ''),
	('00000000-0000-0000-0000-000000000000', '43aaf9b6-43b2-4305-901e-0f5d73d376d8', '{"action":"user_recovery_requested","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"user"}', '2025-07-20 16:27:41.733582+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ae071b9-bcf7-41f7-9e72-0f08014b5bb8', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 16:47:24.59149+00', ''),
	('00000000-0000-0000-0000-000000000000', '7546ae7b-f684-4738-9061-1635225f7ff6', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 16:47:24.593041+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2296ca3-caff-453c-9be2-7b2d21f1fd22', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 17:45:45.851612+00', ''),
	('00000000-0000-0000-0000-000000000000', '8319cb49-1f1c-44d0-afce-5cb7c6816bc2', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-20 17:45:45.852412+00', ''),
	('00000000-0000-0000-0000-000000000000', 'acfdc9f7-b34e-43e9-87b6-9e001a4afd2d', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 00:56:16.369982+00', ''),
	('00000000-0000-0000-0000-000000000000', '47ed9805-eb93-4811-9962-4994f1f7d3e8', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 00:56:16.370796+00', ''),
	('00000000-0000-0000-0000-000000000000', '72e81077-dff6-40d3-8c38-5eac96b07365', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 01:55:45.372466+00', ''),
	('00000000-0000-0000-0000-000000000000', '608b7e7c-dc67-436e-932d-4e5a3eb74cb2', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 01:55:45.374796+00', ''),
	('00000000-0000-0000-0000-000000000000', '787d2d9d-4fe9-4e79-8265-1385d582a53b', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 02:59:01.187321+00', ''),
	('00000000-0000-0000-0000-000000000000', '72ee784b-d76d-4af7-8e01-9a8d0a8aa616', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 02:59:01.188794+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e7c6483-5ef1-4ea2-9114-721d9b32bbb9', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-21 02:59:27.099112+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da2ce187-aa52-48df-85cc-6d272f29c598', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 05:21:31.732759+00', ''),
	('00000000-0000-0000-0000-000000000000', '66ce70d2-3ea7-468d-a397-c99eb21cd932', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 05:21:31.734593+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ebffe3b9-5365-4b7f-8c6c-ce4171e6af1d', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 18:24:38.523961+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b2d1d68-b30a-4d7c-8af9-8595f8f2dbc0', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-21 18:24:38.525384+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ff3fac9-ff9e-4f2e-952b-ed03b4b3f6a9', '{"action":"login","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-07-21 18:24:42.37754+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee82099a-4f02-4c91-8bc3-e225cc8a92be', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 11:51:06.132987+00', ''),
	('00000000-0000-0000-0000-000000000000', '78ef0a29-0b3c-4cc5-a669-a0f5a6eaa219', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 11:51:06.136252+00', ''),
	('00000000-0000-0000-0000-000000000000', '72e0e082-b85d-4bc9-aa4c-04ca7475aba8', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 13:01:22.711682+00', ''),
	('00000000-0000-0000-0000-000000000000', '38aebb1e-f541-4282-9714-9aff6170e561', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 13:01:22.714312+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4475921-b123-4a64-88d9-40e68f2a59a5', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 14:02:37.498856+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ae42d94-3840-4238-8ef4-3422ee213d37', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 14:02:37.500184+00', ''),
	('00000000-0000-0000-0000-000000000000', '34ea146f-4197-4d89-b160-179d372428cf', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 15:19:24.74065+00', ''),
	('00000000-0000-0000-0000-000000000000', '5003aaf5-e843-4a89-994d-cc2b137c8758', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-22 15:19:24.742886+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf9b20e5-095c-4474-adaa-488025bd9dad', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 01:22:59.144644+00', ''),
	('00000000-0000-0000-0000-000000000000', '6af5e034-0ea0-40e6-8c5d-11a40eca7c7f', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 01:22:59.14738+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1a57db5-7c0a-4a89-9d4a-9f00890b761f', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 02:24:52.900618+00', ''),
	('00000000-0000-0000-0000-000000000000', '58ee8fae-f9f8-4bae-ad13-a6285e5a8597', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 02:24:52.903278+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fd294e0-72e0-4501-a63a-0ccdd3e60e64', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:16:27.222236+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d7b3ede-575e-4726-9a32-fdca35571d7f', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 06:16:27.225547+00', ''),
	('00000000-0000-0000-0000-000000000000', '9f4e85e7-72cb-4ef0-a44f-448528a504f8', '{"action":"token_refreshed","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 09:15:08.633242+00', ''),
	('00000000-0000-0000-0000-000000000000', '5d67988c-1f95-4f9f-a996-b012d71ca0bb', '{"action":"token_revoked","actor_id":"e2039206-f313-49c3-bc16-0596c11e4a5d","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-07-23 09:15:08.634049+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'authenticated', 'authenticated', 'jd@incub8space.com', '$2a$10$R36dm12HMH0jpt27cuRCve2bJGpjbQRk2TVSLL64InY2L2GSWQ8aK', '2025-07-17 13:57:22.888743+00', NULL, '', NULL, '5fb81ad6eff9ef400cfe675b35d5b5e9a6bc768355bee0ab52678b3d', '2025-07-20 16:27:41.734624+00', '', '', NULL, '2025-07-21 18:24:42.377955+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-07-17 13:57:22.885157+00', '2025-07-23 09:15:08.636617+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


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
	('8ab5f2c6-3952-4716-9c64-ba02d1a52d78', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:08:06.888605+00', '2025-07-20 05:08:06.888605+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('9a370b79-5b67-4ba5-ad95-30981d3711a6', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:16:14.335012+00', '2025-07-20 05:16:14.335012+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('13a06a24-9922-4e74-8f79-78444edc5d9d', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:22:28.559433+00', '2025-07-20 05:22:28.559433+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('a6f0e2da-509f-4007-b938-a88a62d095f9', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:24:49.019753+00', '2025-07-20 05:24:49.019753+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('b1fe7f4a-7406-4c88-97e9-f792f6a22ef3', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:25:15.161903+00', '2025-07-20 05:25:15.161903+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('8f0aa65e-fed3-4457-b624-f917a9c72f46', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:25:48.799804+00', '2025-07-20 05:25:48.799804+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('83adddb3-22e5-4c8a-b93b-acc4c9502ef2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:26:26.389117+00', '2025-07-20 05:26:26.389117+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('cc0bc6a7-e2fc-4b8d-ac5d-4cfc0a262c18', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:27:16.769128+00', '2025-07-20 05:27:16.769128+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('ffcf8810-4265-4063-abc9-26ff3d607bc1', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:28:52.753812+00', '2025-07-20 05:28:52.753812+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('f92544d6-acbd-4305-a330-c96d6996d72e', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:30:27.532046+00', '2025-07-20 05:30:27.532046+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('71d35cad-acb9-41bc-8ac7-1c15856534c5', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:31:13.741755+00', '2025-07-20 05:31:13.741755+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('a725f972-fd6c-4e02-b73e-c0d31e786382', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:38:35.003856+00', '2025-07-20 05:38:35.003856+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('07c713e1-64c0-415e-8a67-f12370b30ed2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:41:12.344238+00', '2025-07-20 05:41:12.344238+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('ed441667-eb49-4b27-8dae-e5c3ea10de20', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:41:34.036082+00', '2025-07-20 05:41:34.036082+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('d595c797-ae2f-49b3-bd81-d0c3f676ef10', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:42:23.070893+00', '2025-07-20 05:42:23.070893+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('ecd4e7d0-4b8e-403a-863a-82475bd9e49e', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:42:31.61216+00', '2025-07-20 05:42:31.61216+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('066b27fc-2df0-4620-8e99-fdfd0569c3e0', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:48:23.308365+00', '2025-07-20 05:48:23.308365+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('b6aae0e3-ef02-4fa8-9930-ff8420e2c2a6', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:52:35.697282+00', '2025-07-20 05:52:35.697282+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('ec09fd9e-92b8-4f8d-ae27-00632759f766', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:52:39.482867+00', '2025-07-20 05:52:39.482867+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('800ec500-0850-4537-a3dd-7eaeb5c34d8b', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 05:52:49.368782+00', '2025-07-20 05:52:49.368782+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('a37dabef-0ede-4fb6-9a66-35439f2c367c', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-21 02:59:27.099788+00', '2025-07-21 18:24:38.530048+00', NULL, 'aal1', NULL, '2025-07-21 18:24:38.53', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '172.18.0.1', NULL),
	('2dddb0a2-896d-4144-962f-9d8e3709c06a', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 09:53:44.087877+00', '2025-07-20 13:52:27.768239+00', NULL, 'aal1', NULL, '2025-07-20 13:52:27.768192', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '172.18.0.1', NULL),
	('9b1704b3-3db2-4479-a0bc-6a880983fa3a', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 13:52:40.075126+00', '2025-07-20 15:48:18.741874+00', NULL, 'aal1', NULL, '2025-07-20 15:48:18.741716', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '172.18.0.1', NULL),
	('0aeea375-17c8-4a39-b427-fa919f085b7d', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 15:50:26.025566+00', '2025-07-20 15:50:26.025566+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('775f426a-a7fa-43b2-aed1-a999c7122044', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 15:50:26.046219+00', '2025-07-20 15:50:26.046219+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('b3d2da69-bae1-461a-8074-79f786e5a24a', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 15:50:26.049757+00', '2025-07-20 15:50:26.049757+00', NULL, 'aal1', NULL, NULL, 'undici', '172.18.0.1', NULL),
	('cc5b7a29-6d46-4ae6-955c-4ef322dbcddd', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-21 18:24:42.378039+00', '2025-07-23 09:15:08.637845+00', NULL, 'aal1', NULL, '2025-07-23 09:15:08.637758', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '172.18.0.1', NULL),
	('de62a67d-2953-4d7d-b2ca-ae980337cced', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-07-20 15:48:43.302874+00', '2025-07-21 02:59:01.194175+00', NULL, 'aal1', NULL, '2025-07-21 02:59:01.194122', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '172.18.0.1', NULL);


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
	('8ab5f2c6-3952-4716-9c64-ba02d1a52d78', '2025-07-20 05:08:06.892653+00', '2025-07-20 05:08:06.892653+00', 'password', 'bcb02823-5627-443f-bf8a-307dbf63432b'),
	('9a370b79-5b67-4ba5-ad95-30981d3711a6', '2025-07-20 05:16:14.336827+00', '2025-07-20 05:16:14.336827+00', 'password', '8c6d63a7-e0cb-4470-98fe-82fbc4420f82'),
	('13a06a24-9922-4e74-8f79-78444edc5d9d', '2025-07-20 05:22:28.562151+00', '2025-07-20 05:22:28.562151+00', 'password', '0a800a72-fabf-449b-b654-7e9c04f0a37b'),
	('a6f0e2da-509f-4007-b938-a88a62d095f9', '2025-07-20 05:24:49.0207+00', '2025-07-20 05:24:49.0207+00', 'password', '7afdc21e-3978-42cf-aadb-71a12939c204'),
	('b1fe7f4a-7406-4c88-97e9-f792f6a22ef3', '2025-07-20 05:25:15.162709+00', '2025-07-20 05:25:15.162709+00', 'password', '4e6b44b0-1beb-419a-b88a-a8298dc38203'),
	('8f0aa65e-fed3-4457-b624-f917a9c72f46', '2025-07-20 05:25:48.800827+00', '2025-07-20 05:25:48.800827+00', 'password', 'b4c270ce-5584-47ad-ad3e-964a63375151'),
	('83adddb3-22e5-4c8a-b93b-acc4c9502ef2', '2025-07-20 05:26:26.390071+00', '2025-07-20 05:26:26.390071+00', 'password', '08b00fae-cf65-4699-9f53-6eaff5469f2b'),
	('cc0bc6a7-e2fc-4b8d-ac5d-4cfc0a262c18', '2025-07-20 05:27:16.770124+00', '2025-07-20 05:27:16.770124+00', 'password', '3dab0268-a9d1-468a-98aa-6ef52124a1d4'),
	('ffcf8810-4265-4063-abc9-26ff3d607bc1', '2025-07-20 05:28:52.754802+00', '2025-07-20 05:28:52.754802+00', 'password', '04b91ecd-64ab-4bc9-803e-42bdb0b5697e'),
	('f92544d6-acbd-4305-a330-c96d6996d72e', '2025-07-20 05:30:27.533494+00', '2025-07-20 05:30:27.533494+00', 'password', '8f95226a-9928-48b7-9025-6217eccd2c08'),
	('71d35cad-acb9-41bc-8ac7-1c15856534c5', '2025-07-20 05:31:13.742541+00', '2025-07-20 05:31:13.742541+00', 'password', '8f0411fc-a3a3-48ee-b0db-577fbc0b8b44'),
	('a725f972-fd6c-4e02-b73e-c0d31e786382', '2025-07-20 05:38:35.00457+00', '2025-07-20 05:38:35.00457+00', 'password', '5686868c-97a0-4165-b9a9-4f3a90d1cc4d'),
	('07c713e1-64c0-415e-8a67-f12370b30ed2', '2025-07-20 05:41:12.345067+00', '2025-07-20 05:41:12.345067+00', 'password', 'a7fe5f83-fd2a-4a87-b7e7-d46fad16b390'),
	('ed441667-eb49-4b27-8dae-e5c3ea10de20', '2025-07-20 05:41:34.037255+00', '2025-07-20 05:41:34.037255+00', 'password', 'e7ff63b3-8e93-485a-a3c8-5b72953a615f'),
	('d595c797-ae2f-49b3-bd81-d0c3f676ef10', '2025-07-20 05:42:23.071616+00', '2025-07-20 05:42:23.071616+00', 'password', '3b40fab4-0652-4199-ad22-30dea5ae95b5'),
	('ecd4e7d0-4b8e-403a-863a-82475bd9e49e', '2025-07-20 05:42:31.612923+00', '2025-07-20 05:42:31.612923+00', 'password', '8efff974-b8e4-4a4e-b675-1116cd18512a'),
	('066b27fc-2df0-4620-8e99-fdfd0569c3e0', '2025-07-20 05:48:23.311533+00', '2025-07-20 05:48:23.311533+00', 'password', '0aea3f01-acc9-494c-b066-fdb8ae65328f'),
	('b6aae0e3-ef02-4fa8-9930-ff8420e2c2a6', '2025-07-20 05:52:35.698963+00', '2025-07-20 05:52:35.698963+00', 'password', '79c0e932-3752-40dc-90d2-d28b4299a9e4'),
	('ec09fd9e-92b8-4f8d-ae27-00632759f766', '2025-07-20 05:52:39.483667+00', '2025-07-20 05:52:39.483667+00', 'password', '80207334-7c20-4658-afbc-bd6fb322de9f'),
	('800ec500-0850-4537-a3dd-7eaeb5c34d8b', '2025-07-20 05:52:49.369816+00', '2025-07-20 05:52:49.369816+00', 'password', 'f4d96ce1-0f8c-434a-9d31-03318998206c'),
	('2dddb0a2-896d-4144-962f-9d8e3709c06a', '2025-07-20 09:53:44.092607+00', '2025-07-20 09:53:44.092607+00', 'password', '40ed5be6-101d-4f65-9941-168e7078f9c2'),
	('9b1704b3-3db2-4479-a0bc-6a880983fa3a', '2025-07-20 13:52:40.077488+00', '2025-07-20 13:52:40.077488+00', 'password', 'e1abe877-8438-4f62-ab61-72acb235ff71'),
	('de62a67d-2953-4d7d-b2ca-ae980337cced', '2025-07-20 15:48:43.306528+00', '2025-07-20 15:48:43.306528+00', 'password', '5225287d-9007-452d-af6f-219ca8afdca8'),
	('0aeea375-17c8-4a39-b427-fa919f085b7d', '2025-07-20 15:50:26.027344+00', '2025-07-20 15:50:26.027344+00', 'password', 'd013644b-4426-49a2-a2fe-a7bb7998fd9b'),
	('775f426a-a7fa-43b2-aed1-a999c7122044', '2025-07-20 15:50:26.047581+00', '2025-07-20 15:50:26.047581+00', 'password', '88ecff76-d09b-4d8c-9831-7399fbf8eb43'),
	('b3d2da69-bae1-461a-8074-79f786e5a24a', '2025-07-20 15:50:26.051434+00', '2025-07-20 15:50:26.051434+00', 'password', 'a1aea857-2548-42eb-b899-8e8cafe5b839'),
	('a37dabef-0ede-4fb6-9a66-35439f2c367c', '2025-07-21 02:59:27.102187+00', '2025-07-21 02:59:27.102187+00', 'password', 'c5939c8c-0a94-40e1-9453-4aa8c1e3ed12'),
	('cc5b7a29-6d46-4ae6-955c-4ef322dbcddd', '2025-07-21 18:24:42.381594+00', '2025-07-21 18:24:42.381594+00', 'password', 'bf4058e5-d56a-464c-8d8d-697d496a44cb');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('add920f8-3f0d-4b97-bdc8-a4fa79ae9056', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'recovery_token', '5fb81ad6eff9ef400cfe675b35d5b5e9a6bc768355bee0ab52678b3d', 'jd@incub8space.com', '2025-07-20 16:27:41.755621', '2025-07-20 16:27:41.755621');


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
	('00000000-0000-0000-0000-000000000000', 49, 'oe6555gs3v2y', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:08:06.89021+00', '2025-07-20 05:08:06.89021+00', NULL, '8ab5f2c6-3952-4716-9c64-ba02d1a52d78'),
	('00000000-0000-0000-0000-000000000000', 50, 'bn4fwbxt26vq', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:16:14.335794+00', '2025-07-20 05:16:14.335794+00', NULL, '9a370b79-5b67-4ba5-ad95-30981d3711a6'),
	('00000000-0000-0000-0000-000000000000', 51, 'jx7xpig4pflg', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:22:28.559796+00', '2025-07-20 05:22:28.559796+00', NULL, '13a06a24-9922-4e74-8f79-78444edc5d9d'),
	('00000000-0000-0000-0000-000000000000', 52, 'ivzqztgnc5p5', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:24:49.020097+00', '2025-07-20 05:24:49.020097+00', NULL, 'a6f0e2da-509f-4007-b938-a88a62d095f9'),
	('00000000-0000-0000-0000-000000000000', 53, 'ke3nzg2abm4g', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:25:15.162212+00', '2025-07-20 05:25:15.162212+00', NULL, 'b1fe7f4a-7406-4c88-97e9-f792f6a22ef3'),
	('00000000-0000-0000-0000-000000000000', 54, '67xkxua6qdw2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:25:48.800128+00', '2025-07-20 05:25:48.800128+00', NULL, '8f0aa65e-fed3-4457-b624-f917a9c72f46'),
	('00000000-0000-0000-0000-000000000000', 55, '3zxpkhitw5px', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:26:26.389453+00', '2025-07-20 05:26:26.389453+00', NULL, '83adddb3-22e5-4c8a-b93b-acc4c9502ef2'),
	('00000000-0000-0000-0000-000000000000', 56, 'ewdgjwx36enz', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:27:16.769628+00', '2025-07-20 05:27:16.769628+00', NULL, 'cc0bc6a7-e2fc-4b8d-ac5d-4cfc0a262c18'),
	('00000000-0000-0000-0000-000000000000', 57, 'bh67t4rno5du', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:28:52.754232+00', '2025-07-20 05:28:52.754232+00', NULL, 'ffcf8810-4265-4063-abc9-26ff3d607bc1'),
	('00000000-0000-0000-0000-000000000000', 58, 'mhkuspjem4ru', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:30:27.532533+00', '2025-07-20 05:30:27.532533+00', NULL, 'f92544d6-acbd-4305-a330-c96d6996d72e'),
	('00000000-0000-0000-0000-000000000000', 59, 'fa7rmwduysqv', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:31:13.742053+00', '2025-07-20 05:31:13.742053+00', NULL, '71d35cad-acb9-41bc-8ac7-1c15856534c5'),
	('00000000-0000-0000-0000-000000000000', 60, 'yugrw7ds6nqs', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:38:35.004139+00', '2025-07-20 05:38:35.004139+00', NULL, 'a725f972-fd6c-4e02-b73e-c0d31e786382'),
	('00000000-0000-0000-0000-000000000000', 61, 'djqjyni5akuu', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:41:12.344484+00', '2025-07-20 05:41:12.344484+00', NULL, '07c713e1-64c0-415e-8a67-f12370b30ed2'),
	('00000000-0000-0000-0000-000000000000', 62, 'qjxmufv2bk6e', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:41:34.036534+00', '2025-07-20 05:41:34.036534+00', NULL, 'ed441667-eb49-4b27-8dae-e5c3ea10de20'),
	('00000000-0000-0000-0000-000000000000', 63, 'gh2bt7oza2en', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:42:23.07117+00', '2025-07-20 05:42:23.07117+00', NULL, 'd595c797-ae2f-49b3-bd81-d0c3f676ef10'),
	('00000000-0000-0000-0000-000000000000', 64, 'oqfzssvbxycs', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:42:31.612499+00', '2025-07-20 05:42:31.612499+00', NULL, 'ecd4e7d0-4b8e-403a-863a-82475bd9e49e'),
	('00000000-0000-0000-0000-000000000000', 65, 'pm6pheaiowi5', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:48:23.309429+00', '2025-07-20 05:48:23.309429+00', NULL, '066b27fc-2df0-4620-8e99-fdfd0569c3e0'),
	('00000000-0000-0000-0000-000000000000', 66, 'o6ad2a3icu7k', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:52:35.697957+00', '2025-07-20 05:52:35.697957+00', NULL, 'b6aae0e3-ef02-4fa8-9930-ff8420e2c2a6'),
	('00000000-0000-0000-0000-000000000000', 67, 'lp3nydn56zxd', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:52:39.483243+00', '2025-07-20 05:52:39.483243+00', NULL, 'ec09fd9e-92b8-4f8d-ae27-00632759f766'),
	('00000000-0000-0000-0000-000000000000', 68, 'en7uuwkmyiez', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 05:52:49.36907+00', '2025-07-20 05:52:49.36907+00', NULL, '800ec500-0850-4537-a3dd-7eaeb5c34d8b'),
	('00000000-0000-0000-0000-000000000000', 69, '4kwpx25vpdsj', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 09:53:44.089745+00', '2025-07-20 10:52:01.910903+00', NULL, '2dddb0a2-896d-4144-962f-9d8e3709c06a'),
	('00000000-0000-0000-0000-000000000000', 70, '3uf25ghzcg6e', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 10:52:01.915175+00', '2025-07-20 11:50:24.247626+00', '4kwpx25vpdsj', '2dddb0a2-896d-4144-962f-9d8e3709c06a'),
	('00000000-0000-0000-0000-000000000000', 71, 'e6cixevyusgj', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 11:50:24.249252+00', '2025-07-20 12:53:53.581904+00', '3uf25ghzcg6e', '2dddb0a2-896d-4144-962f-9d8e3709c06a'),
	('00000000-0000-0000-0000-000000000000', 72, 'joz3gsyuauhg', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 12:53:53.582826+00', '2025-07-20 13:52:27.760767+00', 'e6cixevyusgj', '2dddb0a2-896d-4144-962f-9d8e3709c06a'),
	('00000000-0000-0000-0000-000000000000', 73, 'xe7vjj3kgk5o', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 13:52:27.762888+00', '2025-07-20 13:52:27.762888+00', 'joz3gsyuauhg', '2dddb0a2-896d-4144-962f-9d8e3709c06a'),
	('00000000-0000-0000-0000-000000000000', 74, '6rxguv5y544l', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 13:52:40.076823+00', '2025-07-20 15:48:18.733499+00', NULL, '9b1704b3-3db2-4479-a0bc-6a880983fa3a'),
	('00000000-0000-0000-0000-000000000000', 75, 'nsxcfvr7327y', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 15:48:18.734821+00', '2025-07-20 15:48:18.734821+00', '6rxguv5y544l', '9b1704b3-3db2-4479-a0bc-6a880983fa3a'),
	('00000000-0000-0000-0000-000000000000', 77, 'lolfpcvhjded', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 15:50:26.025997+00', '2025-07-20 15:50:26.025997+00', NULL, '0aeea375-17c8-4a39-b427-fa919f085b7d'),
	('00000000-0000-0000-0000-000000000000', 78, 'fhjuyz354s5l', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 15:50:26.046728+00', '2025-07-20 15:50:26.046728+00', NULL, '775f426a-a7fa-43b2-aed1-a999c7122044'),
	('00000000-0000-0000-0000-000000000000', 79, 'ilmxyte6qz5q', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-20 15:50:26.050373+00', '2025-07-20 15:50:26.050373+00', NULL, 'b3d2da69-bae1-461a-8074-79f786e5a24a'),
	('00000000-0000-0000-0000-000000000000', 76, 'ycbceby4dzq7', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 15:48:43.305764+00', '2025-07-20 16:47:24.594049+00', NULL, 'de62a67d-2953-4d7d-b2ca-ae980337cced'),
	('00000000-0000-0000-0000-000000000000', 80, 'wdi67eyf7bgr', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 16:47:24.596166+00', '2025-07-20 17:45:45.852799+00', 'ycbceby4dzq7', 'de62a67d-2953-4d7d-b2ca-ae980337cced'),
	('00000000-0000-0000-0000-000000000000', 81, '6hmj4h3kq42i', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-20 17:45:45.854419+00', '2025-07-21 00:56:16.371461+00', 'wdi67eyf7bgr', 'de62a67d-2953-4d7d-b2ca-ae980337cced'),
	('00000000-0000-0000-0000-000000000000', 82, 'mrqu73k7pnb2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-21 00:56:16.371926+00', '2025-07-21 01:55:45.375101+00', '6hmj4h3kq42i', 'de62a67d-2953-4d7d-b2ca-ae980337cced'),
	('00000000-0000-0000-0000-000000000000', 83, '27vy4fqvfug2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-21 01:55:45.37636+00', '2025-07-21 02:59:01.18986+00', 'mrqu73k7pnb2', 'de62a67d-2953-4d7d-b2ca-ae980337cced'),
	('00000000-0000-0000-0000-000000000000', 84, 'teatxc3spams', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-21 02:59:01.190802+00', '2025-07-21 02:59:01.190802+00', '27vy4fqvfug2', 'de62a67d-2953-4d7d-b2ca-ae980337cced'),
	('00000000-0000-0000-0000-000000000000', 85, 'fvoxgcmblt3c', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-21 02:59:27.101025+00', '2025-07-21 05:21:31.735091+00', NULL, 'a37dabef-0ede-4fb6-9a66-35439f2c367c'),
	('00000000-0000-0000-0000-000000000000', 86, '2254vhdovmqu', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-21 05:21:31.736482+00', '2025-07-21 18:24:38.525624+00', 'fvoxgcmblt3c', 'a37dabef-0ede-4fb6-9a66-35439f2c367c'),
	('00000000-0000-0000-0000-000000000000', 87, 'xa7v6z4lczq7', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-21 18:24:38.526941+00', '2025-07-21 18:24:38.526941+00', '2254vhdovmqu', 'a37dabef-0ede-4fb6-9a66-35439f2c367c'),
	('00000000-0000-0000-0000-000000000000', 88, '737xkdk5l2j2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-21 18:24:42.37956+00', '2025-07-22 11:51:06.137117+00', NULL, 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 89, 'su2fprgvdald', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-22 11:51:06.139995+00', '2025-07-22 13:01:22.715357+00', '737xkdk5l2j2', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 90, 'huxx2deeeoal', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-22 13:01:22.717916+00', '2025-07-22 14:02:37.501112+00', 'su2fprgvdald', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 91, 'icn6r3p4t6ix', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-22 14:02:37.503349+00', '2025-07-22 15:19:24.743069+00', 'huxx2deeeoal', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 92, '3i7oquutankt', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-22 15:19:24.746053+00', '2025-07-23 01:22:59.147715+00', 'icn6r3p4t6ix', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 93, 'li6dzoqtzrou', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-23 01:22:59.15294+00', '2025-07-23 02:24:52.903778+00', '3i7oquutankt', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 94, 'ivk2qdrl4hja', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-23 02:24:52.906956+00', '2025-07-23 06:16:27.22631+00', 'li6dzoqtzrou', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 95, 'xiux5zxnzqoz', 'e2039206-f313-49c3-bc16-0596c11e4a5d', true, '2025-07-23 06:16:27.229291+00', '2025-07-23 09:15:08.634527+00', 'ivk2qdrl4hja', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd'),
	('00000000-0000-0000-0000-000000000000', 96, 'lqv5bwuy6wxb', 'e2039206-f313-49c3-bc16-0596c11e4a5d', false, '2025-07-23 09:15:08.635442+00', '2025-07-23 09:15:08.635442+00', 'xiux5zxnzqoz', 'cc5b7a29-6d46-4ae6-955c-4ef322dbcddd');


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
	('0021c85b-7419-453f-8287-83c47347d431', '2025-07-17 06:10:47.472771+00', 'Incub8Space');


--
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."branches" ("created_at", "name", "organization_id", "id") VALUES
	('2025-07-21 01:56:36.741916+00', 'Kawit Branch', '0021c85b-7419-453f-8287-83c47347d431', '6a067506-e3c1-4a31-87f5-432884a84dce');


--
-- Data for Name: spaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."spaces" ("id", "created_at", "name", "is_available", "branch_id") VALUES
	('6ed9b450-425a-453c-bfae-c23727d5c5fe', '2025-07-21 01:57:06.726977+00', 'Meeting Room', true, '6a067506-e3c1-4a31-87f5-432884a84dce');


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bookings" ("created_at", "booked_by", "start_time", "end_time", "date", "status", "id", "space_id") VALUES
	('2025-07-21 01:50:16.638628+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '02:03:00+08', '15:03:00+08', '2025-07-21', 'booked', '9471c888-fafb-4f4a-b2a3-9b9c91d50ee3', '6ed9b450-425a-453c-bfae-c23727d5c5fe'),
	('2025-07-21 03:13:40.766581+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '02:03:00+00', '15:00:00+00', '2025-07-21', 'booked', 'f091f82a-980a-4202-9de6-c7ffd9d011e2', '6ed9b450-425a-453c-bfae-c23727d5c5fe');


--
-- Data for Name: credits; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."credits" ("id", "created_at", "user_id", "expires_at", "status") VALUES
	('c71bfbd6-9d81-4667-a01b-0f64f4b69e1b', '2025-07-17 13:57:46.650455+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-08-16 13:57:46.650455+00', 'used');


--
-- Data for Name: points; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."points" ("created_at", "user_id", "expires_at", "status", "id") VALUES
	('2025-07-20 04:58:56.798121+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-08-19 04:58:56.798121+00', 'active', '868dfe99-da0c-4f77-a04d-248d0c739ddb'),
	('2025-07-20 05:19:10.324407+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '2025-08-19 05:19:10.324407+00', 'active', 'b6f9de93-184c-4a16-a9fb-89f68e83e7ff');


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
	('569bfcdb-f037-465e-8ee8-77d2cb2a8682', '2025-07-20 13:57:33.294459+00', '42DCB7BD', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 13:57:33.294459+00', 'active'),
	('7341d53c-3d0b-423b-a216-60c87c859e49', '2025-07-20 13:58:59.535113+00', '261ADDDA', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 13:58:59.535113+00', 'active'),
	('45a8c39d-605d-4ae2-87d5-bf643c88880c', '2025-07-20 14:02:44.306018+00', '84232F04', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 14:02:44.306018+00', 'active'),
	('c792e3e0-07fb-45bd-80a7-5fc5b908d172', '2025-07-20 14:02:56.05767+00', '326405FC', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 14:02:56.05767+00', 'active'),
	('aa3bd9c6-b01d-4022-99bd-c2cd10c7891d', '2025-07-20 15:49:01.480316+00', '5DDBB8AE', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 15:49:01.480316+00', 'active'),
	('83d31439-3d16-4346-8170-2989fcea78fb', '2025-07-20 15:50:26.179692+00', 'B5215D66', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-19 15:50:26.179692+00', 'active'),
	('4942db09-82a3-4ad0-b86e-12ee7566e302', '2025-07-21 18:24:50.993496+00', '0CF3D412', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-20 18:24:50.993496+00', 'active'),
	('04d0ee1e-b2d3-4abc-9977-3810088139d8', '2025-07-22 11:51:08.686391+00', '3A7110E1', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 11:51:08.686391+00', 'active'),
	('81dcd6d7-6cf1-4022-959e-f03bfc651c30', '2025-07-22 12:05:55.346098+00', 'C03EDF0F', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 12:05:55.346098+00', 'active'),
	('3eb41b2c-6578-4f58-8433-2b62f42f24f4', '2025-07-22 12:05:58.865035+00', '50B45A2D', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 12:05:58.865035+00', 'active'),
	('81980b26-0bd2-4cb9-8cf5-cb1c56c1eaf4', '2025-07-22 12:06:00.766612+00', '4625E751', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 12:06:00.766612+00', 'active'),
	('48131473-5070-419a-bbf3-ff63bc710bdc', '2025-07-22 12:06:02.790756+00', '539883E5', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 12:06:02.790756+00', 'active'),
	('c8f17a95-e64f-4b31-8314-bd47973c0326', '2025-07-22 13:06:24.236651+00', '1BBC3635', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 13:06:24.236651+00', 'active'),
	('280d857b-eefd-424d-bc8e-0db9e647ba66', '2025-07-22 13:13:36.64337+00', '1A810A30', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 13:13:36.64337+00', 'active'),
	('298e6c3e-0048-4b3b-9b1b-78fdf28c687e', '2025-07-22 13:15:02.190098+00', 'EE11FB00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 13:15:02.190098+00', 'active'),
	('d4de21ae-e54d-439d-b9c9-b587a2f56f28', '2025-07-22 13:15:06.810506+00', '95B993C2', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 13:15:06.810506+00', 'active'),
	('09b4c951-aa35-4eed-a69b-66cac8a75c1e', '2025-07-22 13:15:10.879794+00', 'ED5E2C0F', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 13:15:10.879794+00', 'active'),
	('aff2c75d-c2ad-45cd-9e4d-02c9a96f9a05', '2025-07-22 13:15:12.082783+00', '2CBA9520', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 13:15:12.082783+00', 'active'),
	('13abb134-7f72-4595-8a07-474b4928f647', '2025-07-22 13:40:32.944048+00', '8895C513', 'e2039206-f313-49c3-bc16-0596c11e4a5d', 'a8fd26e4-6b73-4ebf-9561-7e07c7c68436', '2025-08-21 13:40:32.944048+00', 'active');


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

INSERT INTO "public"."reward_vouchers" ("id", "created_at", "code", "user_id", "reward_id", "expiring_at", "status") VALUES
	('372b554f-bbc4-47d4-a901-9f8ebfa1269d', '2025-07-20 05:52:35.731722+00', 'ADS21E', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '966923b4-8946-4c22-9ef3-851a4d973ed5', '2025-08-19 05:52:35.731722+00', 'active');


--
-- Data for Name: space_availability; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_organizations" ("id", "created_at", "user_id", "organization_id") VALUES
	('6254af26-aa4c-4896-bd71-9cc16771c591', '2025-07-21 02:56:11.438175+00', 'e2039206-f313-49c3-bc16-0596c11e4a5d', '0021c85b-7419-453f-8287-83c47347d431');


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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 96, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
