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
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
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
      bookings: {
        Row: {
          booked_by: string;
          created_at: string;
          date: string;
          end_time: string;
          id: string;
          start_time: string;
          status: Database["public"]["Enums"]["booking_status"];
        };
        Insert: {
          booked_by: string;
          created_at?: string;
          date: string;
          end_time: string;
          id?: string;
          start_time: string;
          status?: Database["public"]["Enums"]["booking_status"];
        };
        Update: {
          booked_by?: string;
          created_at?: string;
          date?: string;
          end_time?: string;
          id?: string;
          start_time?: string;
          status?: Database["public"]["Enums"]["booking_status"];
        };
        Relationships: [];
      };
      branches: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          organization_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          organization_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
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
          code: string;
          created_at: string;
          expiring_at: string | null;
          id: string;
          product_id: string;
          status: Database["public"]["Enums"]["voucher_status"];
          user_id: string | null;
        };
        Insert: {
          code: string;
          created_at?: string;
          expiring_at?: string | null;
          id?: string;
          product_id: string;
          status?: Database["public"]["Enums"]["voucher_status"];
          user_id?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string;
          expiring_at?: string | null;
          id?: string;
          product_id?: string;
          status?: Database["public"]["Enums"]["voucher_status"];
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
          id: string;
          image_path: string;
          name: string;
          organization_id: string;
          price: number;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          image_path: string;
          name: string;
          organization_id: string;
          price?: number;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          image_path?: string;
          name?: string;
          organization_id?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "products_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          id: string;
          organization_id: string;
          role: Database["public"]["Enums"]["roles"];
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          id: string;
          organization_id: string;
          role?: Database["public"]["Enums"]["roles"];
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          id?: string;
          organization_id?: string;
          role?: Database["public"]["Enums"]["roles"];
        };
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
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
          code: string;
          created_at: string;
          expiring_at: string;
          id: string;
          reward_id: string;
          status: Database["public"]["Enums"]["voucher_status"];
          user_id: string | null;
        };
        Insert: {
          code: string;
          created_at?: string;
          expiring_at?: string;
          id?: string;
          reward_id: string;
          status?: Database["public"]["Enums"]["voucher_status"];
          user_id?: string | null;
        };
        Update: {
          code?: string;
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
          space_id?: string;
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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_voucher_code: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      booking_status: "booked" | "cancelled" | "pending";
      currency_status: "active" | "used" | "expired";
      reward_types: "credit" | "point";
      roles: "manager" | "client" | "superadmin";
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
      booking_status: ["booked", "cancelled", "pending"],
      currency_status: ["active", "used", "expired"],
      reward_types: ["credit", "point"],
      roles: ["manager", "client", "superadmin"],
      voucher_status: ["used", "active", "expired"],
    },
  },
} as const;
