"use client";

import Link from "next/link";
import { motion, easeOut } from "motion/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import { GradientButton } from "@/components/common/my-button/GradientButton";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { GradientButton } from "@/components/public/common/my-button/GradientButton";
import { TextGifHeadingOne } from "@/components/public/textGif/TextGifDemo";
// import { TextGifHeadingOne } from "@/components/textGif/TextGifDemo";

// Job data interface
interface Job {
  readonly id: number;
  readonly title: string;
  readonly experience: string;
  readonly location: string;
  readonly summary: string;
  readonly requirements: readonly string[];
  readonly responsibilities: readonly string[];
}

// Mock Job Data
const jobs: readonly Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    experience: "2–4 years",
    location: "Bangalore, India",
    summary:
      "Responsible for building user-friendly web applications using React and Next.js.",
    requirements: [
      "Proficiency in JavaScript, React, Next.js, and TailwindCSS",
      "Experience with REST APIs",
      "Good understanding of responsive design",
    ],
    responsibilities: [
      "Develop and maintain UI components",
      "Work with designers and backend developers",
      "Ensure performance and cross-browser compatibility",
    ],
  },
  {
    id: 2,
    title: "Backend Developer",
    experience: "3–5 years",
    location: "Hyderabad, India",
    summary: "Work on scalable backend services using Node.js and databases.",
    requirements: [
      "Strong knowledge of Node.js, Express, or Nest.js",
      "Experience with SQL and NoSQL databases",
      "Understanding of microservices architecture",
    ],
    responsibilities: [
      "Design APIs and backend logic",
      "Collaborate with frontend developers",
      "Optimize backend performance",
    ],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    experience: "4–6 years",
    location: "Remote",
    summary:
      "End-to-end development of web applications using modern technologies.",
    requirements: [
      "Expertise in React, Node.js, and databases",
      "Familiarity with cloud services (AWS/GCP/Azure)",
      "Knowledge of CI/CD pipelines",
    ],
    responsibilities: [
      "Build both frontend and backend features",
      "Deploy and maintain applications",
      "Ensure security best practices",
    ],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    experience: "2–3 years",
    location: "Pune, India",
    summary:
      "Design intuitive and visually appealing web and mobile interfaces.",
    requirements: [
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Understanding of design systems",
      "Basic knowledge of frontend tech",
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Collaborate with developers",
      "Conduct user research and testing",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    experience: "3–5 years",
    location: "Chennai, India",
    summary:
      "Responsible for infrastructure, CI/CD pipelines, and deployment automation.",
    requirements: [
      "Hands-on experience with Docker & Kubernetes",
      "Knowledge of Jenkins/GitHub Actions",
      "Experience with monitoring tools",
    ],
    responsibilities: [
      "Manage CI/CD pipelines",
      "Ensure high availability and scalability",
      "Monitor infrastructure and logs",
    ],
  },
  {
    id: 6,
    title: "QA Automation Engineer",
    experience: "2–4 years",
    location: "Gurgaon, India",
    summary: "Responsible for automated testing of web and mobile apps.",
    requirements: [
      "Experience with Selenium, Cypress, or Playwright",
      "Strong knowledge of QA methodologies",
      "Good understanding of APIs",
    ],
    responsibilities: [
      "Write automated test scripts",
      "Perform regression testing",
      "Collaborate with developers for bug fixes",
    ],
  },
] as const;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easeOut } 
  },
};

export default function Careers() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Banner */}
      <motion.div
        className="relative w-full h-[350px] md:h-[420px] overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src="/images/career/career_bnr.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="mx-auto px-4 py-16 text-center z-10 relative">
          <TextGifHeadingOne fontSize="6rem">Career</TextGifHeadingOne>
        </div>
      </motion.div>

      {/* Job Openings Section */}
      <section className="w-full max-w-4xl mx-auto py-10 px-4" aria-labelledby="jobs-heading">
        <motion.h2
          id="jobs-heading"
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          Job Openings
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full"
        >
          <Accordion type="single" collapsible className="w-full border-b border-gray-200 rounded-lg divide-y divide-gray-300">
            {jobs.map((job) => (
              <motion.div key={`job-${job.id}`} variants={itemVariants}>
                <AccordionItem value={`job-${job.id}`}>
                  <AccordionTrigger className="text-2xl md:text-4xl font-semibold py-8 hover:no-underline">
                    {job.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <p className="font-semibold text-gray-800 mb-2 md:mb-0">
                        <span className="font-bold text-blue-600">Experience:</span> {job.experience}
                      </p>
                      <p className="font-semibold text-gray-800">
                        <span className="font-bold text-green-600">Location:</span> {job.location}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-xl mb-3 text-gray-900">Summary</h4>
                        <p className="text-gray-700 leading-relaxed">{job.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-xl mb-3 text-gray-900">Requirements</h4>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {job.requirements.map((req, idx) => (
                            <li key={`req-${job.id}-${idx}`} className="text-gray-700">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-xl mb-3 text-gray-900">Responsibilities</h4>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {job.responsibilities.map((res, idx) => (
                            <li key={`res-${job.id}-${idx}`} className="text-gray-700">
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Apply Section */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
        >
          <Dialog>
            <DialogTrigger asChild>
              <InteractiveHoverButton>Apply Now</InteractiveHoverButton>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Apply for a Job</DialogTitle>
              </DialogHeader>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Job Role *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select job role" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.title}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="resume" className="text-sm font-medium">
                    Resume *
                  </Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="coverLetter" className="text-sm font-medium">
                    Cover Letter
                  </Label>
                  <textarea
                    id="coverLetter"
                    rows={4}
                    className="w-full mt-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>
                <GradientButton type="submit" className="w-full md:w-fit mx-auto">
                  Submit Application
                </GradientButton>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </section>
    </div>
  );
}
