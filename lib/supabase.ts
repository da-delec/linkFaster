import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Storage helpers for profile images
export class SupabaseStorage {
  static async uploadProfileImage(file: File, userId: string): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/profile-${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Error uploading file:', error)
        return null
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(data.path)

      return publicData.publicUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
  }

  static async uploadBackgroundImage(file: File, userId: string): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/background-${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Error uploading file:', error)
        return null
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(data.path)

      return publicData.publicUrl
    } catch (error) {
      console.error('Error uploading file:', error)
      return null
    }
  }

  static async deleteImage(url: string): Promise<boolean> {
    try {
      // Extract path from URL
      const path = url.split('/').slice(-2).join('/')
      
      const { error } = await supabase.storage
        .from('profile-images')
        .remove([path])

      return !error
    } catch (error) {
      console.error('Error deleting file:', error)
      return false
    }
  }
}