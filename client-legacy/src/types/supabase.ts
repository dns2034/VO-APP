export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      account_deletion_requests: {
        Row: {
          id: string
          processed_at: string | null
          processed_by: string | null
          reason: string | null
          requested_at: string
          status: string
          user_id: string
        }
        Insert: {
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_at?: string
          status?: string
          user_id: string
        }
        Update: {
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_at?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      availability: {
        Row: {
          created_at: string
          date: string
          end_time: string
          id: string
          is_available: boolean
          resource_id: string
          start_time: string
        }
        Insert: {
          created_at?: string
          date: string
          end_time: string
          id?: string
          is_available: boolean
          resource_id?: string
          start_time: string
        }
        Update: {
          created_at?: string
          date?: string
          end_time?: string
          id?: string
          is_available?: boolean
          resource_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          checked_in_at: string | null
          checked_out_at: string | null
          created_at: string | null
          date: string
          end_time: string
          id: string
          remarks: string | null
          resource_id: string
          resource_instance_id: string | null
          start_time: string
          status: Database["public"]["Enums"]["booking_status_types"] | null
          user_id: string | null
        }
        Insert: {
          checked_in_at?: string | null
          checked_out_at?: string | null
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          remarks?: string | null
          resource_id: string
          resource_instance_id?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["booking_status_types"] | null
          user_id?: string | null
        }
        Update: {
          checked_in_at?: string | null
          checked_out_at?: string | null
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          remarks?: string | null
          resource_id?: string
          resource_instance_id?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status_types"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_resource_instance_id_fkey"
            columns: ["resource_instance_id"]
            isOneToOne: false
            referencedRelation: "resource_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings_cancellations: {
        Row: {
          booking_id: string
          cancelled_at: string
          id: string
          reason: Database["public"]["Enums"]["booking_cancellation_types"]
          remarks: string | null
        }
        Insert: {
          booking_id: string
          cancelled_at?: string
          id?: string
          reason?: Database["public"]["Enums"]["booking_cancellation_types"]
          remarks?: string | null
        }
        Update: {
          booking_id?: string
          cancelled_at?: string
          id?: string
          reason?: Database["public"]["Enums"]["booking_cancellation_types"]
          remarks?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancellations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_cancellations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "client_booking_history"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          business_type: string
          client_id: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          business_type: string
          client_id: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          business_type?: string
          client_id?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      credits: {
        Row: {
          consumed_at: string | null
          created_at: string | null
          expires_at: string
          id: string
          is_expired: boolean | null
          status:
            | Database["public"]["Enums"]["credit_and_point_status_types"]
            | null
          user_id: string
        }
        Insert: {
          consumed_at?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          is_expired?: boolean | null
          status?:
            | Database["public"]["Enums"]["credit_and_point_status_types"]
            | null
          user_id: string
        }
        Update: {
          consumed_at?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          is_expired?: boolean | null
          status?:
            | Database["public"]["Enums"]["credit_and_point_status_types"]
            | null
          user_id?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          organization_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          organization_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization_profiles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "locations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          context_id: string | null
          context_type: Database["public"]["Enums"]["notification_types"] | null
          created_at: string
          data: Json | null
          id: number
          is_read: boolean | null
          message: string | null
          receiver_id: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context_id?: string | null
          context_type?:
            | Database["public"]["Enums"]["notification_types"]
            | null
          created_at?: string
          data?: Json | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          receiver_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context_id?: string | null
          context_type?:
            | Database["public"]["Enums"]["notification_types"]
            | null
          created_at?: string
          data?: Json | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          receiver_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          location_id: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      points: {
        Row: {
          consumed_at: string | null
          created_at: string | null
          expires_at: string
          id: string
          is_expired: boolean | null
          status: Database["public"]["Enums"]["credit_and_point_status_types"]
          user_id: string
        }
        Insert: {
          consumed_at?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          is_expired?: boolean | null
          status?: Database["public"]["Enums"]["credit_and_point_status_types"]
          user_id: string
        }
        Update: {
          consumed_at?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          is_expired?: boolean | null
          status?: Database["public"]["Enums"]["credit_and_point_status_types"]
          user_id?: string
        }
        Relationships: []
      }
      redemptions: {
        Row: {
          expires_at: string
          id: string
          redeemed_at: string | null
          reward_id: string
          status: Database["public"]["Enums"]["redemption_status_types"]
          user_id: string
          voucher_code: string
        }
        Insert: {
          expires_at: string
          id?: string
          redeemed_at?: string | null
          reward_id: string
          status?: Database["public"]["Enums"]["redemption_status_types"]
          user_id: string
          voucher_code: string
        }
        Update: {
          expires_at?: string
          id?: string
          redeemed_at?: string | null
          reward_id?: string
          status?: Database["public"]["Enums"]["redemption_status_types"]
          user_id?: string
          voucher_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "reward_redemption_history"
            referencedColumns: ["reward_id"]
          },
          {
            foreignKeyName: "redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone_number: string
          referral_code: string | null
          status: Database["public"]["Enums"]["referral_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone_number: string
          referral_code?: string | null
          status?: Database["public"]["Enums"]["referral_status"]
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone_number?: string
          referral_code?: string | null
          status?: Database["public"]["Enums"]["referral_status"]
          user_id?: string
        }
        Relationships: []
      }
      resource_instances: {
        Row: {
          created_at: string | null
          id: string
          name: string
          resource_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          resource_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_resource"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_organization: {
        Row: {
          created_at: string
          id: string
          is_available: boolean | null
          organization_id: string
          resource_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_available?: boolean | null
          organization_id: string
          resource_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_available?: boolean | null
          organization_id?: string
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_organization_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization_profiles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "resource_organization_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_organization_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          created_at: string
          id: string
          isAvailable: boolean
          location_id: string | null
          name: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          isAvailable?: boolean
          location_id?: string | null
          name?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          isAvailable?: boolean
          location_id?: string | null
          name?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "client_booking_history"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          reward_points: number
          type: Database["public"]["Enums"]["reward_types"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          reward_points?: number
          type: Database["public"]["Enums"]["reward_types"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          reward_points?: number
          type?: Database["public"]["Enums"]["reward_types"]
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          credits: number
          email: string
          first_name: string
          id: string
          is_active: boolean
          last_name: string
          organization_id: string | null
          points: number
          profile_pic: string | null
          referral_code: string | null
          role_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits?: number
          email: string
          first_name: string
          id?: string
          is_active?: boolean
          last_name: string
          organization_id?: string | null
          points?: number
          profile_pic?: string | null
          referral_code?: string | null
          role_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits?: number
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean
          last_name?: string
          organization_id?: string | null
          points?: number
          profile_pic?: string | null
          referral_code?: string | null
          role_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization_profiles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "organization_profiles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      voucher_transactions: {
        Row: {
          created_at: string | null
          from_user_id: string | null
          id: string
          message: string | null
          status: Database["public"]["Enums"]["voucher_transactions_status_types"]
          to_user_id: string | null
          voucher_id: string | null
        }
        Insert: {
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["voucher_transactions_status_types"]
          to_user_id?: string | null
          voucher_id?: string | null
        }
        Update: {
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["voucher_transactions_status_types"]
          to_user_id?: string | null
          voucher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voucher_transactions_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      vouchers: {
        Row: {
          created_at: string | null
          id: string
          status: Database["public"]["Enums"]["voucher_status_types"]
          updated_at: string | null
          user_id: string | null
          voucher_code: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["voucher_status_types"]
          updated_at?: string | null
          user_id?: string | null
          voucher_code?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["voucher_status_types"]
          updated_at?: string | null
          user_id?: string | null
          voucher_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_voucher_code_fkey"
            columns: ["voucher_code"]
            isOneToOne: false
            referencedRelation: "redemptions"
            referencedColumns: ["voucher_code"]
          },
          {
            foreignKeyName: "vouchers_voucher_code_fkey"
            columns: ["voucher_code"]
            isOneToOne: false
            referencedRelation: "reward_redemption_history"
            referencedColumns: ["voucher_code"]
          },
        ]
      }
    }
    Views: {
      client_booking_history: {
        Row: {
          booking_id: string | null
          date: string | null
          email: string | null
          end_time: string | null
          first_name: string | null
          last_name: string | null
          organization_id: string | null
          profile_pic: string | null
          resource: string | null
          resource_id: string | null
          start_time: string | null
          status: Database["public"]["Enums"]["booking_status_types"] | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization_profiles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_organizations: {
        Row: {
          organization_id: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization_profiles"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      masked_referrals: {
        Row: {
          code: string | null
          created_at: string | null
          email: string | null
          id: string | null
          masked_client_name: string | null
          status: Database["public"]["Enums"]["referral_status"] | null
          user_id: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          masked_client_name?: never
          status?: Database["public"]["Enums"]["referral_status"] | null
          user_id?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          masked_client_name?: never
          status?: Database["public"]["Enums"]["referral_status"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      organization_profiles: {
        Row: {
          email: string | null
          organization_id: string | null
          role_id: string | null
          role_name: string | null
          user_id: string | null
        }
        Relationships: []
      }
      reward_redemption_history: {
        Row: {
          description: string | null
          expires_at: string | null
          first_name: string | null
          image_url: string | null
          last_name: string | null
          price: number | null
          redeemed_at: string | null
          redemption_id: string | null
          reward_id: string | null
          reward_name: string | null
          reward_points: number | null
          reward_type: Database["public"]["Enums"]["reward_types"] | null
          status: Database["public"]["Enums"]["redemption_status_types"] | null
          user_id: string | null
          voucher_code: string | null
        }
        Relationships: []
      }
      superadmin_users: {
        Row: {
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      handle_cancel_booking: {
        Args: {
          p_booking_id: string
          p_reason: Database["public"]["Enums"]["booking_cancellation_types"]
          p_remarks?: string
        }
        Returns: undefined
      }
      mask_name: {
        Args: { first_name: string; last_name: string }
        Returns: string
      }
      submit_review: {
        Args: { _booking_id: string; _rating: number; _comment: string }
        Returns: undefined
      }
      transfer_voucher: {
        Args: {
          from_user: string
          to_user_email: string
          voucher_id: string
          message?: string
        }
        Returns: string
      }
    }
    Enums: {
      booking_cancellation_types: "wrong_booking" | "rescheduled" | "other"
      booking_status_types:
        | "BOOKED"
        | "ONGOING"
        | "COMPLETED"
        | "EXPIRED"
        | "CANCELLED"
      credit_and_point_status_types: "ACTIVE" | "USED" | "EXPIRED"
      notification_types:
        | "referrals"
        | "credits"
        | "redemptions"
        | "points"
        | "resources"
        | "users"
        | "user_profiles"
        | "organizations"
        | "vouchers"
        | "voucher_transactions"
        | "rewards"
        | "bookings"
        | "availability"
      redemption_status_types: "ACTIVE" | "USED" | "PENDING" | "EXPIRED"
      referral_status: "PENDING" | "SUCCESS"
      referral_status_types: "SUCCESS" | "PENDING"
      reward_types: "points" | "credits"
      voucher_status_types: "AVAILABLE" | "TRANSFERRED" | "REDEEMED"
      voucher_transactions_status_types: "COMPLETED" | "PENDING" | "FAILED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      booking_cancellation_types: ["wrong_booking", "rescheduled", "other"],
      booking_status_types: [
        "BOOKED",
        "ONGOING",
        "COMPLETED",
        "EXPIRED",
        "CANCELLED",
      ],
      credit_and_point_status_types: ["ACTIVE", "USED", "EXPIRED"],
      notification_types: [
        "referrals",
        "credits",
        "redemptions",
        "points",
        "resources",
        "users",
        "user_profiles",
        "organizations",
        "vouchers",
        "voucher_transactions",
        "rewards",
        "bookings",
        "availability",
      ],
      redemption_status_types: ["ACTIVE", "USED", "PENDING", "EXPIRED"],
      referral_status: ["PENDING", "SUCCESS"],
      referral_status_types: ["SUCCESS", "PENDING"],
      reward_types: ["points", "credits"],
      voucher_status_types: ["AVAILABLE", "TRANSFERRED", "REDEEMED"],
      voucher_transactions_status_types: ["COMPLETED", "PENDING", "FAILED"],
    },
  },
} as const

