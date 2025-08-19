drop function if exists "public"."add_meeting_room_availability"(space_id uuid, start_date date, end_date date, opening_time time with time zone, closing_time time with time zone, remarks text);

drop function if exists "public"."add_space_manager"(p_branch_id uuid, p_name text, p_descriptions text, p_capacity smallint, p_is_available boolean);

drop function if exists "public"."add_space_unit_manager"(p_space_id uuid, p_name text, p_status space_units_status, p_remark text);

drop function if exists "public"."calculate_availability_slots"(space_id uuid, start_date date, end_date date);

drop function if exists "public"."create_branch_manager"(p_name text, p_organization_id uuid, p_image_path text, p_location text, p_pin_location jsonb);

drop function if exists "public"."delete_branch_manager"(p_branch_id uuid);

drop function if exists "public"."delete_space_manager"(p_space_id uuid);

drop function if exists "public"."delete_space_unit_manager"(p_space_unit_id uuid);

drop function if exists "public"."is_manager"(p_user_id uuid);

drop function if exists "public"."remove_availability"(p_availability_id uuid);

drop function if exists "public"."update_branch_manager"(p_branch_id uuid, p_name text, p_image_path text, p_location text, p_pin_location jsonb);

drop function if exists "public"."update_space_availability"(availability_id uuid, new_date date, new_opening_time time with time zone, new_closing_time time with time zone, new_remarks text);

drop function if exists "public"."update_space_manager"(p_space_id uuid, p_name text, p_description text, p_capacity integer, p_is_available boolean);

drop function if exists "public"."update_space_unit_manager"(p_space_unit_id uuid, p_name text, p_status space_units_status, p_remark text);

alter table "public"."space_availability" drop column "remarks";

alter table "public"."spaces" drop column "capacity";


