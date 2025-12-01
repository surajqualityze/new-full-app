"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import type { EmblaOptionsType } from "embla-carousel";
import { GradientButton } from "./public/common/my-button/GradientButton";

interface ProjectImage {
  src: string;
  label: string;
  url?: string;
}

interface Project {
  category: string;
  name: string;
  Description: string;
  images: ProjectImage[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnMouseEnter: true }));
  
  const options: EmblaOptionsType = {
    loop: true,
    align: "start",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);

  // Resume autoplay when mouse leaves
  useEffect(() => {
    if (!emblaApi) return;
    const container = emblaApi.containerNode();

    const handleMouseLeave = () => {
      autoplay.current.play();
    };

    container.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });
    
    return () => container.removeEventListener("mouseleave", handleMouseLeave);
  }, [emblaApi]);

  return (
    <div className="flex flex-col xl:flex-row gap-8 p-6 w-full">
      {/* Left Column - 40% */}
      <div className="w-full xl:w-[35%] space-y-14">
        <h3 className="text-4xl text-[#111] uppercase">{project.name}</h3>
        <p className="text-gray-600 text-lg pr-20">{project.Description}</p>
        <Link href={project.link}>
          <GradientButton
            variant="gradient"
            className="px-4 py-2 text-black text-sm font-normal whitespace-nowrap"
          >
            Know More
          </GradientButton>
        </Link>
      </div>

      {/* Right Column - Carousel 60% */}
      <div className="w-full xl:w-[65%] overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {project.images?.map(({ src, label, url }, idx) => (
            <div
              key={idx}
              className="flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_33.333%] px-2"
            >
              <div className="relative w-full h-[400px]">
                <Image
                  src={src}
                  alt={`${project.name} - ${label}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  priority={idx === 0}
                />

                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                  <div className="text-center mt-42 flex flex-col gap-8 group">
                    <span className="text-white text-4xl font-medium block mb-2 group-hover:text-[#06BDFF] transition-colors duration-300">
                      {label}
                    </span>
                    <Link
                      href={url || "#"}
                      className="text-white text-xl font-medium underline decoration-[#06BDFF] underline-offset-4 hover:text-[#06BDFF] transition-colors duration-300"
                      onClick={(e) => {
                        if (!url || url === "#") {
                          e.preventDefault();
                          console.log(`More details for: ${label}`);
                        }
                      }}
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
