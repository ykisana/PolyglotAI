export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_threads: {
        Row: {
          created_at: string | null
          id: number
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string | null
          updated_at?: string | null
        }
      }
      messages: {
        Row: {
          created_at: string | null
          id: number
          message: Json | null
          thread_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: Json | null
          thread_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: Json | null
          thread_id?: number | null
        }
      }
      vocabulary: {
        Row: {
          created_at: string | null
          id: number
          message_id: number | null
          vocab: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message_id?: number | null
          vocab?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message_id?: number | null
          vocab?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
