export interface Testimonial {
  id: number;
  name: string;
  message: string;
  rating: number;
  image_url: string | null;
  thumb_url: string | null;
  testimonial_date: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
