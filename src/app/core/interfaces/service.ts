export interface ServiceItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sort_order: number;
  is_popular: boolean | null;
  is_deal: boolean | null;
}
