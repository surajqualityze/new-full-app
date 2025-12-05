// components/services/ServiceOverviewSection.tsx

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ServiceFormData } from "@/types/service";
import { slugify } from "@/utils/serviceFormHelpers";

interface ServiceOverviewSectionProps {
  service: ServiceFormData;
  setService: React.Dispatch<React.SetStateAction<ServiceFormData>>;
  slugManuallyEdited: boolean;
  setSlugManuallyEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ServiceOverviewSection({
  service,
  setService,
  slugManuallyEdited,
  setSlugManuallyEdited,
}: ServiceOverviewSectionProps) {
  const handleChange = (field: keyof ServiceFormData, value: string) => {
    setService((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Service Overview</CardTitle>
        <CardDescription>
          Basic information about your service
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Service Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="e.g., Web Development"
            value={service.name}
            onChange={(e) => {
              const name = e.target.value;
              handleChange("name", name);
              if (!slugManuallyEdited) {
                handleChange("slug", slugify(name));
              }
            }}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm font-medium">
            Slug <span className="text-destructive">*</span>
          </Label>
          <Input
            id="slug"
            placeholder="web-development"
            value={service.slug}
            onChange={(e) => {
              handleChange("slug", e.target.value);
              setSlugManuallyEdited(true);
            }}
            required
            className="h-11 font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            URL-friendly version of the name
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Page Title
          </Label>
          <Input
            id="title"
            placeholder="Professional Web Development Services"
            value={service.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle" className="text-sm font-medium">
            Subtitle
          </Label>
          <Textarea
            id="subtitle"
            placeholder="Transform your ideas into powerful digital experiences"
            value={service.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}