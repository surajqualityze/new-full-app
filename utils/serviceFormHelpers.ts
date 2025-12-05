// utils/serviceFormHelpers.ts

import { ServiceFormData, Subservice, Industry } from "@/types/service";

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function createBlankSubservice(): Subservice {
  return {
    name: "",
    slug: "",
    description: "",
    keyPoints: "",
    image: null,
    imageAlt: "",
    details: "",
  };
}

export function createBlankIndustry(): Industry {
  return {
    name: "",
    detail: "",
  };
}

export function createFormData(service: ServiceFormData): FormData {
  const fd = new FormData();
  
  // Basic fields
  fd.append("name", service.name);
  fd.append("slug", service.slug);
  fd.append("title", service.title);
  fd.append("subtitle", service.subtitle);

  // SEO fields
  fd.append("seoTitle", service.seo.title);
  fd.append("seoDescription", service.seo.description);
  fd.append("seoKeywords", service.seo.keywords);
  fd.append("ogTitle", service.seo.openGraph.title);
  fd.append("ogDescription", service.seo.openGraph.description);
  
  if (service.seo.openGraph.image instanceof File) {
    fd.append("ogImage", service.seo.openGraph.image);
  }
  
  fd.append("ogUrl", service.seo.openGraph.url);

  // Industries
  service.industries.forEach((ind, idx) => {
    fd.append(`industries[${idx}][name]`, ind.name);
    fd.append(`industries[${idx}][detail]`, ind.detail);
  });

  // Subservices
  service.subservices.forEach((sub, idx) => {
    fd.append(`subservices[${idx}][name]`, sub.name);
    fd.append(`subservices[${idx}][slug]`, sub.slug);
    fd.append(`subservices[${idx}][description]`, sub.description);
    fd.append(`subservices[${idx}][keyPoints]`, sub.keyPoints);
    
    if (sub.image instanceof File) {
      fd.append(`subservices[${idx}][image]`, sub.image);
    }
    
    fd.append(`subservices[${idx}][imageAlt]`, sub.imageAlt);
    fd.append(`subservices[${idx}][details]`, sub.details);
  });

  return fd;
}

export function getInitialServiceFormData(): ServiceFormData {
  return {
    name: "",
    slug: "",
    title: "",
    subtitle: "",
    industries: [],
    subservices: [],
    seo: {
      title: "",
      description: "",
      keywords: "",
      openGraph: {
        title: "",
        description: "",
        image: null,
        url: "",
      },
    },
  };
}