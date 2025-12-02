import AboutCounting from "@/components/public/about/AboutCounting";
import AboutHero from "@/components/public/about/AboutHero";
import AboutVideoSec from "@/components/public/about/AboutVideoSec";
import DesignBuildMarket from "@/components/public/about/DesignBuildMarket";
import OurImpact from "@/components/public/about/OurImpact";
import OurStory from "@/components/public/about/OurStory";
import { Suspense } from "react";


export const metadata = {
  title: "About Us - DataSack Solutions",
  description: "Learn about DataSack Solutions, the leading IT company in Riyadh offering innovative solutions and services.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center">
      <div className="h-32"></div>
      <AboutHero />
      <Suspense fallback={<div className="w-full h-[600px] bg-gray-100 animate-pulse" />}>
        <AboutVideoSec />
      </Suspense>
      <AboutCounting />
      <OurStory />
      <DesignBuildMarket />
      <OurImpact /> 
    </main>
  );
}
