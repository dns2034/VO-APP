export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          query?: string;
          extensions?: Json;
          operationName?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      booking_cancellations: {
        Row: {
          booking_id: string;
          cancelled_at: string;
          cancelled_by: string;
          id: string;
          remarks: string | null;
        };
        Insert: {
          booking_id: string;
          cancelled_at?: string;
          cancelled_by: string;
          id?: string;
          remarks?: string | null;
        };
        Update: {
          booking_id?: string;
          cancelled_at?: string;
          cancelled_by?: string;
          id?: string;
          remarks?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "booking_cancellations_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          }
        ];
      };
      bookings: {
        Row: {
          booked_by: string;
          created_at: string;
          date: string;
          end_time: string;
          id: string;
          product_voucher_id: string | null;
          remarks: string | null;
          space_unit_id: string;
          start_time: string;
          status: Database["public"]["Enums"]["booking_status"];
        };
        Insert: {
          booked_by?: string;
          created_at?: string;
          date: string;
          end_time: string;
          id?: string;
          product_voucher_id?: string | null;
          remarks?: string | null;
          space_unit_id: string;
          start_time: string;
          status?: Database["public"]["Enums"]["booking_status"];
        };
        Update: {
          booked_by?: string;
          created_at?: string;
          date?: string;
          end_time?: string;
          id?: string;
          product_voucher_id?: string | null;
          remarks?: string | null;
          space_unit_id?: string;
          start_time?: string;
          status?: Database["public"]["Enums"]["booking_status"];
        };
        Relationships: [
          {
            foreignKeyName: "bookings_product_voucher_id_fkey";
            columns: ["product_voucher_id"];
            isOneToOne: false;
            referencedRelation: "product_vouchers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_space_unit_id_fkey";
            columns: ["space_unit_id"];
            isOneToOne: false;
            referencedRelation: "space_units";
            referencedColumns: ["id"];
          }
        ];
      };
      branches: {
        Row: {
          created_at: string;
          id: string;
          image_path: string | null;
          location: string | null;
          name: string;
          organization_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_path?: string | null;
          location?: string | null;
          name: string;
          organization_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_path?: string | null;
          location?: string | null;
          name?: string;
          organization_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "branches_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      businesses: {
        Row: {
          created_at: string;
          description: string | null;
          email: string | null;
          id: string;
          logo_url: string | null;
          name: string;
          phone: string | null;
          user_id: string;
          website: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          logo_url?: string | null;
          name: string;
          phone?: string | null;
          user_id?: string;
          website?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          email?: string | null;
          id?: string;
          logo_url?: string | null;
          name?: string;
          phone?: string | null;
          user_id?: string;
          website?: string | null;
        };
        Relationships: [];
      };
      credits: {
        Row: {
          created_at: string;
          expires_at: string;
          id: string;
          status: Database["public"]["Enums"]["currency_status"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          expires_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["currency_status"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["currency_status"];
          user_id?: string;
        };
        Relationships: [];
      };
      organization_pages: {
        Row: {
          created_at: string;
          id: string;
          page_url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          page_url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          page_url?: string;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          created_at: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      points: {
        Row: {
          created_at: string;
          expires_at: string;
          id: string;
          status: Database["public"]["Enums"]["currency_status"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          expires_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["currency_status"];
          user_id?: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string;
          id?: string;
          status?: Database["public"]["Enums"]["currency_status"];
          user_id?: string;
        };
        Relationships: [];
      };
      product_vouchers: {
        Row: {
          code: string | null;
          created_at: string;
          expiring_at: string | null;
          id: string;
          is_refundable: boolean;
          product_id: string;
          status: Database["public"]["Enums"]["voucher_status"];
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          expiring_at?: string | null;
          id?: string;
          is_refundable: boolean;
          product_id: string;
          status?: Database["public"]["Enums"]["voucher_status"];
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          expiring_at?: string | null;
          id?: string;
          is_refundable?: boolean;
          product_id?: string;
          status?: Database["public"]["Enums"]["voucher_status"];
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_vouchers_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          created_at: string;
          description: string;
          duration: number | null;
          id: string;
          image_path: string;
          name: string;
          price: number;
          space_id: string | null;
        };
        Insert: {
          created_at?: string;
          description: string;
          duration?: number | null;
          id?: string;
          image_path: string;
          name: string;
          price?: number;
          space_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string;
          duration?: number | null;
          id?: string;
          image_path?: string;
          name?: string;
          price?: number;
          space_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["roles"];
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          id: string;
          role?: Database["public"]["Enums"]["roles"];
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["roles"];
        };
        Relationships: [];
      };
      referrals: {
        Row: {
          created_at: string;
          id: string;
          metadata: Json | null;
          referred_by: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          referred_by?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          referred_by?: string | null;
        };
        Relationships: [];
      };
      reward_vouchers: {
        Row: {
          code: string | null;
          created_at: string;
          expiring_at: string;
          id: string;
          reward_id: string;
          status: Database["public"]["Enums"]["voucher_status"];
          user_id: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          expiring_at?: string;
          id?: string;
          reward_id: string;
          status?: Database["public"]["Enums"]["voucher_status"];
          user_id?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          expiring_at?: string;
          id?: string;
          reward_id?: string;
          status?: Database["public"]["Enums"]["voucher_status"];
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reward_vouchers_reward_id_fkey";
            columns: ["reward_id"];
            isOneToOne: false;
            referencedRelation: "rewards";
            referencedColumns: ["id"];
          }
        ];
      };
      rewards: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image_path: string | null;
          name: string;
          organization_id: string;
          price: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          name: string;
          organization_id: string;
          price?: number;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          name?: string;
          organization_id?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rewards_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      space_availability: {
        Row: {
          closing_time: string;
          created_at: string;
          date: string;
          id: string;
          opening_time: string;
          space_id: string;
        };
        Insert: {
          closing_time: string;
          created_at?: string;
          date: string;
          id?: string;
          opening_time: string;
          space_id: string;
        };
        Update: {
          closing_time?: string;
          created_at?: string;
          date?: string;
          id?: string;
          opening_time?: string;
          space_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "space_availability_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          }
        ];
      };
      space_units: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          space_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          space_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          space_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "space_units_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          }
        ];
      };
      spaces: {
        Row: {
          branch_id: string;
          created_at: string;
          id: string;
          is_available: boolean;
          name: string;
        };
        Insert: {
          branch_id: string;
          created_at?: string;
          id?: string;
          is_available?: boolean;
          name: string;
        };
        Update: {
          branch_id?: string;
          created_at?: string;
          id?: string;
          is_available?: boolean;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spaces_branch_id_fkey";
            columns: ["branch_id"];
            isOneToOne: false;
            referencedRelation: "branches";
            referencedColumns: ["id"];
          }
        ];
      };
      subscriptions: {
        Row: {
          created_at: string;
          id: string;
          subscriptions_type: Database["public"]["Enums"]["subscriptions_type"];
        };
        Insert: {
          created_at?: string;
          id?: string;
          subscriptions_type: Database["public"]["Enums"]["subscriptions_type"];
        };
        Update: {
          created_at?: string;
          id?: string;
          subscriptions_type?: Database["public"]["Enums"]["subscriptions_type"];
        };
        Relationships: [];
      };
      user_organizations: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          organization_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_organization_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["roles"];
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["roles"];
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["roles"];
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_subscriptions: {
        Row: {
          expires_at: string | null;
          id: string;
          organization_id: string | null;
          started_at: string | null;
          subscription_id: string | null;
        };
        Insert: {
          expires_at?: string | null;
          id: string;
          organization_id?: string | null;
          started_at?: string | null;
          subscription_id?: string | null;
        };
        Update: {
          expires_at?: string | null;
          id?: string;
          organization_id?: string | null;
          started_at?: string | null;
          subscription_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_subscriptions_subscription_id_fkey";
            columns: ["subscription_id"];
            isOneToOne: false;
            referencedRelation: "subscriptions";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      assign_booking_times_by_duration: {
        Args: {
          p_start: string;
          p_duration: number;
          p_end: string;
          p_open: string;
          p_close: string;
        };
        Returns: {
          start_time: string;
          end_time: string;
        }[];
      };
      cancel_booking: {
        Args: { p_remarks: string; p_user_id: string; p_booking_id: string };
        Returns: string;
      };
      check_booking_cancellation_window: {
        Args: { p_created_at: string };
        Returns: boolean;
      };
      check_booking_overlap: {
        Args: {
          p_end: string;
          p_space_unit_id: string;
          p_date: string;
          p_start: string;
        };
        Returns: undefined;
      };
      generate_voucher_code: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_product_info: {
        Args: { p_voucher_id: string };
        Returns: {
          product_id: string;
          duration: number;
        }[];
      };
      get_space_availability: {
        Args: { p_space_unit_id: string; p_date: string };
        Returns: {
          opening_time: string;
          closing_time: string;
        }[];
      };
      get_total_active_credits: {
        Args: { p_user_id: string };
        Returns: number;
      };
      get_user_subscription_type: {
        Args: { p_user_id: string };
        Returns: string;
      };
      is_booking_cancellable: {
        Args: { p_status: string };
        Returns: boolean;
      };
      log_cancellation: {
        Args: { p_user_id: string; p_booking_id: string; p_remarks: string };
        Returns: undefined;
      };
      reactivate_voucher_if_used: {
        Args: { p_voucher_id: string };
        Returns: undefined;
      };
      set_product_voucher_used: {
        Args: { p_voucher_id: string };
        Returns: undefined;
      };
      update_booking_status_to_cancelled: {
        Args: { p_booking_id: string };
        Returns: undefined;
      };
      validate_booking: {
        Args: { p_booking_id: string; p_user_id: string };
        Returns: {
          result_voucher_id: string;
          result_start_time: string;
          result_booking_date: string;
          result_status: string;
          result_created_at: string;
        }[];
      };
      validate_time_within_bounds: {
        Args: {
          p_start: string;
          p_end: string;
          p_open: string;
          p_close: string;
        };
        Returns: undefined;
      };
      validate_voucher_duration: {
        Args: { p_duration: number; p_start: string; p_end: string };
        Returns: undefined;
      };
      verify_product_voucher: {
        Args: {
          p_end_time: string;
          p_voucher_id: string;
          p_user_id: string;
          p_space_unit_id: string;
          p_start_time: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      booking_status:
        | "booked"
        | "cancelled"
        | "pending"
        | "completed"
        | "no-show";
      currency_status: "active" | "used" | "expired";
      reward_types: "credit" | "point";
      roles: "manager" | "client" | "superadmin";
      subscriptions_type:
        | "business_address_only"
        | "virtual_office_for_solo"
        | "virtual_office_for_team";
      voucher_status: "used" | "active" | "expired";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      booking_status: [
        "booked",
        "cancelled",
        "pending",
        "completed",
        "no-show",
      ],
      currency_status: ["active", "used", "expired"],
      reward_types: ["credit", "point"],
      roles: ["manager", "client", "superadmin"],
      subscriptions_type: [
        "business_address_only",
        "virtual_office_for_solo",
        "virtual_office_for_team",
      ],
      voucher_status: ["used", "active", "expired"],
    },
  },
} as const;
