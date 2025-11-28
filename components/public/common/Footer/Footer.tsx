"use client";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { GradientButton } from "../my-button/GradientButton";
import { AnimatedLink } from "../animated-text/AnimatedLink";

// Social Icons Array
const socialIcons = [
    {
        name: "Facebook",
        src: "images/socials/fb.svg",
        alt: "Facebook",
        href: "https://facebook.com/saasential"
    },
    {
        name: "Instagram", 
        src: "images/socials/insta.svg",
        alt: "Instagram",
        href: "https://instagram.com/saasential"
    },
    {
        name: "LinkedIn",
        src: "images/socials/linkedin.svg", 
        alt: "LinkedIn",
        href: "https://linkedin.com/company/saasential"
    },
    {
        name: "WhatsApp",
        src: "images/socials/whatsapp.svg",
        alt: "WhatsApp", 
        href: "https://wa.me/1234567890"
    },
    {
        name: "X (Twitter)",
        src: "images/socials/x.svg",
        alt: "X (Twitter)",
        href: "https://x.com/saasential"
    }
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#f8f9fa] text-[#333] px-4 sm:px-6 md:px-10 py-8 md:py-12 text-sm font-normal">
            {/* Top Grid - Responsive layout */}
            <div className="saas-container grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">

                {/* Column 1: Logo + Description */}
                <div className="flex flex-col text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start space-x-3 h-12 mb-4 lg:mb-6">
                        <Image
                            src="/images/logo/Saas_Logo_blk.png"
                            alt="Saasential Logo"
                            width={190}
                            height={100}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
                        Saasential is your trusted partner in business growth, offering comprehensive corporate training solutions, cutting-edge digital marketing services, and expert software sales support.
                    </p>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="grid grid-cols-2 gap-4 lg:gap-8 text-center lg:text-left">
                    {/* Industries */}
                    <div className="flex flex-col">
                        <h4 className="text-saas-primary font-semibold text-sm lg:text-base h-8 lg:h-12 flex items-center justify-center lg:justify-start mb-2 lg:mb-4">
                            Industries
                        </h4>
                        <ul className="space-y-1 lg:space-y-3 text-gray-700 text-xs lg:text-sm leading-relaxed">
                            <li><AnimatedLink text="Healthcare" /></li>
                            <li><AnimatedLink text="Banking & Financial" /></li>
                            <li><AnimatedLink text="Retail & eCommerce" /></li>
                            <li><AnimatedLink text="Public Sector" /></li>
                            <li><AnimatedLink text="IT Companies" /></li>
                            <li><AnimatedLink text="Video Marketing" /></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col">
                        <h4 className="text-saas-primary font-semibold text-sm lg:text-base h-8 lg:h-12 flex items-center justify-center lg:justify-start mb-2 lg:mb-4">
                            Company
                        </h4>
                        <ul className="space-y-1 lg:space-y-3 text-gray-700 text-xs lg:text-sm leading-relaxed">
                            <li><AnimatedLink text="Training" /></li>
                            <li><AnimatedLink text="Service" /></li>
                            <li><AnimatedLink text="Products" /></li>
                            <li><AnimatedLink text="Works" /></li>
                            <li><AnimatedLink text="Blog" /></li>
                            <li><AnimatedLink text="Contact Us" /></li>
                        </ul>
                    </div>
                </div>

                {/* Column 3: Newsletter + Social */}
                <div className="flex flex-col text-center lg:text-left">
                    <h4 className="text-saas-primary font-semibold text-sm lg:text-base h-8 lg:h-12 flex items-center justify-center lg:justify-start mb-2 lg:mb-4">
                        Join a Newsletter
                    </h4>
                    
                    <label htmlFor="newsletter-email" className="text-gray-700 text-xs lg:text-sm mb-2 lg:mb-3 block">
                        Your Email
                    </label>
                    
                    {/* Newsletter Form */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                        <input
                            id="newsletter-email"
                            type="email"
                            placeholder="Enter Your Email"
                            className="flex-1 px-3 lg:px-4 py-2 lg:py-3 border border-saas-primary text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-saas-primary/50 transition-all duration-300 text-xs lg:text-sm"
                        />
                        <GradientButton
                            className=""
                        >
                            Subscribe
                        </GradientButton>
                    </div>
                    
                    {/* Social Icons */}
                    <div className="flex gap-3 lg:gap-5 justify-center lg:justify-start">
                        {socialIcons.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group transition-transform duration-200 hover:scale-110"
                                aria-label={social.name}
                            >
                                <Image
                                    src={social.src}
                                    alt={social.alt}
                                    width={32}
                                    height={32}
                                    className="lg:w-10 lg:h-10 object-contain group-hover:drop-shadow-[0_6px_12px_rgba(6,189,255,0.4)] transition-all duration-200"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-blue-200 my-6 lg:my-10" />

            {/* Bottom Row - Contact Info */}
            <div className="saas-container flex flex-col lg:flex-row items-center justify-between text-gray-700 space-y-3 lg:space-y-0 text-center lg:text-left">
                <div className="text-xs lg:text-sm">
                    <AnimatedLink text="© 2025 | Saasential. All rights reserved." />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-8">
                    <a 
                        href="mailto:hello@saasential.com"
                        className="flex items-center gap-2 transition-all duration-300 hover:scale-105 text-xs lg:text-sm"
                    >
                        <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-saas-primary" />
                        <AnimatedLink text="hello@saasential.com" />
                    </a>
                    
                    <a 
                        href="tel:+1000000000"
                        className="flex items-center gap-2 transition-all duration-300 hover:scale-105 text-xs lg:text-sm"
                    >
                        <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-saas-primary" />
                        <AnimatedLink text="+1 000-000-0000" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
