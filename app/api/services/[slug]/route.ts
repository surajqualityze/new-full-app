import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/data/services";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// Named export for GET method
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: "Service not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch service",
      },
      { status: 500 }
    );
  }
}