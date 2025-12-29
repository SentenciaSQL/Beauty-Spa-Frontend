export interface GalleryItem {
  id: number;
  title: string | null;
  caption: string | null;
  image_url: string;
  thumb_url: string | null;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
