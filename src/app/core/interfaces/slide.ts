export interface Slide {
  id: number;
  title: string;
  secondary_title: string | null;
  subtitle: string | null;
  image_url: string;
  thumb_url: string | null;
  link_url: string | null;
  alt_text: string | null;
  sort_order: number;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}
