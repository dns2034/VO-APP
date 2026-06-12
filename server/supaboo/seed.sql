SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
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
	('00000000-0000-0000-0000-000000000000', '7b0b2879-e342-4104-b774-40c124a7ce55', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"0af06512-6859-4cf4-a1c5-acc2d58d5fd3","user_phone":""}}', '2025-08-10 02:44:00.455766+00', ''),
	('00000000-0000-0000-0000-000000000000', '32877168-d98d-4d08-8393-8202e93cb310', '{"action":"user_recovery_requested","actor_id":"0af06512-6859-4cf4-a1c5-acc2d58d5fd3","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"user"}', '2025-08-10 02:44:07.595726+00', ''),
	('00000000-0000-0000-0000-000000000000', '0873ba2a-4917-4d46-bd4e-9aaa2ef4af20', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"0af06512-6859-4cf4-a1c5-acc2d58d5fd3","user_phone":""}}', '2025-08-10 02:44:31.057864+00', ''),
	('00000000-0000-0000-0000-000000000000', '6025b465-ec0a-49b5-8422-198542c1ec63', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"94f9b359-fb99-4b2e-9648-4ab0eb2d7cc3","user_phone":""}}', '2025-08-10 02:44:40.527715+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f86755b6-e74e-4a7f-9ff8-50fdd4fce4b5', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"94f9b359-fb99-4b2e-9648-4ab0eb2d7cc3","user_phone":""}}', '2025-08-10 02:45:35.821394+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca6562c8-9edb-41c1-8c24-b42a40526397', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"b0e8d22c-ac52-4a9b-a1dc-f65d4b593a41","user_phone":""}}', '2025-08-10 02:45:46.616916+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ff57189-3156-45f8-be7f-e7db0a830613', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"b0e8d22c-ac52-4a9b-a1dc-f65d4b593a41","user_phone":""}}', '2025-08-10 02:51:50.463693+00', ''),
	('00000000-0000-0000-0000-000000000000', '74ea6f54-8940-4b59-9cc6-241841cdf1dd', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jd@incub8space.com","user_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","user_phone":""}}', '2025-08-10 02:52:02.820885+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3fd83be-8ec3-4ce4-8af0-bee75686b593', '{"action":"login","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-10 03:40:24.34127+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b67b6516-d5a3-41c9-8fcf-f2983278870a', '{"action":"login","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-10 03:40:51.555815+00', ''),
	('00000000-0000-0000-0000-000000000000', '2782cc5d-698e-44c9-bcd1-e955a6028db4', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-08-10 05:14:13.375399+00', ''),
	('00000000-0000-0000-0000-000000000000', '034d8503-d764-49c2-bd01-9bdd206ff669', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-08-10 05:14:13.376125+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd1e0b224-d7f9-4fd4-a7c9-fa6beb1091c5', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-08-10 06:27:42.454106+00', ''),
	('00000000-0000-0000-0000-000000000000', '830c8dc9-ce3e-4104-8335-6f68523662dd', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"token"}', '2025-08-10 06:27:42.454519+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e72c27c-309c-430a-a8a6-5acc7bfe09d2', '{"action":"user_modified","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"jd@incub8space.com","actor_via_sso":false,"log_type":"user"}', '2025-08-10 06:35:07.333427+00', ''),
	('00000000-0000-0000-0000-000000000000', 'efc0dfe7-9561-493b-82c8-578ffcb224ab', '{"action":"user_modified","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"user"}', '2025-08-10 06:35:07.339802+00', ''),
	('00000000-0000-0000-0000-000000000000', '399c9223-c186-45aa-bf8f-1cf1c4e84db6', '{"action":"login","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-10 06:47:23.938277+00', ''),
	('00000000-0000-0000-0000-000000000000', '42ee6ffa-dfcb-4bcb-80f1-5b1bb61cac5f', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 07:47:08.037762+00', ''),
	('00000000-0000-0000-0000-000000000000', '872a7a0e-a597-47c7-99dc-100009e91fa6', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 07:47:08.038317+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f5e06e2-16a0-4bd4-9cf3-0de4d1cdaf7c', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 07:51:41.232774+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7e8196c-c606-41f8-91fe-7a553c0984b3', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 07:51:41.236012+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ffbdbfe-4724-4b74-8fb4-4adaafbb1362', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 08:56:09.121094+00', ''),
	('00000000-0000-0000-0000-000000000000', '96079895-6b48-4967-ad67-c752f9472c1b', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 08:56:09.121678+00', ''),
	('00000000-0000-0000-0000-000000000000', '20d4d5a7-2824-4257-8f4b-2ec9bdb8caca', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 15:50:46.316913+00', ''),
	('00000000-0000-0000-0000-000000000000', '14c38f54-d8b8-4160-b87b-c069c55d35c0', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-10 15:50:46.317655+00', ''),
	('00000000-0000-0000-0000-000000000000', '72c1c420-f77d-4cca-8767-754b19ff9198', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 00:27:12.836207+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd8eceac-b85d-4d71-8cbb-495ffa071023', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 00:27:12.836881+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df9d52af-e974-4719-b0f3-fef150a49f0f', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 01:49:52.510844+00', ''),
	('00000000-0000-0000-0000-000000000000', 'afa7aa08-8032-44fb-99cf-3e5b4d1c0f55', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 01:49:52.511654+00', ''),
	('00000000-0000-0000-0000-000000000000', '17267c88-5947-46c3-a111-10596cb3c18f', '{"action":"login","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-11 02:51:29.725031+00', ''),
	('00000000-0000-0000-0000-000000000000', '804033d7-8d61-42c1-bc2e-1eb17a746f9c', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mhel@gmail.com","user_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","user_phone":""}}', '2025-08-11 03:41:16.553421+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a8f5b67-90cd-4fdc-8a16-7678aaa8977c', '{"action":"login","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-11 03:41:28.813137+00', ''),
	('00000000-0000-0000-0000-000000000000', '59e8726d-739f-4b99-98a6-dcae70d58724', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"denese@gmail.com","user_id":"3d5b0956-a876-436c-a744-1eeaa0cbd1c5","user_phone":""}}', '2025-08-11 03:46:32.405417+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b9f7a7f9-704f-4f3a-8c85-0cc9a2c76430', '{"action":"login","actor_id":"3d5b0956-a876-436c-a744-1eeaa0cbd1c5","actor_username":"denese@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-11 03:47:08.924792+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf2c2f59-1eec-4e1b-8265-2c96323cee95', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 03:55:20.116246+00', ''),
	('00000000-0000-0000-0000-000000000000', '058719fc-373f-4950-888e-143788a60f17', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 03:55:20.116993+00', ''),
	('00000000-0000-0000-0000-000000000000', '320596d5-b915-472c-9951-52ad8dae9325', '{"action":"user_modified","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"user"}', '2025-08-11 04:06:13.50572+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a1f72c4-f21d-4063-9972-805c1241c095', '{"action":"login","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-11 04:08:42.499312+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc92a40f-2942-4002-9ed6-cf96c842d1dc', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 04:39:53.987469+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dc64488-d1de-4792-bed7-8d64e8cafbc5', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 04:39:53.988091+00', ''),
	('00000000-0000-0000-0000-000000000000', '58d444d6-d278-4b54-a3c7-fed985d86abd', '{"action":"token_refreshed","actor_id":"3d5b0956-a876-436c-a744-1eeaa0cbd1c5","actor_username":"denese@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:48:29.783541+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c323a66-c096-4db5-bcef-7304b81d1d23', '{"action":"token_revoked","actor_id":"3d5b0956-a876-436c-a744-1eeaa0cbd1c5","actor_username":"denese@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:48:29.784112+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b1e1e88-0c6e-4323-87fb-2d8722016190', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:54:12.221955+00', ''),
	('00000000-0000-0000-0000-000000000000', '12cdeba1-0e43-4160-90b7-bd9b60ba9ff4', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:54:12.222628+00', ''),
	('00000000-0000-0000-0000-000000000000', '61e6bfdd-0d63-4170-af71-f285afd65a7d', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:56:47.610604+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b086b2f3-9fc7-4afc-9a26-4b2b0505ba7f', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:56:47.611546+00', ''),
	('00000000-0000-0000-0000-000000000000', '14bdceb3-1f65-4fef-b681-dab90af61a20', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:57:16.166472+00', ''),
	('00000000-0000-0000-0000-000000000000', '99397574-86b2-4268-976d-31e55eb8cb9a', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 05:57:16.167264+00', ''),
	('00000000-0000-0000-0000-000000000000', '37a72ef4-ef40-41b2-a7c4-fab8e1e45212', '{"action":"user_modified","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"user"}', '2025-08-11 05:59:18.333955+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee0563c3-2d7d-4122-8069-a97456d6e0eb', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 06:20:39.808146+00', ''),
	('00000000-0000-0000-0000-000000000000', '29046a28-db28-41c9-9cf7-fa654f3fef90', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 06:20:39.808902+00', ''),
	('00000000-0000-0000-0000-000000000000', '551a8daa-4735-412a-95f7-22989ba441aa', '{"action":"user_modified","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"user"}', '2025-08-11 06:27:51.214216+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6de4e93-f242-4aee-a7f8-8344931bc4c9', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 06:29:01.274646+00', ''),
	('00000000-0000-0000-0000-000000000000', '515b55b8-3310-4922-8f32-f22b335aca54', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 06:29:01.275253+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a6d8255-1490-49e0-90f3-3773085f1d86', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 06:55:01.281465+00', ''),
	('00000000-0000-0000-0000-000000000000', '89253d73-f724-40c0-a422-7489c7e40dda', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 06:55:01.282277+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d035dc0-4f5d-4c6f-9e49-4ecc82d4075a', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:01:29.542905+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f713069d-c413-4b33-b2e9-4f37e6229975', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:01:29.543657+00', ''),
	('00000000-0000-0000-0000-000000000000', '113ce8e1-f352-4e65-8daa-cfcb78ff4d1f', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:05:42.498778+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f3022fc3-eb74-4ba2-bf3c-6e68f390b27a', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:05:42.499377+00', ''),
	('00000000-0000-0000-0000-000000000000', '23e23f62-23ab-43b7-b250-3e2a2f0a8fe3', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:29:17.892045+00', ''),
	('00000000-0000-0000-0000-000000000000', '296ba494-4b48-4748-a33b-e749ca59d86e', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:29:17.893054+00', ''),
	('00000000-0000-0000-0000-000000000000', '00c7e9cc-4bd6-438c-b490-ed6544998c12', '{"action":"user_modified","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"user"}', '2025-08-11 07:32:43.355064+00', ''),
	('00000000-0000-0000-0000-000000000000', '729b6ee8-106c-4441-9213-c14e36d527b7', '{"action":"logout","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"account"}', '2025-08-11 07:32:55.02409+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f9c2e82-fa55-4348-9707-e68ebf351713', '{"action":"login","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-11 07:40:07.11308+00', ''),
	('00000000-0000-0000-0000-000000000000', '3cdaf868-9f96-4000-ad0f-dfa8d3178fe2', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:54:28.099158+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed861641-a738-48c4-ab19-08b2cb9768da', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 07:54:28.117363+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e8318c5b-8ae7-4cbd-9d61-2d583c880c82', '{"action":"user_modified","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"user"}', '2025-08-11 08:19:25.235401+00', ''),
	('00000000-0000-0000-0000-000000000000', '6103fc5d-1b7c-4bc8-aff0-3abfb57b765a', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:20:25.313395+00', ''),
	('00000000-0000-0000-0000-000000000000', '0f076267-942b-4a65-93c9-9adb0b7a506c', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:20:25.313973+00', ''),
	('00000000-0000-0000-0000-000000000000', '24f268fa-7e02-41e3-954c-0d1d9b489bd3', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:28:36.723111+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a79e0dbe-4e5c-4758-ba13-c54ba3c8264b', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:28:36.723593+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dfb2d47-36c1-4ee7-92ab-2e532b47e506', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:42:15.569734+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f91cbe47-4932-4b23-b8a9-f0518999cae3', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:42:15.570356+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4ba5e93-a4d4-457b-9cca-b2ccd6c3a2c8', '{"action":"token_refreshed","actor_id":"3d5b0956-a876-436c-a744-1eeaa0cbd1c5","actor_username":"denese@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:46:56.568381+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f524a876-ab06-4418-ba7e-3a13bfb4ca26', '{"action":"token_revoked","actor_id":"3d5b0956-a876-436c-a744-1eeaa0cbd1c5","actor_username":"denese@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:46:56.569033+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ea965f8-f2d9-419e-8f8e-20d4338d56a3', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:53:33.822903+00', ''),
	('00000000-0000-0000-0000-000000000000', '2bc0be81-565c-49fd-8fe1-83d45b002a2d', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 08:53:33.823394+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb7a8d73-d9c5-4d7b-9ef8-799ab33b3ff7', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 09:27:52.432734+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e86724f-e1a2-490b-a77c-10189d36508e', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 09:27:52.433236+00', ''),
	('00000000-0000-0000-0000-000000000000', '6dc002c6-ede1-45e3-ae1c-7127216e4df9', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 09:52:46.884019+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b4bc88b-325c-4cbf-a1dc-88f01b508f86', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 09:52:46.884612+00', ''),
	('00000000-0000-0000-0000-000000000000', '31ef8a5c-6997-43f7-ba51-aa59d226001c', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"user1@gmail.com","user_id":"c5933812-a59e-4665-8f34-54db651b50ba","user_phone":""}}', '2025-08-11 09:54:34.597601+00', ''),
	('00000000-0000-0000-0000-000000000000', '26194d97-3f63-4b7e-8e28-7cb1d2f8b1e6', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:26:46.100915+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb5c2cd5-d284-4cda-acc7-30958d50126a', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:26:46.101732+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1eafb77-313a-4da2-97ae-14b3642fd481', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:34:22.378921+00', ''),
	('00000000-0000-0000-0000-000000000000', '25aa4aae-27e8-4cc0-8587-b9de1dc7adf0', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:34:22.379639+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e364c3ac-7621-4e89-84e8-99e1a41b4113', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:50:48.46852+00', ''),
	('00000000-0000-0000-0000-000000000000', '0cf84820-a896-4d6a-8436-7671fb4bba8e', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:50:48.469265+00', ''),
	('00000000-0000-0000-0000-000000000000', '9138752a-eafa-4e3f-a21d-d0b0c59de982', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:52:56.981489+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb818c1a-7ab9-4859-ba3f-9df1d6df4656', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:52:56.982292+00', ''),
	('00000000-0000-0000-0000-000000000000', '2837b404-5617-4a87-aadc-93a1584b9aa3', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:53:00.792555+00', ''),
	('00000000-0000-0000-0000-000000000000', '6894a54b-2830-423b-8a8d-f5e309d9d5b3', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 10:53:00.793285+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a066ab91-e321-4e95-95fd-dbd9f41e2e04', '{"action":"login","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-08-11 11:26:31.437748+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3ca780e-60d3-4fd7-b936-573bdf0bcd6a', '{"action":"user_modified","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"user"}', '2025-08-11 11:31:58.085137+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a58b29f3-a298-4e74-ba89-6b9db86a6916', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 12:16:23.120487+00', ''),
	('00000000-0000-0000-0000-000000000000', '31ebf38a-be6e-422f-b1d2-25aca6d02c1b', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 12:16:23.121011+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f88cbdba-c20a-41ea-a8fa-59cdf01ff4da', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 12:57:30.378102+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eeebd570-00a9-4bce-b5c5-771d35aeab15', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 12:57:30.379074+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ca4deca-2c07-49da-ba17-fb78a491d502', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 13:06:05.995437+00', ''),
	('00000000-0000-0000-0000-000000000000', '68d58df3-fee9-491b-bded-ba84db8f11b3', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 13:06:06.031514+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d5485b3-3877-401d-b742-d6edde3b01ab', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 13:45:41.234672+00', ''),
	('00000000-0000-0000-0000-000000000000', '6986ff10-f6cf-4908-969f-f1ca06fb1b3f', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 13:45:41.235439+00', ''),
	('00000000-0000-0000-0000-000000000000', '01b8a79c-6355-490b-970d-a3ff68c9a64e', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 15:31:46.067006+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db36b81e-fbe1-44e7-bb77-d2c3db2166db', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 15:31:46.06809+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd4dc9cf9-974e-430e-ac4a-1f91ca689f87', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 16:19:55.106467+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4b4b86d-2d08-4526-8872-00d99cc8e623', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 16:19:55.107334+00', ''),
	('00000000-0000-0000-0000-000000000000', '4411188b-7d0f-4c35-a216-706e805258bb', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 22:30:12.445074+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e0cc67c-5a8d-40fa-bdf7-ad3e87fb03d2', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-11 22:30:12.551293+00', ''),
	('00000000-0000-0000-0000-000000000000', '4aa007ec-8456-4d51-8ddb-66b8b2a03498', '{"action":"token_refreshed","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 23:26:51.03243+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc766891-3b18-48cc-b68b-811a4f012322', '{"action":"token_revoked","actor_id":"409fa2fc-4a5d-4761-88c8-20daf65d4b71","actor_username":"977666171","actor_via_sso":false,"log_type":"token"}', '2025-08-11 23:26:51.032994+00', ''),
	('00000000-0000-0000-0000-000000000000', '21c88467-0569-4e56-b83e-94f646ff37b6', '{"action":"token_refreshed","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-12 00:04:44.477384+00', ''),
	('00000000-0000-0000-0000-000000000000', '5358a59e-24d7-4b28-85b0-b4fb11765f3e', '{"action":"token_revoked","actor_id":"66f6964e-be2a-4e17-ae6d-ead36e8aab2c","actor_username":"mhel@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-08-12 00:04:44.478202+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'authenticated', 'authenticated', 'jd@incub8space.com', '$2a$10$5wEVRzQ22PA4AGKllOj0f.WDYgkRPusrdrJbP2t39SqbYGJ0rrp/S', '2025-08-10 02:52:02.821887+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-08-11 11:26:31.438619+00', '{"provider": "email", "providers": ["email"]}', '{"display_name": "Jd", "email_verified": true}', NULL, '2025-08-10 02:52:02.818547+00', '2025-08-11 23:26:51.034309+00', '977666171', '2025-08-10 06:35:07.33624+00', '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', 'authenticated', 'authenticated', 'mhel@gmail.com', '$2a$10$MCXCM.btfDFHxKBuHdADhOJpr6Wi6IDyvQTIVzwkjOIqSP3hGpfWO', '2025-08-11 03:41:16.562548+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-08-11 04:08:42.499986+00', '{"provider": "email", "providers": ["email"]}', '{"avatar_url": "https://api.virtualoffice.incub8.space/storage/v1/object/public/avatars/66f6964e-be2a-4e17-ae6d-ead36e8aab2c/avatar?t=1754885173430", "email_verified": true}', NULL, '2025-08-11 03:41:16.551184+00', '2025-08-12 00:04:44.480369+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', 'authenticated', 'authenticated', 'denese@gmail.com', '$2a$10$5CR3hWjyhjyLE1D55laQGuhcSlDrquuDHFPtn45cEXY2TOXhOp3.u', '2025-08-11 03:46:32.406513+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-08-11 03:47:08.925447+00', '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-08-11 03:46:32.40366+00', '2025-08-11 08:46:56.571006+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c5933812-a59e-4665-8f34-54db651b50ba', 'authenticated', 'authenticated', 'user1@gmail.com', '$2a$10$LgvEJyPqTCEVOFTZQ/3j.ONQoBupyL0aQCt7JoXwbmd0WIVeE1jzO', '2025-08-11 09:54:34.599574+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-08-11 09:54:34.569483+00', '2025-08-11 09:54:34.60054+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('409fa2fc-4a5d-4761-88c8-20daf65d4b71', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '{"sub": "409fa2fc-4a5d-4761-88c8-20daf65d4b71", "email": "jd@incub8space.com", "email_verified": false, "phone_verified": false}', 'email', '2025-08-10 02:52:02.820097+00', '2025-08-10 02:52:02.820156+00', '2025-08-10 02:52:02.820156+00', '290db093-120f-4c94-ac52-329cef59a11e'),
	('409fa2fc-4a5d-4761-88c8-20daf65d4b71', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '{"sub": "409fa2fc-4a5d-4761-88c8-20daf65d4b71", "phone": "977666171", "email_verified": false, "phone_verified": true}', 'phone', '2025-08-10 06:35:07.334527+00', '2025-08-10 06:35:07.335277+00', '2025-08-10 06:35:07.337944+00', '63e81390-2f73-41d8-8688-e5a4fc44a9da'),
	('66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '{"sub": "66f6964e-be2a-4e17-ae6d-ead36e8aab2c", "email": "mhel@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-08-11 03:41:16.552361+00', '2025-08-11 03:41:16.552428+00', '2025-08-11 03:41:16.552428+00', '631314fc-dac3-400a-ad2c-6018827d3cc0'),
	('3d5b0956-a876-436c-a744-1eeaa0cbd1c5', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', '{"sub": "3d5b0956-a876-436c-a744-1eeaa0cbd1c5", "email": "denese@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-08-11 03:46:32.404604+00', '2025-08-11 03:46:32.404662+00', '2025-08-11 03:46:32.404662+00', 'd75bcfe9-bef6-46b0-b446-635ec76e27d5'),
	('c5933812-a59e-4665-8f34-54db651b50ba', 'c5933812-a59e-4665-8f34-54db651b50ba', '{"sub": "c5933812-a59e-4665-8f34-54db651b50ba", "email": "user1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-08-11 09:54:34.596026+00', '2025-08-11 09:54:34.59611+00', '2025-08-11 09:54:34.59611+00', '70c89e71-95ba-46f4-ba7b-e8ccf0781a4c');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('9e9525ce-3e0d-425e-a207-99383b66979a', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', '2025-08-11 03:47:08.925541+00', '2025-08-11 08:46:56.572067+00', NULL, 'aal1', NULL, '2025-08-11 08:46:56.571976', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '124.104.149.138', NULL),
	('8df01724-b989-428b-845b-18a9fe89e355', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-08-10 03:40:51.556563+00', '2025-08-11 10:34:22.383753+00', NULL, 'aal1', NULL, '2025-08-11 10:34:22.383638', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/139.0.7258.76 Mobile/15E148 Safari/604.1', '124.104.149.138', NULL),
	('bdd9e490-7b4d-49ed-8808-ce42e469aaee', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-08-10 03:40:24.34207+00', '2025-08-11 12:57:30.386241+00', NULL, 'aal1', NULL, '2025-08-11 12:57:30.38615', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '124.104.149.138', NULL),
	('e002fdc6-8981-4734-8f6e-f7ba1cb493fe', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-08-11 07:40:07.113891+00', '2025-08-11 13:06:06.035134+00', NULL, 'aal1', NULL, '2025-08-11 13:06:06.035044', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1', '124.104.149.138', NULL),
	('a2e95719-c466-45e9-9b4c-fe7fe51c5fe8', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-08-11 11:26:31.438745+00', '2025-08-11 16:19:55.110515+00', NULL, 'aal1', NULL, '2025-08-11 16:19:55.110409', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', '64.224.105.23', NULL),
	('f0a445bc-30cf-4cc4-beb8-149da5ad7884', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '2025-08-11 04:08:42.500077+00', '2025-08-11 22:30:12.555065+00', NULL, 'aal1', NULL, '2025-08-11 22:30:12.554954', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', '124.217.62.110', NULL),
	('ca1442ae-0270-4d53-89b2-99f2eb24c340', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-08-11 02:51:29.725924+00', '2025-08-11 23:26:51.035083+00', NULL, 'aal1', NULL, '2025-08-11 23:26:51.034997', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '64.224.105.23', NULL),
	('a66928dd-9cc6-4ea0-87f4-bead557da28f', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '2025-08-11 03:41:28.814216+00', '2025-08-12 00:04:44.48142+00', NULL, 'aal1', NULL, '2025-08-12 00:04:44.481313', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '124.104.149.138', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('bdd9e490-7b4d-49ed-8808-ce42e469aaee', '2025-08-10 03:40:24.455875+00', '2025-08-10 03:40:24.455875+00', 'password', '2589d9b1-6e4a-47d3-8c16-3fd88fdb27bc'),
	('8df01724-b989-428b-845b-18a9fe89e355', '2025-08-10 03:40:51.558222+00', '2025-08-10 03:40:51.558222+00', 'password', 'bfbd28a5-8e2c-4bf3-8ee6-660cd0b6cf84'),
	('ca1442ae-0270-4d53-89b2-99f2eb24c340', '2025-08-11 02:51:29.873814+00', '2025-08-11 02:51:29.873814+00', 'password', '472158cd-2913-436d-a717-7ef7c755b127'),
	('a66928dd-9cc6-4ea0-87f4-bead557da28f', '2025-08-11 03:41:28.81643+00', '2025-08-11 03:41:28.81643+00', 'password', '8b8d35b0-5c72-45c3-bca7-aeedc25d54ae'),
	('9e9525ce-3e0d-425e-a207-99383b66979a', '2025-08-11 03:47:08.927647+00', '2025-08-11 03:47:08.927647+00', 'password', '1df7ded6-687e-4cb5-a069-b6fbc609b32b'),
	('f0a445bc-30cf-4cc4-beb8-149da5ad7884', '2025-08-11 04:08:42.502012+00', '2025-08-11 04:08:42.502012+00', 'password', 'e9c5bf86-b9a9-4a28-a0e6-5ff2e35e95fa'),
	('e002fdc6-8981-4734-8f6e-f7ba1cb493fe', '2025-08-11 07:40:07.250827+00', '2025-08-11 07:40:07.250827+00', 'password', 'e1b3f808-e46e-44e7-a698-dd6eed14386b'),
	('a2e95719-c466-45e9-9b4c-fe7fe51c5fe8', '2025-08-11 11:26:31.469912+00', '2025-08-11 11:26:31.469912+00', 'password', 'd14d4dba-266b-49b4-9bd8-53ccb1c45322');


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
	('00000000-0000-0000-0000-000000000000', 2, 'cjqp7gg3syde', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-10 03:40:51.557276+00', '2025-08-10 05:14:13.376712+00', NULL, '8df01724-b989-428b-845b-18a9fe89e355'),
	('00000000-0000-0000-0000-000000000000', 3, 'jaiwvupui6b2', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-10 05:14:13.377455+00', '2025-08-10 06:27:42.454907+00', 'cjqp7gg3syde', '8df01724-b989-428b-845b-18a9fe89e355'),
	('00000000-0000-0000-0000-000000000000', 1, 'viqc6tmxo2eh', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-10 03:40:24.343478+00', '2025-08-10 07:51:41.236775+00', NULL, 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 4, '5qj5zqbd5uvr', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-10 06:27:42.455146+00', '2025-08-10 08:56:09.122119+00', 'jaiwvupui6b2', '8df01724-b989-428b-845b-18a9fe89e355'),
	('00000000-0000-0000-0000-000000000000', 12, 'nqsq2c7u56sv', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 02:51:29.872217+00', '2025-08-11 03:55:20.117706+00', NULL, 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 13, '6obot6dh3k6z', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 03:41:28.815183+00', '2025-08-11 04:39:53.988541+00', NULL, 'a66928dd-9cc6-4ea0-87f4-bead557da28f'),
	('00000000-0000-0000-0000-000000000000', 14, 'wqmcq2diqvmd', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', true, '2025-08-11 03:47:08.926382+00', '2025-08-11 05:48:29.784507+00', NULL, '9e9525ce-3e0d-425e-a207-99383b66979a'),
	('00000000-0000-0000-0000-000000000000', 17, 'fn6wd75yys3q', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 04:39:53.988817+00', '2025-08-11 05:54:12.223247+00', '6obot6dh3k6z', 'a66928dd-9cc6-4ea0-87f4-bead557da28f'),
	('00000000-0000-0000-0000-000000000000', 7, 'ksmkoadutgft', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-10 07:51:41.23719+00', '2025-08-11 05:56:47.612259+00', 'viqc6tmxo2eh', 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 8, '4o7tymhfncmg', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-10 08:56:09.122477+00', '2025-08-11 06:20:39.809572+00', '5qj5zqbd5uvr', '8df01724-b989-428b-845b-18a9fe89e355'),
	('00000000-0000-0000-0000-000000000000', 15, 'ylafji3eukbh', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 03:55:20.118045+00', '2025-08-11 06:29:01.275764+00', 'nqsq2c7u56sv', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 20, 'ffs6ybxxjvag', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 05:56:47.612763+00', '2025-08-11 06:55:01.28298+00', 'ksmkoadutgft', 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 19, 'nheahdoylwyt', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 05:54:12.223583+00', '2025-08-11 07:05:42.499895+00', 'fn6wd75yys3q', 'a66928dd-9cc6-4ea0-87f4-bead557da28f'),
	('00000000-0000-0000-0000-000000000000', 23, 'hnj2p2l537sn', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 06:29:01.27616+00', '2025-08-11 07:29:17.893812+00', 'ylafji3eukbh', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 24, 'cmrvfxnb5m7p', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 06:55:01.283456+00', '2025-08-11 07:54:28.117923+00', 'ffs6ybxxjvag', 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 26, 'vieuw5guewfh', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 07:05:42.500187+00', '2025-08-11 08:20:25.314462+00', 'nheahdoylwyt', 'a66928dd-9cc6-4ea0-87f4-bead557da28f'),
	('00000000-0000-0000-0000-000000000000', 27, 'rwbnkcc5usqg', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 07:29:17.894251+00', '2025-08-11 08:28:36.724038+00', 'hnj2p2l537sn', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 16, 'kg334bzunjds', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 04:08:42.500833+00', '2025-08-11 08:42:15.571117+00', NULL, 'f0a445bc-30cf-4cc4-beb8-149da5ad7884'),
	('00000000-0000-0000-0000-000000000000', 18, 'u4rnqbycxef7', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', true, '2025-08-11 05:48:29.784766+00', '2025-08-11 08:46:56.569592+00', 'wqmcq2diqvmd', '9e9525ce-3e0d-425e-a207-99383b66979a'),
	('00000000-0000-0000-0000-000000000000', 33, 'b4ioj4niclur', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', false, '2025-08-11 08:46:56.56994+00', '2025-08-11 08:46:56.56994+00', 'u4rnqbycxef7', '9e9525ce-3e0d-425e-a207-99383b66979a'),
	('00000000-0000-0000-0000-000000000000', 29, '4jfcuaoby4py', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 07:54:28.118287+00', '2025-08-11 08:53:33.823765+00', 'cmrvfxnb5m7p', 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 31, '6hyua27w42n6', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 08:28:36.724298+00', '2025-08-11 09:27:52.433656+00', 'rwbnkcc5usqg', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 28, 'rsuau3gcybx6', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 07:40:07.11556+00', '2025-08-11 09:52:46.885084+00', NULL, 'e002fdc6-8981-4734-8f6e-f7ba1cb493fe'),
	('00000000-0000-0000-0000-000000000000', 35, 'cmo6viyb5dmy', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 09:27:52.433995+00', '2025-08-11 10:26:46.1029+00', '6hyua27w42n6', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 22, 'ma3ajhndto4n', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 06:20:39.810043+00', '2025-08-11 10:34:22.380218+00', '4o7tymhfncmg', '8df01724-b989-428b-845b-18a9fe89e355'),
	('00000000-0000-0000-0000-000000000000', 38, '26hkbkixt2j4', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', false, '2025-08-11 10:34:22.380582+00', '2025-08-11 10:34:22.380582+00', 'ma3ajhndto4n', '8df01724-b989-428b-845b-18a9fe89e355'),
	('00000000-0000-0000-0000-000000000000', 36, 'gxxdzjvoxjof', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 09:52:46.885382+00', '2025-08-11 10:50:48.469904+00', 'rsuau3gcybx6', 'e002fdc6-8981-4734-8f6e-f7ba1cb493fe'),
	('00000000-0000-0000-0000-000000000000', 34, 'y3qwwqe2umkg', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 08:53:33.824028+00', '2025-08-11 10:52:56.983044+00', '4jfcuaoby4py', 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 32, 'xqgj4siavg3p', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 08:42:15.571368+00', '2025-08-11 10:53:00.793891+00', 'kg334bzunjds', 'f0a445bc-30cf-4cc4-beb8-149da5ad7884'),
	('00000000-0000-0000-0000-000000000000', 37, 'anqx7nijv4r6', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 10:26:46.103457+00', '2025-08-11 12:16:23.121508+00', 'cmo6viyb5dmy', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 40, 'lurqfdjffpbh', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 10:52:56.983459+00', '2025-08-11 12:57:30.380194+00', 'y3qwwqe2umkg', 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 44, 'xagwyiulm6bs', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', false, '2025-08-11 12:57:30.380666+00', '2025-08-11 12:57:30.380666+00', 'lurqfdjffpbh', 'bdd9e490-7b4d-49ed-8808-ce42e469aaee'),
	('00000000-0000-0000-0000-000000000000', 39, 'woo4okbvcsqh', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 10:50:48.470257+00', '2025-08-11 13:06:06.032332+00', 'gxxdzjvoxjof', 'e002fdc6-8981-4734-8f6e-f7ba1cb493fe'),
	('00000000-0000-0000-0000-000000000000', 45, 'srcugink4qo3', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', false, '2025-08-11 13:06:06.03269+00', '2025-08-11 13:06:06.03269+00', 'woo4okbvcsqh', 'e002fdc6-8981-4734-8f6e-f7ba1cb493fe'),
	('00000000-0000-0000-0000-000000000000', 43, 'napchzqieeev', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 12:16:23.12187+00', '2025-08-11 13:45:41.236105+00', 'anqx7nijv4r6', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 46, 'x6lybhetslg4', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 13:45:41.236476+00', '2025-08-11 15:31:46.068814+00', 'napchzqieeev', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 42, 'ca24yuwla762', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 11:26:31.468275+00', '2025-08-11 16:19:55.107984+00', NULL, 'a2e95719-c466-45e9-9b4c-fe7fe51c5fe8'),
	('00000000-0000-0000-0000-000000000000', 48, 'tyiuuqgv5alt', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', false, '2025-08-11 16:19:55.108359+00', '2025-08-11 16:19:55.108359+00', 'ca24yuwla762', 'a2e95719-c466-45e9-9b4c-fe7fe51c5fe8'),
	('00000000-0000-0000-0000-000000000000', 41, 'l4u5ec65du73', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 10:53:00.794273+00', '2025-08-11 22:30:12.552474+00', 'xqgj4siavg3p', 'f0a445bc-30cf-4cc4-beb8-149da5ad7884'),
	('00000000-0000-0000-0000-000000000000', 49, 'kdaaynpsmo2l', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', false, '2025-08-11 22:30:12.552858+00', '2025-08-11 22:30:12.552858+00', 'l4u5ec65du73', 'f0a445bc-30cf-4cc4-beb8-149da5ad7884'),
	('00000000-0000-0000-0000-000000000000', 47, 'd4ptrzvwr2s3', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', true, '2025-08-11 15:31:46.08174+00', '2025-08-11 23:26:51.033431+00', 'x6lybhetslg4', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 50, '5qhaimj4rbjd', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', false, '2025-08-11 23:26:51.033699+00', '2025-08-11 23:26:51.033699+00', 'd4ptrzvwr2s3', 'ca1442ae-0270-4d53-89b2-99f2eb24c340'),
	('00000000-0000-0000-0000-000000000000', 30, 'rggkhkyalpvz', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', true, '2025-08-11 08:20:25.314796+00', '2025-08-12 00:04:44.478804+00', 'vieuw5guewfh', 'a66928dd-9cc6-4ea0-87f4-bead557da28f'),
	('00000000-0000-0000-0000-000000000000', 51, 'nkq4qa5in6ni', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', false, '2025-08-12 00:04:44.479181+00', '2025-08-12 00:04:44.479181+00', 'rggkhkyalpvz', 'a66928dd-9cc6-4ea0-87f4-bead557da28f');


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
	('383e244f-fe3c-4a59-8a1b-2b66121a5e03', '2025-08-10 06:44:40.476266+00', 'Incub8Space');


--
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."branches" ("created_at", "name", "organization_id", "id", "image_path", "location") VALUES
	('2025-08-11 01:26:54.843789+00', 'Dasmariñas', '383e244f-fe3c-4a59-8a1b-2b66121a5e03', 'c15584d6-48e4-4272-bbd5-7de2d8f1d910', '/branches/383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/amenity_image_4.webp', '8WGV+HPG, Dasmariñas, Cavite'),
	('2025-08-10 06:48:23.275153+00', 'Kawit', '383e244f-fe3c-4a59-8a1b-2b66121a5e03', '4c04626a-6921-4356-a1bc-1ba4f2dc247c', '/branches/383e244f-fe3c-4a59-8a1b-2b66121a5e03/4c04626a-6921-4356-a1bc-1ba4f2dc247c/kawit-branch.webp', '2F, Robertson Plaza, Centennial Road, Kawit, 4107 Cavite');


--
-- Data for Name: spaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."spaces" ("id", "created_at", "name", "is_available", "branch_id") VALUES
	('687cba2a-f95c-4620-b257-4dced7a520f0', '2025-08-10 07:29:31.118997+00', 'Meeting Room', true, '4c04626a-6921-4356-a1bc-1ba4f2dc247c'),
	('9998fd80-fb2a-452f-9289-af7369c64001', '2025-08-11 00:48:42.768493+00', 'Coworking', true, '4c04626a-6921-4356-a1bc-1ba4f2dc247c');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products" ("id", "created_at", "name", "description", "image_path", "price", "space_id", "duration") VALUES
	('d2d6719b-eb00-4f38-a2d2-19be43b5392f', '2025-08-11 00:50:51.34672+00', '1-Day Coworking', '1 day coworking room access', '/products/383e244f-fe3c-4a59-8a1b-2b66121a5e03/687cba2a-f95c-4620-b257-4dced7a520f0/d2d6719b-eb00-4f38-a2d2-19be43b5392f/coworking.webp', 1, '9998fd80-fb2a-452f-9289-af7369c64001', 24),
	('e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-08-10 07:31:21.393107+00', '1-Hour Meeting Room', '1 hour meeting room access', '/products/383e244f-fe3c-4a59-8a1b-2b66121a5e03/687cba2a-f95c-4620-b257-4dced7a520f0/e2d8e588-853c-4b10-802d-7f3fb0a5f587/meeting-room.webp', 1, '687cba2a-f95c-4620-b257-4dced7a520f0', 1);


--
-- Data for Name: product_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_vouchers" ("id", "created_at", "code", "user_id", "product_id", "expiring_at", "status", "is_refundable", "updated_at") VALUES
	('c72f199c-365e-41c0-9a28-d0697d6ce593', '2025-08-11 04:10:53.806493+00', 'D1766906', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-10 04:10:53.806493+00', 'active', true, '2025-08-11 08:44:22.710884+00'),
	('c1429171-5658-40d0-a585-ad3e9b61fc75', '2025-08-11 08:50:30.512562+00', 'DD078F2F', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-10 08:50:30.512562+00', 'active', true, '2025-08-11 08:50:30.512562+00'),
	('bc1571f4-c512-4bbd-8453-b8d81824732d', '2025-08-10 07:32:17.372029+00', '1A11908A', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-09 07:32:17.372029+00', 'active', true, '2025-08-10 07:34:34.384038+00'),
	('421e37b6-4afe-4cf1-be85-cdf6c96d2dd3', '2025-08-11 04:13:10.518811+00', '91608A9E', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-10 04:13:10.518811+00', 'used', true, '2025-08-11 09:02:06.203002+00'),
	('79f4b622-37b4-45e5-b584-8ae73d2ce5a9', '2025-08-11 10:30:40.87291+00', '4AF0F22F', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-10 10:30:40.87291+00', 'active', true, '2025-08-11 10:30:40.87291+00'),
	('fd68d187-5d5a-45f4-aa51-e07fd47be61c', '2025-08-11 10:47:25.930462+00', '25321A12', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'd2d6719b-eb00-4f38-a2d2-19be43b5392f', '2025-09-10 10:47:25.930462+00', 'used', true, '2025-08-11 10:50:08.73405+00'),
	('9fd6ad4d-d5b7-40cb-b6dc-81917d37d6a0', '2025-08-11 11:03:52.560574+00', '1027C3FE', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-10 11:03:52.560574+00', 'active', true, '2025-08-11 11:03:52.560574+00'),
	('2e368d7d-19b6-42bb-9a2e-677cc1dc19ad', '2025-08-11 11:23:14.455736+00', 'CABE53D0', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-10 11:23:14.455736+00', 'used', false, '2025-08-11 11:23:14.455736+00'),
	('8144f400-2295-4169-9c66-4935f4510699', '2025-08-11 11:30:17.560742+00', 'AAFDBC90', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'd2d6719b-eb00-4f38-a2d2-19be43b5392f', '2025-09-10 11:30:17.560742+00', 'active', true, '2025-08-11 11:30:17.560742+00'),
	('8af43dad-cdc2-4432-a2a3-b0473d3477be', '2025-08-11 11:30:27.638193+00', '41AA0024', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'e2d8e588-853c-4b10-802d-7f3fb0a5f587', '2025-09-10 11:30:27.638193+00', 'active', true, '2025-08-11 11:30:27.638193+00');


--
-- Data for Name: space_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."space_units" ("id", "created_at", "name", "space_id") VALUES
	('9fc2d382-f2a7-4ab4-9e9a-4358a44e7e32', '2025-08-10 07:29:46.220595+00', 'Kawit Meeting Room', '687cba2a-f95c-4620-b257-4dced7a520f0'),
	('31f5423e-9f1d-45cc-9d3e-cf098f7e0599', '2025-08-11 10:49:49.571526+00', 'Kawit Table 1 - Desk 1', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('c66ae703-3e04-499f-b31a-5710fb968b8d', '2025-08-11 10:49:58.978979+00', 'Kawit Table 1 - Desk 2', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('94107b9e-df0a-4586-b979-a77b7d1c09bf', '2025-08-11 10:50:07.431906+00', 'Kawit Table 1 - Desk 3', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('12e8087a-9118-48a9-bec7-930a1714c6c7', '2025-08-11 10:50:18.311548+00', 'Kawit Table 1 - Desk 4', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('b46e69ab-51fe-474a-8cbd-23288517fc97', '2025-08-11 10:50:28.681777+00', 'Kawit Table 2 - Desk 1', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('bc826f25-436b-4378-a124-5a2d47cdeeeb', '2025-08-11 10:50:36.414203+00', 'Kawit Table 2 - Desk 2', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('1df02f43-5e26-45f6-ae0f-1cc35195959f', '2025-08-11 10:50:44.751961+00', 'Kawit Table 2 - Desk 3', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('12de3d27-b499-4f60-ac2b-875637c4552d', '2025-08-11 10:50:53.716847+00', 'Kawit Table 2 - Desk 4', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('f60ed9f7-aff7-4a4a-b485-a66252bff92f', '2025-08-11 10:51:08.401585+00', 'Kawit Table 3 - Desk 1', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('e0764887-9ea5-4bd7-af60-c7053b106648', '2025-08-11 10:51:31.057274+00', 'Kawit Table 3 - Desk 2', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('4f09b7bf-637c-409d-bb27-73633d859a5e', '2025-08-11 10:51:39.523362+00', 'Kawit Table 3 - Desk 3', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('63ecca2c-3f0e-4bb2-9765-f2277a6de170', '2025-08-11 10:51:48.872145+00', 'Kawit Table 3 - Desk 4', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('2f6b62db-07f9-4418-a790-9f0299754d05', '2025-08-11 10:52:00.871578+00', 'Kawit Table 4 - Desk 1', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('ddd94d39-9a79-4b96-8201-0cb6c26db446', '2025-08-11 10:52:14.760457+00', 'Kawit Table 4 - Desk 2', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('1b417085-2d2b-48aa-bdad-e4615d688d7b', '2025-08-11 10:52:24.122775+00', 'Kawit Table 4 - Desk 3', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('7c7d75bd-f88c-4f09-977d-3511d2e90929', '2025-08-11 10:52:35.954513+00', 'Kawit Table 4 - Desk 4', '9998fd80-fb2a-452f-9289-af7369c64001');


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bookings" ("created_at", "booked_by", "start_time", "end_time", "date", "status", "id", "remarks", "product_voucher_id", "space_unit_id") VALUES
	('2025-08-11 10:50:08.73405+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '08:00:00+08', '20:00:00+08', '2025-08-11', 'booked', '36df8be1-2c53-40f4-ac1e-a1b86cf05808', '', 'fd68d187-5d5a-45f4-aa51-e07fd47be61c', '31f5423e-9f1d-45cc-9d3e-cf098f7e0599'),
	('2025-08-11 11:23:14.455736+00', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '10:00:00+08', '11:00:00+08', '2025-08-12', 'booked', 'c8691edd-31bc-4c30-ae2d-e8ee4ceba93d', 'Meeting test', '2e368d7d-19b6-42bb-9a2e-677cc1dc19ad', '9fc2d382-f2a7-4ab4-9e9a-4358a44e7e32');


--
-- Data for Name: booking_cancellations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: businesses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."businesses" ("id", "created_at", "user_id", "name", "description", "website", "phone", "email", "logo_url") VALUES
	('37c4ab22-fbe7-42e2-b465-5f46399d636b', '2025-08-11 06:55:52.302772+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'Cliffean ID Construction Service', 'Construction Services', '', '09454974761', NULL, '/businesses/37c4ab22-fbe7-42e2-b465-5f46399d636b/cliffean_id_construction_service.jpg'),
	('44d3d48c-2361-4acf-8a9e-bf884a4a9662', '2025-08-11 06:55:52.302772+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'CR3T1V3 TALENT AGENCY', 'Advertising & Marketing Services', '', '09352984822', NULL, '/businesses/44d3d48c-2361-4acf-8a9e-bf884a4a9662/creative_talent_agency.jpg'),
	('12a43822-1e3d-4718-8cf7-52d07221d44d', '2025-08-11 06:55:52.302772+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'CABS ITC', 'IT Services & Consulting', 'https://cabsitc.com/', '09175377637', NULL, '/businesses/12a43822-1e3d-4718-8cf7-52d07221d44d/cabs_itc.png'),
	('5a0631d5-ad47-4853-80ee-82266084b533', '2025-08-11 06:25:36.413085+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'BIMTECH STUDIO INC.', 'Architectural & Engineering Consultancy', '', '09265908616', NULL, '/businesses/5a0631d5-ad47-4853-80ee-82266084b533/bimtech_studio_inc.jpg'),
	('78834a47-1b69-4c75-8a9d-91a3198d4661', '2025-08-11 06:55:52.302772+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'CloudCents Corp.', 'Business Process Outsourcing', 'https://cloudcentsph.net/', '09176366501', NULL, '/businesses/78834a47-1b69-4c75-8a9d-91a3198d4661/cloudcents_corp.png'),
	('96f0ba79-4733-4e28-9e77-945c6a779931', '2025-08-11 06:25:36.413085+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '3G Construction Supplies Wholesaling', 'Construction Supplies / Wholesale Distribution', '', '09623933463', NULL, '/businesses/96f0ba79-4733-4e28-9e77-945c6a779931/3G_construction_supplies_wholesaling.jpg'),
	('1a723a51-0efb-44c7-b069-3afa5f2c857c', '2025-08-11 06:25:36.413085+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'ALPHA 88 LOGISTICS CORPORATION', 'Freight & Logistics Services', '', '09177920201', NULL, '/businesses/1a723a51-0efb-44c7-b069-3afa5f2c857c/alpha_88_logistics_corporation.jpg'),
	('a6ba5e2f-efd6-4c6e-8747-9a6452ac83e0', '2025-08-11 06:55:52.302772+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'Databasesight IT Solutions OPC', 'IT Services', '', '09542210780', NULL, '/businesses/a6ba5e2f-efd6-4c6e-8747-9a6452ac83e0/databasesight_it_solutions_opc.jpg'),
	('0d96d093-f9f8-4639-8945-767b1fc6483f', '2025-08-11 06:25:36.413085+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'Armo Mechpipe Construction', 'Construction Supplies / Wholesale Distribution', '', '09175755563', NULL, '/businesses/0d96d093-f9f8-4639-8945-767b1fc6483f/armo_mechpipe_construction.jpg'),
	('0313c744-2b89-4d06-a60e-82ee39fc8ad0', '2025-08-11 06:25:36.413085+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'AQUATIZ PHILIPPINES CORP.', 'Trading & Distribution Services', '', '09175593673', NULL, '/businesses/0313c744-2b89-4d06-a60e-82ee39fc8ad0/aquatiz_philippines_corp.jpg'),
	('366d3cdb-5854-4bc5-9316-4e9786f7c8b5', '2025-08-11 06:25:36.413085+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'Bellaventure Travel & Tours', 'Travel & Tour Services', 'https://bellaventure-travel-tours.my.canva.site/bellaventuretraveltours?fbclid=IwY2xjawL1dCJleHRuA2FlbQIxMABicmlkETBFUDNlQnJyUHhKNVZWRWR4AR7V-H3ki5hCkaCcIfvaJJoclrQLeBqT0QNlLuevwTiXZvB8iS-28rLJtZIdUw_aem_CHQfrZoI0SbaV-VRWQ4T6g', '09171043570', NULL, '/businesses/366d3cdb-5854-4bc5-9316-4e9786f7c8b5/bellaventure_travel_and_tours.jpg'),
	('a46030b5-f9cc-4613-88ec-5401e906b163', '2025-08-11 06:55:52.302772+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'CBM Builders Corporation', 'Construction Supplies ', '', '09188220512', NULL, '/businesses/a46030b5-f9cc-4613-88ec-5401e906b163/cbm_builders_corporation.jpg'),
	('b2fecb4e-50de-428b-aee1-068d22e008d0', '2025-08-11 06:55:52.302772+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'Curtainwall Advance System Technology Engineering Consultancy', 'Engineering Consultancy Services', '', '09175186643', NULL, '/businesses/b2fecb4e-50de-428b-aee1-068d22e008d0/curtainwall_advance_system_technology_engineering_consultancy.jpg'),
	('ef7b6eef-7d41-43d7-b4a3-b16416b66d5b', '2025-08-11 06:25:36.413085+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', 'ALPHA SOWA ENERGY CORP.', 'IT Services & Business Process Outsourcing', '', '09328640077', NULL, '/businesses/ef7b6eef-7d41-43d7-b4a3-b16416b66d5b/alpha_sowa_energy_corp.png'),
	('bc8c65f0-d2a1-454c-80c5-7e6daf0f6e0d', '2025-08-11 06:25:36.413085+00', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', 'Amity Virtual Team, Inc.', 'Virtual Assistant Services', 'https://amityvirtual.com.au/ ', '09173237312', NULL, '/businesses/bc8c65f0-d2a1-454c-80c5-7e6daf0f6e0d/amity_virtual_team_inc.jpg');


--
-- Data for Name: credits; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."credits" ("id", "created_at", "user_id", "expires_at", "status") VALUES
	('cb74ab3f-9d13-4882-b77a-96005bc69bca', '2025-08-10 07:32:03.66273+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-09-09 07:32:03.66273+00', 'used'),
	('bf9cf086-9738-4a86-a158-4873c8258b31', '2025-08-11 04:10:31.254499+00', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '2025-09-10 04:10:31.254499+00', 'used'),
	('7a455e85-797c-4b0f-bcc8-5ec7acfff07a', '2025-08-11 04:10:43.454437+00', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '2025-09-10 04:10:43.454437+00', 'used'),
	('6cc1de9d-3075-40f5-bd87-8a82c12697f7', '2025-08-11 08:49:45.686404+00', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', '2025-09-10 08:49:45.686404+00', 'used'),
	('06bc19f2-6475-49e2-97b8-2825f01aa5c4', '2025-08-11 09:55:08.825999+00', 'c5933812-a59e-4665-8f34-54db651b50ba', '2025-09-10 09:55:08.825999+00', 'active'),
	('d963583c-9690-4d57-a01d-3b727befeaef', '2025-08-11 09:55:17.53692+00', 'c5933812-a59e-4665-8f34-54db651b50ba', '2025-09-10 09:55:17.53692+00', 'active'),
	('24dee513-e4b3-478d-86be-2007eb68444b', '2025-08-11 09:55:24.471634+00', 'c5933812-a59e-4665-8f34-54db651b50ba', '2025-09-10 09:55:24.471634+00', 'active'),
	('b5bda656-aae0-4e97-b5eb-1fefd59541db', '2025-08-11 09:55:46.642231+00', 'c5933812-a59e-4665-8f34-54db651b50ba', '2025-09-10 09:55:46.642231+00', 'active'),
	('af9cbe81-230e-4723-9043-4b0d236aa9e9', '2025-08-11 09:55:56.22878+00', 'c5933812-a59e-4665-8f34-54db651b50ba', '2025-09-10 09:55:56.22878+00', 'active'),
	('9dcd55c6-d56c-436f-b4b9-c4d41a19aa12', '2025-08-11 10:29:24.503335+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-09-10 10:29:24.503335+00', 'used'),
	('ce4835ba-5f0a-4ef7-830f-647d7c7f9a23', '2025-08-11 10:29:47.531101+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-09-10 10:29:47.531101+00', 'used'),
	('6fb049ea-71a8-49e7-8c25-87da54399caa', '2025-08-11 10:29:59.159233+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-09-10 10:29:59.159233+00', 'used'),
	('bc3772bc-58a1-4c5b-a700-12fd364e1ca5', '2025-08-11 10:30:08.85273+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-09-10 10:30:08.85273+00', 'used'),
	('da15a43d-1021-4591-b3ed-23ebca1cfd14', '2025-08-11 10:30:16.815034+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '2025-09-10 10:30:16.815034+00', 'used');


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

INSERT INTO "public"."referrals" ("created_at", "metadata", "id", "referred_by") VALUES
	('2025-08-11 10:29:24.503335+00', NULL, '69a6a04e-0984-4a30-93ea-b7c81c7832fb', '409fa2fc-4a5d-4761-88c8-20daf65d4b71'),
	('2025-08-11 10:29:47.531101+00', NULL, '0ff42e53-fe0d-4747-a508-1dbf71864d74', '409fa2fc-4a5d-4761-88c8-20daf65d4b71'),
	('2025-08-11 10:29:59.159233+00', NULL, '4187696a-04b3-4281-992d-5994b4d545c0', '409fa2fc-4a5d-4761-88c8-20daf65d4b71'),
	('2025-08-11 10:30:08.85273+00', NULL, '37c36286-b364-4cd6-bfbe-cbbe10304dae', '409fa2fc-4a5d-4761-88c8-20daf65d4b71'),
	('2025-08-11 10:30:16.815034+00', NULL, '48f650bd-e35c-4e3e-afb4-24c10837acc9', '409fa2fc-4a5d-4761-88c8-20daf65d4b71');


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."rewards" ("id", "created_at", "name", "description", "price", "image_path", "organization_id") VALUES
	('987551ae-7a5f-47b4-9511-ce509fd866ac', '2025-08-11 00:54:38.950936+00', 'Incub8 Space T-Shirt', 'Enjoy our very own T Shirt!', 1, '/rewards/383e244f-fe3c-4a59-8a1b-2b66121a5e03/4c04626a-6921-4356-a1bc-1ba4f2dc247c/987551ae-7a5f-47b4-9511-ce509fd866ac/shirt.png', '383e244f-fe3c-4a59-8a1b-2b66121a5e03'),
	('d9ce815b-838b-4ec8-be86-fcbb32251f42', '2025-08-11 00:53:30.333905+00', 'Incub8 Space Mug', 'Enjoy your coffee with our custom made Mug', 1, '/rewards/383e244f-fe3c-4a59-8a1b-2b66121a5e03/4c04626a-6921-4356-a1bc-1ba4f2dc247c/d9ce815b-838b-4ec8-be86-fcbb32251f42/mug.png', '383e244f-fe3c-4a59-8a1b-2b66121a5e03');


--
-- Data for Name: reward_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: space_availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."space_availability" ("id", "created_at", "date", "opening_time", "closing_time", "space_id") VALUES
	('36c4c636-7ed7-4b3a-a402-f3fb0c4cac63', '2025-08-11 04:11:59.357186+00', '2025-08-20', '08:00:00+08', '20:00:00+08', '687cba2a-f95c-4620-b257-4dced7a520f0'),
	('6913c3f8-f0e6-461b-87de-e4419038fbd7', '2025-08-11 10:33:20.590069+00', '2025-08-11', '08:00:00+08', '20:00:00+08', '687cba2a-f95c-4620-b257-4dced7a520f0'),
	('cff83927-5398-4d88-af46-6020b8776daa', '2025-08-11 10:33:45.524933+00', '2025-08-11', '08:00:00+08', '20:00:00+08', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('f1d95bba-5ba3-4e7e-9782-6737be800a74', '2025-08-11 10:34:12.672386+00', '2025-08-12', '08:00:00+08', '20:00:00+08', '687cba2a-f95c-4620-b257-4dced7a520f0'),
	('6b10e31b-3490-40e0-9735-ec6e8d76f5dd', '2025-08-11 10:34:29.040734+00', '2025-08-12', '08:00:00+08', '20:00:00+08', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('2e2fefc8-e55c-46d5-966d-d7d29a15439c', '2025-08-11 10:34:46.33568+00', '2025-08-13', '08:00:00+08', '08:00:00+08', '687cba2a-f95c-4620-b257-4dced7a520f0'),
	('12f7205e-a89a-4d97-9421-4e2b5ca09820', '2025-08-11 10:35:08.322607+00', '2025-08-13', '08:00:00+08', '20:00:00+08', '9998fd80-fb2a-452f-9289-af7369c64001'),
	('46426777-9b01-4a5d-b309-09badfe42ab7', '2025-08-10 07:33:32+00', '2025-08-20', '08:00:00+08', '20:00:00+08', '9998fd80-fb2a-452f-9289-af7369c64001');


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."subscriptions" ("id", "created_at", "subscriptions_type", "organization_id") VALUES
	('5d50ff80-85fa-44b6-ae60-bde393769099', '2025-08-11 00:49:01.996826+00', 'business_address_only', '383e244f-fe3c-4a59-8a1b-2b66121a5e03'),
	('95a7f5ce-6ef3-40b9-827a-89e2915ed3ad', '2025-08-11 00:49:11.051845+00', 'virtual_office_for_solo', '383e244f-fe3c-4a59-8a1b-2b66121a5e03'),
	('9b2bef3f-02a7-443f-bcc6-920ceef886d0', '2025-08-11 00:49:19.122058+00', 'virtual_office_for_team', '383e244f-fe3c-4a59-8a1b-2b66121a5e03');


--
-- Data for Name: user_organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_organizations" ("id", "created_at", "user_id", "organization_id") VALUES
	('71146abe-3679-46b4-8d46-88b396fe8ea8', '2025-08-10 06:44:53.373134+00', '409fa2fc-4a5d-4761-88c8-20daf65d4b71', '383e244f-fe3c-4a59-8a1b-2b66121a5e03'),
	('fc50b483-1858-4d8d-88b8-08557cc6fbaf', '2025-08-11 03:42:14.566354+00', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '383e244f-fe3c-4a59-8a1b-2b66121a5e03'),
	('7b21734d-5740-4e1f-9975-993e8d6b1584', '2025-08-11 03:46:48.190908+00', '3d5b0956-a876-436c-a744-1eeaa0cbd1c5', '383e244f-fe3c-4a59-8a1b-2b66121a5e03'),
	('b8ce9986-e7bb-4f2d-9ce3-e3dd9e883828', '2025-08-11 09:54:55.372973+00', 'c5933812-a59e-4665-8f34-54db651b50ba', '383e244f-fe3c-4a59-8a1b-2b66121a5e03');


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_subscriptions" ("id", "subscription_id", "organization_id", "started_at", "expires_at") VALUES
	('66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '95a7f5ce-6ef3-40b9-827a-89e2915ed3ad', '383e244f-fe3c-4a59-8a1b-2b66121a5e03', '2025-08-11 10:53:56+00', '2030-08-11 10:53:58+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('avatars', 'avatars', NULL, '2025-08-10 06:01:42.576945+00', '2025-08-10 06:01:42.576945+00', true, false, NULL, NULL, NULL),
	('rewards', 'rewards', NULL, '2025-08-11 00:56:55.352314+00', '2025-08-11 00:56:55.352314+00', true, false, NULL, NULL, NULL),
	('products', 'products', NULL, '2025-08-11 01:11:56.04885+00', '2025-08-11 01:11:56.04885+00', true, false, NULL, NULL, NULL),
	('branches', 'branches', NULL, '2025-08-11 03:57:31.630723+00', '2025-08-11 03:57:31.630723+00', true, false, NULL, NULL, NULL),
	('businesses', 'businesses', NULL, '2025-08-11 06:32:09.575309+00', '2025-08-11 06:32:09.575309+00', true, false, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('2229cc59-1942-4be8-8c86-6a2a66235832', 'businesses', '96f0ba79-4733-4e28-9e77-945c6a779931/3G_construction_supplies_wholesaling.jpg', NULL, '2025-08-11 08:35:02.159197+00', '2025-08-11 08:35:02.159197+00', '2025-08-11 08:35:02.159197+00', '{"eTag": "\"099f6f0537fdf34c3fe8c1e9fb671b52-1\"", "size": 15057, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:35:01.000Z", "contentLength": 15057, "httpStatusCode": 200}', 'b7ac3744-2b9c-4a45-b60b-b61b212c69dd', NULL, NULL),
	('faa32745-c81b-44e5-b0de-5bdb49ecb437', 'avatars', '409fa2fc-4a5d-4761-88c8-20daf65d4b71/.emptyFolderPlaceholder', NULL, '2025-08-10 07:56:30.777578+00', '2025-08-10 07:56:30.777578+00', '2025-08-10 07:56:30.777578+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-10T07:56:30.000Z", "contentLength": 0, "httpStatusCode": 200}', 'acd05cd7-7ed0-4aef-bd12-950af387a2c6', NULL, '{}'),
	('c8a494f7-87fa-4da9-82ca-a123ef0b50b3', 'avatars', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c/avatar', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '2025-08-11 04:06:12.897069+00', '2025-08-11 04:06:12.897069+00', '2025-08-11 04:06:12.897069+00', '{"eTag": "\"7ab92f616f0293c565834fc7dcfa8ca9\"", "size": 628617, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T04:06:12.000Z", "contentLength": 628617, "httpStatusCode": 200}', '32fb8b68-d847-4466-a815-175a5b64dcf4', '66f6964e-be2a-4e17-ae6d-ead36e8aab2c', '{}'),
	('500161d0-69d6-4ff6-b526-159c8bdaaca5', 'rewards', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/4c04626a-6921-4356-a1bc-1ba4f2dc247c/987551ae-7a5f-47b4-9511-ce509fd866ac/shirt.png', NULL, '2025-08-11 02:17:38.674408+00', '2025-08-11 02:17:38.674408+00', '2025-08-11 02:17:38.674408+00', '{"eTag": "\"6449a1602ab30b12a525a43e58ef9ab9-1\"", "size": 1247184, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:17:38.000Z", "contentLength": 1247184, "httpStatusCode": 200}', '3c1c9eef-36f8-4b19-836d-753b9e3b0890', NULL, NULL),
	('6c8ad464-63a6-4298-9fe1-b9dd139e5895', 'businesses', 'bc8c65f0-d2a1-454c-80c5-7e6daf0f6e0d/amity_virtual_team_inc.jpg', NULL, '2025-08-11 06:47:40.758422+00', '2025-08-11 06:47:40.758422+00', '2025-08-11 06:47:40.758422+00', '{"eTag": "\"552e5e777737959a4fd4bae4dea0fc74-1\"", "size": 5247, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:47:40.000Z", "contentLength": 5247, "httpStatusCode": 200}', '86772d7f-1c20-4952-a15a-bf6d14381387', NULL, NULL),
	('4afe8d1a-4075-45c1-b0dc-4b60b3a1f0d1', 'rewards', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/.emptyFolderPlaceholder', NULL, '2025-08-11 02:22:49.958347+00', '2025-08-11 02:22:49.958347+00', '2025-08-11 02:22:49.958347+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:22:48.000Z", "contentLength": 0, "httpStatusCode": 200}', '5af21918-81f4-4408-8c3a-87e18f8cf46e', NULL, '{}'),
	('06b434b5-b407-4234-a182-7f330ac4685a', 'businesses', '1a723a51-0efb-44c7-b069-3afa5f2c857c/alpha_88_logistics_corporation.jpg', NULL, '2025-08-11 08:36:22.255327+00', '2025-08-11 08:36:22.255327+00', '2025-08-11 08:36:22.255327+00', '{"eTag": "\"10fe9077c795f98ec4bd293887d0643a-1\"", "size": 13933, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:36:22.000Z", "contentLength": 13933, "httpStatusCode": 200}', 'a5f6fec1-39f1-4d22-b848-e7b28f1e6711', NULL, NULL),
	('06eb1b00-d4b4-4f53-9639-7879df0a5dd1', 'businesses', 'a46030b5-f9cc-4613-88ec-5401e906b163/cbm_builders_corporation.jpg', NULL, '2025-08-11 08:37:46.819794+00', '2025-08-11 08:37:46.819794+00', '2025-08-11 08:37:46.819794+00', '{"eTag": "\"33a8bca5556731e366f585fef7ffe628-1\"", "size": 30228, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:37:46.000Z", "contentLength": 30228, "httpStatusCode": 200}', '78354d2e-1e2b-4a0d-ac28-049589a5281e', NULL, NULL),
	('9c05512e-8d78-4865-a69f-a1b63afbcaa5', 'businesses', '44d3d48c-2361-4acf-8a9e-bf884a4a9662/creative_talent_agency.jpg', NULL, '2025-08-11 08:38:40.539035+00', '2025-08-11 08:38:40.539035+00', '2025-08-11 08:38:40.539035+00', '{"eTag": "\"15cf342a8e3aad90f1fc801136ae0d39-1\"", "size": 46395, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:38:40.000Z", "contentLength": 46395, "httpStatusCode": 200}', 'a9fc5360-2e75-422a-9e8e-e08584cf411c', NULL, NULL),
	('6903c594-425c-4075-a1eb-3b710654adb1', 'businesses', 'b2fecb4e-50de-428b-aee1-068d22e008d0/curtainwall_advance_system_technology_engineering_consultancy.jpg', NULL, '2025-08-11 08:39:33.093781+00', '2025-08-11 08:39:33.093781+00', '2025-08-11 08:39:33.093781+00', '{"eTag": "\"bbccdccbd2d83d4a1d230b4b23d30645-1\"", "size": 5841, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:39:32.000Z", "contentLength": 5841, "httpStatusCode": 200}', '214647f6-5e9a-48d7-a297-336e1cd4296f', NULL, NULL),
	('d42a2fdf-d5fd-490b-abc3-a7bc668a614b', 'businesses', '0313c744-2b89-4d06-a60e-82ee39fc8ad0/aquatiz_philippines_corp.jpg', NULL, '2025-08-11 08:34:11.795185+00', '2025-08-11 08:34:11.795185+00', '2025-08-11 08:34:11.795185+00', '{"eTag": "\"05db85ca89174c0c1b994f3555f0f904-1\"", "size": 80514, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:34:11.000Z", "contentLength": 80514, "httpStatusCode": 200}', '62e88559-e542-4198-83be-d46a78e2ca77', NULL, NULL),
	('1fc2d23b-d86b-4e3d-978e-fb12c92aec33', 'rewards', '.emptyFolderPlaceholder', NULL, '2025-08-11 02:09:02.136911+00', '2025-08-11 02:09:02.136911+00', '2025-08-11 02:09:02.136911+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:09:01.000Z", "contentLength": 0, "httpStatusCode": 200}', '2e736a44-53cf-4b75-b089-a32d55336c92', NULL, '{}'),
	('55eb8695-9d46-4c03-91d6-22c199b5541c', 'rewards', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/4c04626a-6921-4356-a1bc-1ba4f2dc247c/d9ce815b-838b-4ec8-be86-fcbb32251f42/mug.png', NULL, '2025-08-11 02:23:29.583146+00', '2025-08-11 02:23:29.583146+00', '2025-08-11 02:23:29.583146+00', '{"eTag": "\"b4223fe498aee2830a072b1d38105a02-1\"", "size": 1266058, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:23:29.000Z", "contentLength": 1266058, "httpStatusCode": 200}', 'eb1b5f90-07c6-4ba8-b679-7d5efa2293bb', NULL, NULL),
	('13ea83e5-4c47-410e-bd69-4528a289fe42', 'products', '.emptyFolderPlaceholder', NULL, '2025-08-11 02:24:32.411994+00', '2025-08-11 02:24:32.411994+00', '2025-08-11 02:24:32.411994+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:24:31.000Z", "contentLength": 0, "httpStatusCode": 200}', '19befb53-b352-4f6a-8985-88e723b35101', NULL, '{}'),
	('504296de-0c13-449c-bca6-2fe90d1d38d9', 'businesses', 'ef7b6eef-7d41-43d7-b4a3-b16416b66d5b/alpha_sowa_energy_corp.png', NULL, '2025-08-11 08:36:50.437604+00', '2025-08-11 08:36:50.437604+00', '2025-08-11 08:36:50.437604+00', '{"eTag": "\"74a7898c1cb5cb4eb7892bf620fcafbf-1\"", "size": 13915, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:36:50.000Z", "contentLength": 13915, "httpStatusCode": 200}', 'c20c02c3-9f98-43d0-bd23-71c867422559', NULL, NULL),
	('ae8c3138-3f62-4b21-a503-5627a4f4d427', 'businesses', '78834a47-1b69-4c75-8a9d-91a3198d4661/cloudcents_corp.png', NULL, '2025-08-11 07:01:26.700997+00', '2025-08-11 07:01:26.700997+00', '2025-08-11 07:01:26.700997+00', '{"eTag": "\"cba698824c9c6e21c54848f5061a3914-1\"", "size": 17731, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T07:01:26.000Z", "contentLength": 17731, "httpStatusCode": 200}', '736321f5-217e-4e81-86e8-646e5136e6f9', NULL, NULL),
	('230546d9-01b0-4402-ace9-675b774aa598', 'businesses', '0d96d093-f9f8-4639-8945-767b1fc6483f/armo_mechpipe_construction.jpg', NULL, '2025-08-11 06:49:24.076734+00', '2025-08-11 06:49:24.076734+00', '2025-08-11 06:49:24.076734+00', '{"eTag": "\"ab026f967b31a0e72dd02d02af57243e-1\"", "size": 8399, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:49:23.000Z", "contentLength": 8399, "httpStatusCode": 200}', '65405a83-152b-477c-bb66-da9a325b92a4', NULL, NULL),
	('41382b92-0c03-4e41-a54e-04e0b119e105', 'businesses', '5a0631d5-ad47-4853-80ee-82266084b533/bimtech_studio_inc.jpg', NULL, '2025-08-11 06:50:10.766098+00', '2025-08-11 06:50:10.766098+00', '2025-08-11 06:50:10.766098+00', '{"eTag": "\"c18f10376f16ea262cbeb6b80a7016dc-1\"", "size": 5900, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:50:10.000Z", "contentLength": 5900, "httpStatusCode": 200}', '7267ea08-4fe4-410d-a371-a8a326eb80fe', NULL, NULL),
	('47c4bbdc-857b-416d-8780-2825e9c65be1', 'products', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/687cba2a-f95c-4620-b257-4dced7a520f0/e2d8e588-853c-4b10-802d-7f3fb0a5f587/meeting-room.webp', NULL, '2025-08-11 02:26:57.962931+00', '2025-08-11 02:26:57.962931+00', '2025-08-11 02:26:57.962931+00', '{"eTag": "\"c0fc6c6147efe44cdb402c11199bc5f7-1\"", "size": 117332, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:26:57.000Z", "contentLength": 117332, "httpStatusCode": 200}', '833c69cf-152f-4a89-b9f1-037754464613', NULL, NULL),
	('317b2ad2-a028-4c0b-82a8-e4bbd960912a', 'businesses', '12a43822-1e3d-4718-8cf7-52d07221d44d/cabs_itc.png', NULL, '2025-08-11 07:00:37.75621+00', '2025-08-11 07:00:37.75621+00', '2025-08-11 07:00:37.75621+00', '{"eTag": "\"2cda0936e192d346b902e65f08df5fba-1\"", "size": 1141, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T07:00:37.000Z", "contentLength": 1141, "httpStatusCode": 200}', '732ae854-e76c-4668-b857-528665ded837', NULL, NULL),
	('69956745-da4b-4a4c-a13a-35a7735e398d', 'products', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/687cba2a-f95c-4620-b257-4dced7a520f0/d2d6719b-eb00-4f38-a2d2-19be43b5392f/coworking.webp', NULL, '2025-08-11 02:29:53.174539+00', '2025-08-11 02:30:01.402348+00', '2025-08-11 02:29:53.174539+00', '{"eTag": "\"8f119fcb73a4a9b7f572701bdde36852\"", "size": 171420, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T02:30:01.000Z", "contentLength": 171420, "httpStatusCode": 200}', '8634fe55-74a6-4c21-b2a3-02608834872f', NULL, NULL),
	('82a40183-3339-4432-b8ec-3a78a011a647', 'branches', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/amenity_image_1.webp', NULL, '2025-08-11 03:58:36.990636+00', '2025-08-11 03:58:36.990636+00', '2025-08-11 03:58:36.990636+00', '{"eTag": "\"52c60be3855286be563973a29f186427-1\"", "size": 16824, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T03:58:36.000Z", "contentLength": 16824, "httpStatusCode": 200}', '6c15a849-19f6-4c4c-83bb-786044f81444', NULL, NULL),
	('eea7615b-809c-426a-b357-4e0927f2e696', 'branches', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/amenity_image_6.webp', NULL, '2025-08-11 03:58:39.882679+00', '2025-08-11 03:58:39.882679+00', '2025-08-11 03:58:39.882679+00', '{"eTag": "\"7c6506784619cd5f4e60c880684ff2a7-1\"", "size": 82504, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T03:58:39.000Z", "contentLength": 82504, "httpStatusCode": 200}', '4536be91-655b-456b-bb80-4e7ac24d3f5f', NULL, NULL),
	('c3906fa9-f011-4f2c-a67c-6a4edbeb1840', 'branches', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/amenity_image_5.webp', NULL, '2025-08-11 03:58:40.284758+00', '2025-08-11 03:58:40.284758+00', '2025-08-11 03:58:40.284758+00', '{"eTag": "\"202de131df22b2e4d256c2321ed9adea-1\"", "size": 112162, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T03:58:40.000Z", "contentLength": 112162, "httpStatusCode": 200}', 'c7c7b44d-9259-4c7d-ab58-3a618a1d8424', NULL, NULL),
	('c3780aa0-d585-4568-b37e-511d63aa9fe7', 'branches', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/4c04626a-6921-4356-a1bc-1ba4f2dc247c/kawit-branch.webp', NULL, '2025-08-11 03:58:40.960655+00', '2025-08-11 03:58:40.960655+00', '2025-08-11 03:58:40.960655+00', '{"eTag": "\"5ad7cde6fc10a0d9fb0e68624cb419d0-1\"", "size": 171420, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T03:58:40.000Z", "contentLength": 171420, "httpStatusCode": 200}', '939069c8-9c71-4dd1-b187-633f2b9b6674', NULL, NULL),
	('842ae19a-eaaa-4132-a2a9-4809f892d3c4', 'branches', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/amenity_image-2.webp', NULL, '2025-08-11 03:58:43.617738+00', '2025-08-11 03:58:43.617738+00', '2025-08-11 03:58:43.617738+00', '{"eTag": "\"e9d27db428580cfa4fe352ad5b3ea364-1\"", "size": 382742, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T03:58:43.000Z", "contentLength": 382742, "httpStatusCode": 200}', 'f8b45878-e531-4a00-8578-01b1a4389efa', NULL, NULL),
	('56037e81-92c3-462a-bb5b-53d9de92f846', 'businesses', '699d5167-8e64-4dc2-ac57-d30f889ac62a/.emptyFolderPlaceholder', NULL, '2025-08-11 06:45:17.828722+00', '2025-08-11 06:45:17.828722+00', '2025-08-11 06:45:17.828722+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:45:16.000Z", "contentLength": 0, "httpStatusCode": 200}', 'ed1d0875-7686-4b8c-941a-1cb6cdd0cf38', NULL, '{}'),
	('919ee76f-74cd-4b65-881d-96f63e4409e0', 'businesses', '366d3cdb-5854-4bc5-9316-4e9786f7c8b5/bellaventure_travel_and_tours.jpg', NULL, '2025-08-11 06:49:38.719036+00', '2025-08-11 06:49:38.719036+00', '2025-08-11 06:49:38.719036+00', '{"eTag": "\"1c403ac920e03c661201dcae1d8a3265-1\"", "size": 6680, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:49:38.000Z", "contentLength": 6680, "httpStatusCode": 200}', 'deb6a63d-3368-4b96-98d6-45584ae2f4de', NULL, NULL),
	('f7d517f2-f87a-40b5-a5d6-a290b305279c', 'businesses', '37c4ab22-fbe7-42e2-b465-5f46399d636b/cliffean_id_construction_service.jpg', NULL, '2025-08-11 07:01:06.149892+00', '2025-08-11 07:01:06.149892+00', '2025-08-11 07:01:06.149892+00', '{"eTag": "\"44e3d058a2fb1be144d3503000d09e20-1\"", "size": 8628, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T07:01:06.000Z", "contentLength": 8628, "httpStatusCode": 200}', '9ecff2a6-4bcf-4bd3-acee-ca01431c0a2c', NULL, NULL),
	('15245841-5a82-428b-8d5d-abf44001680f', 'branches', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/amenity_image_4.webp', NULL, '2025-08-11 03:58:39.83981+00', '2025-08-11 03:58:39.83981+00', '2025-08-11 03:58:39.83981+00', '{"eTag": "\"98c6eafc48ce2809fbf932da32601806-1\"", "size": 77868, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T03:58:39.000Z", "contentLength": 77868, "httpStatusCode": 200}', '3379e7a1-f772-434b-a9a0-86bdb0336eb7', NULL, NULL),
	('c6a42a8c-f690-49a9-9545-6aca8dd28574', 'businesses', 'ddb1ded6-4b6b-454d-9641-6412816d6ad3/.emptyFolderPlaceholder', NULL, '2025-08-11 06:45:30.860598+00', '2025-08-11 06:45:30.860598+00', '2025-08-11 06:45:30.860598+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:45:29.000Z", "contentLength": 0, "httpStatusCode": 200}', '4d9ed00a-9af0-42b3-9c9d-206de71557d8', NULL, '{}'),
	('0e875795-1086-4d9c-92f6-9800b0168a95', 'branches', '383e244f-fe3c-4a59-8a1b-2b66121a5e03/c15584d6-48e4-4272-bbd5-7de2d8f1d910/amenity_image_3.webp', NULL, '2025-08-11 03:58:43.640113+00', '2025-08-11 03:58:43.640113+00', '2025-08-11 03:58:43.640113+00', '{"eTag": "\"fd2c61206dd6d7c57175395e8997c18a-1\"", "size": 413722, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T03:58:43.000Z", "contentLength": 413722, "httpStatusCode": 200}', '985e7038-13cb-40a7-87c3-3269c9ecd9af', NULL, NULL),
	('3656e1e0-fedd-48de-8cdc-4156b169208b', 'businesses', 'a6ba5e2f-efd6-4c6e-8747-9a6452ac83e0/databasesight_it_solutions_opc.jpg', NULL, '2025-08-11 08:40:07.188672+00', '2025-08-11 08:40:07.188672+00', '2025-08-11 08:40:07.188672+00', '{"eTag": "\"329d76c441d06bb2d7f91189cb0ad384-1\"", "size": 5415, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T08:40:06.000Z", "contentLength": 5415, "httpStatusCode": 200}', 'c657e9cd-b0f8-47cf-87fc-0fa1ad2f9b91', NULL, NULL),
	('02eeef24-9d4a-4d0c-adc7-d21d8eeaec69', 'businesses', '7c4c6337-158f-447e-bda5-b60f9bfb4b06/.emptyFolderPlaceholder', NULL, '2025-08-11 06:56:51.759396+00', '2025-08-11 06:56:51.759396+00', '2025-08-11 06:56:51.759396+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:56:50.000Z", "contentLength": 0, "httpStatusCode": 200}', 'f3c07e45-e039-4dbd-8693-a098a3632ec7', NULL, '{}'),
	('c28400ac-acca-4090-a17d-41d5c6ede404', 'businesses', '42aa5ed5-1d26-43f8-a316-4b41500393d5/.emptyFolderPlaceholder', NULL, '2025-08-11 06:57:56.817624+00', '2025-08-11 06:57:56.817624+00', '2025-08-11 06:57:56.817624+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:57:55.000Z", "contentLength": 0, "httpStatusCode": 200}', '40c165bf-f428-42ea-9255-42f870bfc1c1', NULL, '{}'),
	('e17cbafa-36a0-4a46-b821-794ebaaa1a78', 'businesses', 'd0025dbc-0423-4969-9647-451b2b33f246/.emptyFolderPlaceholder', NULL, '2025-08-11 06:58:17.655934+00', '2025-08-11 06:58:17.655934+00', '2025-08-11 06:58:17.655934+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2025-08-11T06:58:16.000Z", "contentLength": 0, "httpStatusCode": 200}', '6e0551a0-2656-40f8-bf0e-99ed31747080', NULL, '{}');


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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 51, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
