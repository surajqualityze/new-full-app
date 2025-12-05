import { NextResponse } from "next/server";
import { servicesData } from "@/data/services";

// Named export for GET method
export async function GET(request: Request) {
  try {
    // Get all services as an array
    const services = Object.values(servicesData);

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}

// Optional: Add other HTTP methods if needed
export async function POST(request: Request) {
  return NextResponse.json(
    { error: "Method not implemented" },
    { status: 501 }
  );
}