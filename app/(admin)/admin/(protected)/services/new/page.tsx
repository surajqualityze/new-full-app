"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceFormData } from "@/types/service";
import { createFormData, getInitialServiceFormData } from "@/utils/serviceFormHelpers";
import ServiceOverviewSection from "@/components/admin/services/ServiceOverviewSection";
import ServiceSEOSection from "@/components/admin/services/ServiceSEOSection";
import SubservicesSection from "@/components/admin/services/SubservicesSection";
import IndustriesSection from "@/components/admin/services/IndustriesSection";
// import ServiceOverviewSection from "@/components/services/ServiceOverviewSection";
// import ServiceSEOSection from "@/components/services/ServiceSEOSection";
// import SubservicesSection from "@/components/services/SubservicesSection";
// import IndustriesSection from "@/components/services/IndustriesSection";

export default function NewServicePage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [service, setService] = useState<ServiceFormData>(getInitialServiceFormData());
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [subSlugEdited, setSubSlugEdited] = useState<Record<number, boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    
    try {
      const fd = createFormData(service);
      const res = await fetch("/api/services", {
        method: "POST",
        body: fd,
      });

      const resText = await res.text();
      console.log("Service create response:", res.status, resText);

      if (!res.ok) {
        toast.error("Failed to create service");
        setPending(false);
        return;
      }

      toast.success("Service created successfully!");
      router.push("/admin/services");
    } catch (err) {
      toast.error("Failed to create service");
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      {/* Header with gradient */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b mb-8 -mx-6 px-6 py-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Create New Service
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Add a new service with sub-services and details
              </p>
            </div>
          </div>
          <Button
            type="submit"
            disabled={pending}
            onClick={handleSubmit}
            className="min-w-[140px]"
          >
            {pending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Service
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Two column layout for Overview & SEO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ServiceOverviewSection
            service={service}
            setService={setService}
            slugManuallyEdited={slugManuallyEdited}
            setSlugManuallyEdited={setSlugManuallyEdited}
          />
          
          <ServiceSEOSection
            service={service}
            setService={setService}
          />
        </div>

        {/* Subservices Section */}
        <SubservicesSection
          service={service}
          setService={setService}
          subSlugEdited={subSlugEdited}
          setSubSlugEdited={setSubSlugEdited}
        />

        {/* Industries Section */}
        <IndustriesSection
          service={service}
          setService={setService}
        />
      </form>
    </div>
  );
}