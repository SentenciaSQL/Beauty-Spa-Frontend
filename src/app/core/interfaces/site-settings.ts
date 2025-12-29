export interface SiteSettings {
  id: number;
  app_name: string;
  tagline: string | null;
  logo_main_url: string | null;
  logo_sidebar_url: string | null;
  logo_small_url: string | null;
  about_text: string | null;
  terms_text: string | null;
  privacy_text: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  whatsapp_phone_e164: string | null;
  address_text: string | null;
  google_maps_iframe: string | null;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
