"use client";

import { useState, type FormEvent } from "react";
import { motion, easeOut } from "motion/react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { TextGifHeadingOne, TextGifHeadingTwo } from "../textGif/TextGifDemo";
import { GradientButton } from "../common/my-button/GradientButton";
// import { GradientButton } from "@/components/common/my-button/GradientButton";
// import { TextGifHeadingOne } from "@/components/textGif/TextGifDemo";

// Lazy load AceWorldMapDemo (client-side only)
const AceWorldMapDemo = dynamic(
  () => import("../common/AceWorld/AceWorldMapDemo"),
  {
    ssr: false,
    loading: () => (
      <p className="text-center py-20 text-gray-500">Loading map...</p>
    ),
  }
);

interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}

const initialFormState: ContactFormData = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Form submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData(initialFormState);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="font-['Oxanium']">
      {/* Banner Section with Video and Poster */}
      <motion.div
        className="relative w-full h-[320px] md:h-[420px] overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/contact/contact_bnr.webm"
          poster="/images/contact/contact_bnr_poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          >
            <TextGifHeadingTwo >
            Get In Touch
            </TextGifHeadingTwo>
          </motion.h1>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <section className="relative w-full bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left side: Contact Info */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Contact Us
            </h2>

            <div className="text-gray-700 space-y-4 leading-relaxed">
              <p>
                At <strong className="text-blue-600">SAASENTIAL</strong>, we
                believe meaningful growth begins with the right conversation.
              </p>

              <p>
                Whether you&apos;re a startup ready to scale or an established
                business seeking digital momentum, we&apos;re here to support
                your journey. We specialize in crafting intelligent,
                forward-thinking solutions that help businesses adapt, evolve,
                and thrive in a rapidly changing world.
              </p>

              <p>
                If you&apos;re looking to enhance your digital presence,
                streamline operations, or explore new opportunities — we&apos;re
                ready to listen.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center space-x-3 text-gray-800">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a
                  href="mailto:info@saasential.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  info@saasential.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-800">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a
                  href="tel:+21123456586"
                  className="hover:text-blue-600 transition-colors"
                >
                  Support: (+21) 123 456 586
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-800">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </motion.div>

          {/* Right side: Form Box */}
          <motion.div
            className="bg-white/90 rounded-2xl shadow-2xl p-8 border border-gray-200 backdrop-blur-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <div className="mb-6">
              <TextGifHeadingOne fontSize="2.5rem">
                For More Details
              </TextGifHeadingOne>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="fullName"
                  type="text"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="bg-white text-black placeholder:text-gray-500 rounded-lg px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Input
                  name="company"
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-white text-black placeholder:text-gray-500 rounded-lg px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white text-black placeholder:text-gray-500 rounded-lg px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-white text-black placeholder:text-gray-500 rounded-lg px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <Input
                name="location"
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-white text-black placeholder:text-gray-500 rounded-lg px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />

              <Textarea
                name="message"
                placeholder="Your message *"
                rows={8}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="bg-white text-black placeholder:text-gray-500 rounded-lg px-4 py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
              />

              <GradientButton
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-8 py-3 w-full md:w-fit text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message →"}
              </GradientButton>
            </form>
          </motion.div>
        </div>
      </section>

      {/* World Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <AceWorldMapDemo />
      </motion.div>
    </section>
  );
}
