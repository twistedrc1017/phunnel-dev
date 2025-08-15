export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          id: string
          lead_id: string
          summary: string | null
          transcript: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id: string
          summary?: string | null
          transcript?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string
          summary?: string | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value: number
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      industry_apps: {
        Row: {
          created_at: string | null
          id: string
          industry_keys: string[]
          is_active: boolean
          key: string
          name: string
          spec: Json
          updated_at: string | null
          version: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          industry_keys: string[]
          is_active?: boolean
          key: string
          name: string
          spec: Json
          updated_at?: string | null
          version?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          industry_keys?: string[]
          is_active?: boolean
          key?: string
          name?: string
          spec?: Json
          updated_at?: string | null
          version?: number
        }
        Relationships: []
      }
      industry_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          key: string
          name: string
          spec: Json
          updated_at: string | null
          version: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          key: string
          name: string
          spec: Json
          updated_at?: string | null
          version?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          key?: string
          name?: string
          spec?: Json
          updated_at?: string | null
          version?: number
        }
        Relationships: []
      }
      leads: {
        Row: {
          budget: number | null
          created_at: string
          custom_fields: Json | null
          email: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          name: string
          phone: string | null
          project_location: string | null
          status: Database["public"]["Enums"]["lead_status"]
          timeline: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          custom_fields?: Json | null
          email?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          name: string
          phone?: string | null
          project_location?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          timeline?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          custom_fields?: Json | null
          email?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          name?: string
          phone?: string | null
          project_location?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          timeline?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      org_industry_template: {
        Row: {
          created_at: string | null
          id: string
          overrides: Json | null
          template_key: string
          template_version: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          overrides?: Json | null
          template_key: string
          template_version: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          overrides?: Json | null
          template_key?: string
          template_version?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_template_key"
            columns: ["template_key"]
            isOneToOne: false
            referencedRelation: "industry_templates"
            referencedColumns: ["key"]
          },
        ]
      }
      org_installed_apps: {
        Row: {
          app_key: string
          config: Json | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          app_key: string
          config?: Json | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          app_key?: string
          config?: Json | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_app_key"
            columns: ["app_key"]
            isOneToOne: false
            referencedRelation: "industry_apps"
            referencedColumns: ["key"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      industry_type:
        | "real_estate"
        | "property_management"
        | "healthcare"
        | "legal_services"
        | "home_services"
        | "consulting"
        | "restaurants"
      lead_status: "new" | "contacted" | "qualified" | "converted"
      project_status: "active" | "paused" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      industry_type: [
        "real_estate",
        "property_management",
        "healthcare",
        "legal_services",
        "home_services",
        "consulting",
        "restaurants",
      ],
      lead_status: ["new", "contacted", "qualified", "converted"],
      project_status: ["active", "paused", "completed"],
    },
  },
} as const
