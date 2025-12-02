"use client";

import { useState, ChangeEvent, FormEvent, useEffectEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { ChevronDown, ChevronUp, Send, X } from "lucide-react";
import { GradientButton } from "../public/common/my-button/GradientButton";


// ---------------------
// Types
// ---------------------
interface FormDataType {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

export default function RequestDemo() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  // ---------------------
  // Handlers
  // ---------------------

  const handleInputChange = useEffectEvent(
    (field: keyof FormDataType, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Demo request sent successfully! We'll contact you soon.");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        });
        setShowForm(false);
      } else {
        toast.error(data.error || "Failed to send demo request");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    });
  };

  // ---------------------
  // Render
  // ---------------------

  return (
    <div className="w-full max-w-2xl mx-auto items-center">
      {/* --- Toggle Button --- */}
      <div className="text-center">
        <GradientButton
          onClick={toggleForm}
          variant="gradient"
          className="text-center text-black text-base font-normal leading-tight"
        >
          {showForm ? (
            <>
              <ChevronUp className="mr-2 h-5 w-5" /> Hide Request Form
            </>
          ) : (
            <>
              Request Demo
              <ChevronDown className="ml-2 h-5 w-5" />
            </>
          )}
        </GradientButton>
      </div>

      {/* --- Form Container --- */}
      <div
        className={`mt-6 transition-all duration-500 ease-in-out transform overflow-hidden ${
          showForm
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="relative pb-4">
            {/* Close Button */}
            <button
              onClick={closeForm}
              aria-label="Close form"
              className="absolute right-4 top-1 text-gray-400 hover:text-red-600 hover:bg-red-600/10 hover:rounded-full hover:scale-150 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <CardTitle className="text-2xl font-bold text-gray-900">
              Request a Demo
            </CardTitle>

            <CardDescription className="text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* --- Row 1 --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("name", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("email", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* --- Row 2 --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Enter your company"
                    value={formData.company}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("company", e.target.value)
                    }
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("phone", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* --- Message --- */}
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements…"
                  value={formData.message}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleInputChange("message", e.target.value)
                  }
                  rows={4}
                  required
                />
              </div>

              {/* --- Submit Button --- */}
              <div className="pt-4">
                <GradientButton
                  type="submit"
                  disabled={loading}
                  className="text-center text-black text-base font-normal leading-tight"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Demo Request
                    </>
                  )}
                </GradientButton>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Privacy Policy.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
