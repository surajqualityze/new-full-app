import Contact from "@/components/public/contact/Contact";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact Us - DataSack Solutions",
  description: "Get in touch with DataSack Solutions. We're here to support your digital transformation journey.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Contact />
    </main>
  );
}
