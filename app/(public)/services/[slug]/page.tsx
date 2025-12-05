import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import type { HeroData, SubService } from "@/types/service";
import ServiceLayout from "@/components/public/services/ServiceLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all services
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const seo = service.seo || {};

  return {
    title: seo.title || service.title,
    description: seo.description || service.subtitle,
    keywords: seo.keywords || "",
    openGraph: {
      title: seo.openGraph?.title || seo.title || service.title,
      description: seo.openGraph?.description || seo.description || service.subtitle,
      images: seo.openGraph?.image ? [seo.openGraph.image] : [],
      url: seo.openGraph?.url || `/services/${slug}`,
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return notFound();
  }

  // Transform data for ServiceLayout
  const heroData: HeroData = {
    title: service.title,
    description: service.subtitle,
    slug: service.slug,
    bannerImage: service.bannerImage || null,
  };

  const servicesData: SubService[] = service.subservices.map((sub) => ({
    title: sub.name,
    description: sub.description,
    bullets: sub.keyPoints,
    slug: sub.slug,
    image: {
      src: sub.image.secure_url,
      alt: sub.image.alt,
    },
  }));

  const industriesData = service.industries;

  return (
    <ServiceLayout
      heroData={heroData}
      servicesData={servicesData}
      industriesData={industriesData}
    />
  );
}