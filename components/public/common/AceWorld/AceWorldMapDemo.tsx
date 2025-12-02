"use client";


import type { FC } from "react";
import WorldMap from "./world-map";

// Type definitions for LatLng
interface LatLng {
  lat: number;
  lng: number;
}

// Type definition for a Dot (connects two LatLng points)
interface Dot {
  start: LatLng;
  end: LatLng;
}

const dots: Dot[] = [
  {
    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
    end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  },
  {
    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
  },
  {
    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
  },
  {
    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
    end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
  },
  {
    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
  },
];

const AceWorldMapDemo: FC = () => {
  return (
    <section className="py-0 bg-background w-full">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="font-bold text-foreground lg:text-4xl text-3xl sm:text-5xl">
          Remote <span className="text-muted-foreground">{" Connectivity"}</span>
        </p>
        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto p-4">
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>
      <div className="relative w-full overflow-hidden h-[500px] mt-4">
        <WorldMap dots={dots} />
      </div>
    </section>
  );
};

export default AceWorldMapDemo;
