// components/services/SubservicesSection.tsx

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Upload, GripVertical } from "lucide-react";
import { ServiceFormData } from "@/types/service";
import { createBlankSubservice, slugify } from "@/utils/serviceFormHelpers";
import RichTextEditor from "../blogs/RichTextEditor";
// import { RichTextEditor } from "@/components/rich-text-editor";

interface SubservicesSectionProps {
  service: ServiceFormData;
  setService: React.Dispatch<React.SetStateAction<ServiceFormData>>;
  subSlugEdited: Record<number, boolean>;
  setSubSlugEdited: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}

export default function SubservicesSection({
  service,
  setService,
  subSlugEdited,
  setSubSlugEdited,
}: SubservicesSectionProps) {
  const addSubservice = () => {
    setService((prev) => ({
      ...prev,
      subservices: [...prev.subservices, createBlankSubservice()],
    }));
  };

  const handleSubChange = (idx: number, field: keyof typeof service.subservices[0], value: string | File | null) => {
    const subservices = [...service.subservices];
    (subservices[idx] as any)[field] = value;

    if (field === "name" && !subSlugEdited[idx]) {
      subservices[idx].slug = slugify(value as string);
    }

    setService((prev) => ({ ...prev, subservices }));

    if (field === "slug") {
      setSubSlugEdited((prev) => ({ ...prev, [idx]: true }));
    }
  };

  const handleSubFileInput = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleSubChange(idx, "image", file);
  };

  const removeSub = (idx: number) => {
    setService((prev) => ({
      ...prev,
      subservices: prev.subservices.filter((_, i) => i !== idx),
    }));
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sub-services</CardTitle>
            <CardDescription>
              Add detailed sub-services for this service
            </CardDescription>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addSubservice}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Sub-service
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {service.subservices.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
            <p className="mb-2">No sub-services yet</p>
            <p className="text-sm">Click "Add Sub-service" to get started</p>
          </div>
        ) : (
          service.subservices.map((sub, idx) => (
            <Card
              key={idx}
              className="bg-gradient-to-br from-muted/30 to-muted/10 border-2"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                    <div>
                      <CardTitle className="text-base">
                        Sub-service {idx + 1}
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {sub.name || "Untitled"}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSub(idx)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      placeholder="e.g., E-commerce Development"
                      value={sub.name}
                      onChange={(e) => handleSubChange(idx, "name", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Slug <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      placeholder="e-commerce-development"
                      value={sub.slug}
                      onChange={(e) => handleSubChange(idx, "slug", e.target.value)}
                      required
                      className="h-11 font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Description</Label>
                  <Textarea
                    placeholder="Brief description of this sub-service..."
                    value={sub.description}
                    onChange={(e) => handleSubChange(idx, "description", e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Key Points</Label>
                  <Textarea
                    placeholder="• Point 1&#10;• Point 2&#10;• Point 3"
                    value={sub.keyPoints}
                    onChange={(e) => handleSubChange(idx, "keyPoints", e.target.value)}
                    rows={4}
                    className="resize-none font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    One key point per line
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Image</Label>
                    <label
                      htmlFor={`sub-image-${idx}`}
                      className="flex items-center justify-center gap-2 h-11 px-4 rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {sub.image instanceof File
                          ? sub.image.name
                          : "Choose image"}
                      </span>
                      <Input
                        id={`sub-image-${idx}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSubFileInput(idx, e)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Image Alt Text</Label>
                    <Input
                      placeholder="Descriptive alt text"
                      value={sub.imageAlt}
                      onChange={(e) => handleSubChange(idx, "imageAlt", e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Full Details</Label>
                  <div className="border-2 rounded-md">
                    <RichTextEditor 
                      content={sub.details}
                      onChange={(val) => handleSubChange(idx, "details", val)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}