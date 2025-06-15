import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string
          task: string
          is_complete: boolean
          created_at: string
        }
        Insert: {
          id?: string
          task: string
          is_complete?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          task?: string
          is_complete?: boolean
          created_at?: string
        }
      }
    }
  }
}