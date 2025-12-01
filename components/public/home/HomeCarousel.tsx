"use client";
import React, { useState, useMemo, useCallback } from "react";
import { motion, type Variants } from "motion/react";
import ProjectCard from "@/components/ProjectCard";
import { AnimatedLink } from "../common/animated-text/AnimatedLink";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../common/Tabs/saas-tabs";

const projectData = [
  {
    category: "Training",
    name: "SaaS Training",
    Description:
      "Ready for a new look? We'll help you update to a more modern design that reflects your current branding, brings your website's look and feel up to your standards, and appeals to prospects.",
    images: [
      {
        src: "/images/services/servicess-1.jpg",
        label: "Service One",
        url: "/",
      },
      {
        src: "/images/services/servicess-2.jpg",
        label: "Service Two",
        url: "/",
      },
      {
        src: "/images/services/servicess-3.jpg",
        label: "Service Three",
        url: "/",
      },
      {
        src: "/images/services/servicess-4.jpg",
        label: "Service Four",
        url: "/",
      },
      {
        src: "/images/services/servicess-5.jpg",
        label: "Service Five",
        url: "/",
      },
    ],
    link: "/",
  },
  {
    category: "Services",
    name: "Marketing for SaaS",
    Description:
      "rrr Ready for a new look? We'll help you update to a more modern design that reflects your current branding, brings your website's look and feel up to your standards, and appeals to prospects.",
    images: [
      { src: "/images/services/servicess-1.jpg", label: "SEO" },
      { src: "/images/services/servicess-2.jpg", label: "Email Marketing" },
      { src: "/images/services/servicess-3.jpg", label: "Web Development" },
      { src: "/images/services/servicess-4.jpg", label: "Service Four" },
      { src: "/images/services/servicess-5.jpg", label: "Service Five" },
    ],
    link: "/",
  },
  {
    category: "Products",
    name: "Software Sales Support",
    Description:
      "Ready for a new look? We'll help you update to a more modern design that reflects your current branding, brings your website's look and feel up to your standards, and appeals to prospects.",
    images: [
      { src: "/images/services/servicess-1.jpg", label: "SEO" },
      { src: "/images/services/servicess-2.jpg", label: "Email Marketing" },
      { src: "/images/services/servicess-3.jpg", label: "Web Development" },
      { src: "/images/services/servicess-4.jpg", label: "Service Four" },
      { src: "/images/services/servicess-5.jpg", label: "Service Five" },
    ],
    link: "/",
  },
];

const HomeCarousel = () => {
  const [category, setCategory] = useState("Training");

  // Memoize categories to prevent recalculation
  const categories = useMemo(
    () => [...new Set(projectData.map((item) => item.category))],
    []
  );

  // Memoize filtered projects
  const filteredProjects = useMemo(
    () => projectData.filter((project) => project.category === category),
    [category]
  );

  // Memoize category change handler
  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, []);

  // Animation variants for section entrance
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for tab content
  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      className="relative z-20 bg-white flex items-center justify-center text-sm font-normal py-20 md:py-32 w-full"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="saas-container">
        <Tabs
          value={category}
          onValueChange={handleCategoryChange}
          className="mb-4"
        >
          <div className="flex justify-center">
            <TabsList
              className="grid gap-2 md:gap-4 max-w-[1240px] mx-auto mb-8 md:border-none dark:border-none"
              style={{
                gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
              }}
            >
              {categories.map((cat) => (
                <TabsTrigger
                  value={cat}
                  key={cat}
                  className="capitalize font-normal text-lg md:text-xl px-4 py-2"
                >
                  <AnimatedLink
                    text={cat}
                    hoverColor="#0B8AE5"
                    defaultColor={category === cat ? "#0B8AE5" : "currentColor"}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="w-full">
            {categories.map((cat) => (
              <TabsContent value={cat} key={cat} className="mt-0">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={cat}
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={`${project.category}-${index}`}
                      project={project}
                    />
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </motion.section>
  );
};

export default HomeCarousel;
