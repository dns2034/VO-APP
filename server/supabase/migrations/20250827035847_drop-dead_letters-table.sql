drop policy "Managers can view dead letters" on "public"."dead_letters";

revoke delete on table "public"."dead_letters" from "anon";

revoke insert on table "public"."dead_letters" from "anon";

revoke references on table "public"."dead_letters" from "anon";

revoke select on table "public"."dead_letters" from "anon";

revoke trigger on table "public"."dead_letters" from "anon";

revoke truncate on table "public"."dead_letters" from "anon";

revoke update on table "public"."dead_letters" from "anon";

revoke delete on table "public"."dead_letters" from "authenticated";

revoke insert on table "public"."dead_letters" from "authenticated";

revoke references on table "public"."dead_letters" from "authenticated";

revoke select on table "public"."dead_letters" from "authenticated";

revoke trigger on table "public"."dead_letters" from "authenticated";

revoke truncate on table "public"."dead_letters" from "authenticated";

revoke update on table "public"."dead_letters" from "authenticated";

revoke delete on table "public"."dead_letters" from "service_role";

revoke insert on table "public"."dead_letters" from "service_role";

revoke references on table "public"."dead_letters" from "service_role";

revoke select on table "public"."dead_letters" from "service_role";

revoke trigger on table "public"."dead_letters" from "service_role";

revoke truncate on table "public"."dead_letters" from "service_role";

revoke update on table "public"."dead_letters" from "service_role";

drop table "public"."dead_letters";


