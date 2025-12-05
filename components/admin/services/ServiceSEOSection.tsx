// components/services/ServiceSEOSection.tsx

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ServiceFormData } from "@/types/service";
import { Upload } from "lucide-react";

interface ServiceSEOSectionProps {
  service: ServiceFormData;
  setService: React.Dispatch<React.SetStateAction<ServiceFormData>>;
}

export default function ServiceSEOSection({
  service,
  setService,
}: ServiceSEOSectionProps) {
  const handleOGFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setService((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        openGraph: { ...prev.seo.openGraph, image: file },
      },
    }));
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>SEO & Open Graph</CardTitle>
        <CardDescription>
          Optimize your service for search engines and social sharing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seoTitle" className="text-sm font-medium">
            SEO Title
          </Label>
          <Input
            id="seoTitle"
            placeholder="Web Development Services | Your Company"
            value={service.seo.title}
            onChange={(e) =>
              setService((prev) => ({
                ...prev,
                seo: { ...prev.seo, title: e.target.value },
              }))
            }
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seoDescription" className="text-sm font-medium">
            SEO Description
          </Label>
          <Textarea
            id="seoDescription"
            placeholder="Professional web development services to help your business grow online..."
            value={service.seo.description}
            onChange={(e) =>
              setService((prev) => ({
                ...prev,
                seo: { ...prev.seo, description: e.target.value },
              }))
            }
            rows={3}
            className="resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seoKeywords" className="text-sm font-medium">
            Keywords
          </Label>
          <Input
            id="seoKeywords"
            placeholder="web development, custom websites, responsive design"
            value={service.seo.keywords}
            onChange={(e) =>
              setService((prev) => ({
                ...prev,
                seo: { ...prev.seo, keywords: e.target.value },
              }))
            }
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated keywords
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Open Graph</h4>
          
          <div className="space-y-2">
            <Label htmlFor="ogTitle" className="text-sm font-medium">
              OG Title
            </Label>
            <Input
              id="ogTitle"
              placeholder="Web Development Services"
              value={service.seo.openGraph.title}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    openGraph: { ...prev.seo.openGraph, title: e.target.value },
                  },
                }))
              }
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogDescription" className="text-sm font-medium">
              OG Description
            </Label>
            <Textarea
              id="ogDescription"
              placeholder="Build modern, scalable web applications..."
              value={service.seo.openGraph.description}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    openGraph: {
                      ...prev.seo.openGraph,
                      description: e.target.value,
                    },
                  },
                }))
              }
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogImage" className="text-sm font-medium">
              OG Image
            </Label>
            <div className="flex items-center gap-2">
              <label
                htmlFor="ogImage"
                className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {service.seo.openGraph.image instanceof File
                    ? service.seo.openGraph.image.name
                    : "Choose image"}
                </span>
                <Input
                  id="ogImage"
                  type="file"
                  accept="image/*"
                  onChange={handleOGFileInput}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogUrl" className="text-sm font-medium">
              OG URL
            </Label>
            <Input
              id="ogUrl"
              placeholder="https://yoursite.com/services/web-development"
              value={service.seo.openGraph.url}
              onChange={(e) =>
                setService((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    openGraph: { ...prev.seo.openGraph, url: e.target.value },
                  },
                }))
              }
              className="h-11"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}