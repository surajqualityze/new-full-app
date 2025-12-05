// actions/serviceActions.ts
"use server";

import { Service, ServiceFormData } from "@/types/service";

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function fetchServiceBySlug(slug: string): Promise<Service> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
      {
        cache: "no-store",
      }
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch service");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}

export async function deleteService(slug: string): Promise<void> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
      {
        method: "DELETE",
      }
    );
    
    if (!res.ok) {
      throw new Error("Failed to delete service");
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}

export async function createService(formData: FormData): Promise<Service> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to create service");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

export async function updateService(
  slug: string,
  formData: FormData
): Promise<Service> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to update service");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}