import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Professional Development Solutions",
  description: "Explore our comprehensive range of development services including web development, mobile apps, and cloud solutions.",
  keywords: "services, web development, mobile development, cloud solutions, software development",
  openGraph: {
    title: "Our Services",
    description: "Explore our comprehensive range of development services",
    url: "/services",
  },
};

export default function ServicesPage() {
  const services = Object.values(servicesData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="px-8 lg:px-16 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Comprehensive development solutions tailored to transform your ideas into reality.
              From web to mobile to cloud, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-8 lg:px-16 pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <article className="h-full bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={service.bannerImage || service.subservices[0]?.image.secure_url || "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg"}
                      alt={service.title}
                      fill
                      quality={75}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {service.subtitle}
                    </p>

                    {/* Sub-services count */}
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-sm text-gray-500">
                        {service.subservices.length} {service.subservices.length === 1 ? 'service' : 'services'}
                      </span>
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 lg:px-16 pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with our expert development services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}