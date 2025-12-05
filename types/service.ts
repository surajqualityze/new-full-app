// types/service.ts

export interface ServiceImage {
  src: string;
  alt: string;
}

export interface SubService {
  title: string;
  description: string;
  bullets?: string[];
  slug: string;
  image: ServiceImage;
}

export interface Industry {
  name: string;
  detail: string;
}

export interface HeroData {
  title: string;
  description: string;
  slug: string;
  bannerImage?: string | null;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  bannerImage?: string;
  subservices: Array<{
    name: string;
    description: string;
    keyPoints: string[];
    slug: string;
    image: {
      secure_url: string;
      alt: string;
    };
  }>;
  industries: Industry[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: string;
      url?: string;
    };
  };
}

export interface ServiceLayoutProps {
  heroData: HeroData;
  servicesData: SubService[];
  industriesData: Industry[];
  className?: string;
}