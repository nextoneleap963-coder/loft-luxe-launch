export interface GalleryItem {
  image: string;
  category: string;
  title: string;
  isFromDB?: boolean;
  id?: string;
}

export interface Brand {
  slug: string;
  name: string;
  blurb: string;
  logo: string | null;
}
