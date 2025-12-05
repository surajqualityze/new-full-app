// data/services.ts
import { ServiceData } from "@/types/service";

export const servicesData: Record<string, ServiceData> = {
  "web-development": {
    slug: "web-development",
    title: "Web Development Services",
    subtitle: "Build modern, scalable web applications with cutting-edge technologies",
    bannerImage: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
    subservices: [
      {
        name: "Full-Stack Development",
        description: "End-to-end web application development using modern JavaScript frameworks and robust backend solutions.",
        keyPoints: [
          "React, Next.js, and Vue.js expertise",
          "Node.js and Python backend development",
          "RESTful and GraphQL API design",
          "Database optimization and architecture",
          "Microservices architecture implementation"
        ],
        slug: "full-stack-development",
        image: {
          secure_url: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
          alt: "Full-Stack Development"
        }
      },
      {
        name: "Frontend Development",
        description: "Create stunning, responsive user interfaces with performance and accessibility at the core.",
        keyPoints: [
          "Modern UI/UX implementation",
          "Component-based architecture",
          "Performance optimization",
          "Cross-browser compatibility",
          "Responsive design principles"
        ],
        slug: "frontend-development",
        image: {
          secure_url: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
          alt: "Frontend Development"
        }
      },
      {
        name: "Backend Development",
        description: "Build scalable, secure server-side applications and APIs that power your business.",
        keyPoints: [
          "Scalable API development",
          "Database design and optimization",
          "Authentication and authorization",
          "Cloud infrastructure setup",
          "Performance monitoring and optimization"
        ],
        slug: "backend-development",
        image: {
          secure_url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
          alt: "Backend Development"
        }
      }
    ],
    industries: [
      {
        name: "E-Commerce",
        detail: "Custom online stores with seamless checkout experiences, inventory management, and payment integration."
      },
      {
        name: "Healthcare",
        detail: "HIPAA-compliant patient portals, telemedicine platforms, and healthcare management systems."
      },
      {
        name: "Finance",
        detail: "Secure fintech applications, banking portals, and trading platforms with real-time data processing."
      },
      {
        name: "Education",
        detail: "Learning management systems, online course platforms, and educational tools for modern learners."
      }
    ],
    seo: {
      title: "Web Development Services | Custom Web Applications",
      description: "Professional web development services for modern businesses. Full-stack, frontend, and backend development.",
      keywords: "web development, full-stack development, frontend, backend, React, Next.js",
      openGraph: {
        title: "Web Development Services",
        description: "Build modern, scalable web applications with our expert team",
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
        url: "https://yoursite.com/services/web-development"
      }
    }
  },
  "mobile-development": {
    slug: "mobile-development",
    title: "Mobile App Development",
    subtitle: "Native and cross-platform mobile applications that delight users",
    bannerImage: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
    subservices: [
      {
        name: "iOS Development",
        description: "Native iOS applications built with Swift and SwiftUI for optimal performance and user experience.",
        keyPoints: [
          "Native Swift development",
          "SwiftUI and UIKit expertise",
          "App Store optimization",
          "iOS design guidelines compliance",
          "Performance profiling and optimization"
        ],
        slug: "ios-development",
        image: {
          secure_url: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
          alt: "iOS Development"
        }
      },
      {
        name: "Android Development",
        description: "High-performance Android applications using Kotlin and modern Android development practices.",
        keyPoints: [
          "Kotlin and Java expertise",
          "Jetpack Compose UI development",
          "Material Design implementation",
          "Google Play Store optimization",
          "Device compatibility testing"
        ],
        slug: "android-development",
        image: {
          secure_url: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
          alt: "Android Development"
        }
      },
      {
        name: "Cross-Platform Development",
        description: "Build once, deploy everywhere with React Native and Flutter for efficient mobile app development.",
        keyPoints: [
          "React Native and Flutter expertise",
          "Shared codebase architecture",
          "Native module integration",
          "Cost-effective development",
          "Rapid prototyping and iteration"
        ],
        slug: "cross-platform-development",
        image: {
          secure_url: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg",
          alt: "Cross-Platform Development"
        }
      }
    ],
    industries: [
      {
        name: "Retail",
        detail: "Shopping apps with seamless experiences, loyalty programs, and personalized recommendations."
      },
      {
        name: "Transportation",
        detail: "Ride-sharing, delivery tracking, and logistics management applications with real-time updates."
      },
      {
        name: "Entertainment",
        detail: "Streaming platforms, social networks, and gaming applications with engaging user experiences."
      },
      {
        name: "Fitness",
        detail: "Workout tracking, nutrition planning, and wellness apps with wearable device integration."
      }
    ],
    seo: {
      title: "Mobile App Development Services | iOS & Android Apps",
      description: "Professional mobile app development for iOS and Android. Native and cross-platform solutions.",
      keywords: "mobile app development, iOS, Android, React Native, Flutter, Swift, Kotlin",
      openGraph: {
        title: "Mobile App Development Services",
        description: "Create amazing mobile experiences for iOS and Android",
        image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
        url: "https://yoursite.com/services/mobile-development"
      }
    }
  },
  "cloud-solutions": {
    slug: "cloud-solutions",
    title: "Cloud Solutions & DevOps",
    subtitle: "Scalable cloud infrastructure and automated deployment pipelines",
    bannerImage: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
    subservices: [
      {
        name: "Cloud Migration",
        description: "Seamlessly migrate your infrastructure to AWS, Azure, or Google Cloud with zero downtime.",
        keyPoints: [
          "Multi-cloud strategy development",
          "Infrastructure assessment and planning",
          "Data migration and synchronization",
          "Legacy system modernization",
          "Cost optimization strategies"
        ],
        slug: "cloud-migration",
        image: {
          secure_url: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
          alt: "Cloud Migration"
        }
      },
      {
        name: "DevOps Implementation",
        description: "Automate your deployment pipelines and improve collaboration between development and operations.",
        keyPoints: [
          "CI/CD pipeline setup",
          "Infrastructure as Code (Terraform, CloudFormation)",
          "Container orchestration (Kubernetes, Docker)",
          "Monitoring and logging solutions",
          "Automated testing and quality gates"
        ],
        slug: "devops-implementation",
        image: {
          secure_url: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg",
          alt: "DevOps Implementation"
        }
      },
      {
        name: "Cloud Security",
        description: "Implement robust security measures and compliance standards for your cloud infrastructure.",
        keyPoints: [
          "Security audit and compliance",
          "Identity and access management",
          "Encryption and data protection",
          "Network security and firewalls",
          "Incident response planning"
        ],
        slug: "cloud-security",
        image: {
          secure_url: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
          alt: "Cloud Security"
        }
      }
    ],
    industries: [
      {
        name: "SaaS",
        detail: "Scalable cloud infrastructure for software-as-a-service platforms with global reach."
      },
      {
        name: "Media",
        detail: "Content delivery networks, video streaming infrastructure, and media asset management."
      },
      {
        name: "Enterprise",
        detail: "Large-scale enterprise applications with high availability and disaster recovery."
      },
      {
        name: "Startups",
        detail: "Cost-effective cloud solutions that scale with your startup's growth trajectory."
      }
    ],
    seo: {
      title: "Cloud Solutions & DevOps Services | AWS, Azure, GCP",
      description: "Expert cloud migration, DevOps implementation, and cloud security services.",
      keywords: "cloud solutions, DevOps, AWS, Azure, Google Cloud, cloud migration, Kubernetes",
      openGraph: {
        title: "Cloud Solutions & DevOps Services",
        description: "Scale your infrastructure with modern cloud solutions",
        image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
        url: "https://yoursite.com/services/cloud-solutions"
      }
    }
  }
};

// Helper function to get service by slug
export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData[slug];
};

// Get all service slugs for static generation
export const getAllServiceSlugs = (): string[] => {
  return Object.keys(servicesData);
};