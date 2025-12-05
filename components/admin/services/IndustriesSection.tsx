// components/services/IndustriesSection.tsx

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Building2 } from "lucide-react";
import { ServiceFormData } from "@/types/service";
import { createBlankIndustry } from "@/utils/serviceFormHelpers";

interface IndustriesSectionProps {
  service: ServiceFormData;
  setService: React.Dispatch<React.SetStateAction<ServiceFormData>>;
}

export default function IndustriesSection({
  service,
  setService,
}: IndustriesSectionProps) {
  const addIndustry = () => {
    setService((prev) => ({
      ...prev,
      industries: [...prev.industries, createBlankIndustry()],
    }));
  };

  const handleIndustryChange = (idx: number, field: "name" | "detail", value: string) => {
    const industries = [...service.industries];
    industries[idx][field] = value;
    setService((prev) => ({ ...prev, industries }));
  };

  const removeIndustry = (idx: number) => {
    setService((prev) => ({
      ...prev,
      industries: prev.industries.filter((_, i) => i !== idx),
    }));
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Industries
            </CardTitle>
            <CardDescription>
              Specify which industries this service caters to
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addIndustry}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Industry
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {service.industries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="mb-2">No industries added yet</p>
            <p className="text-sm">Click "Add Industry" to specify target industries</p>
          </div>
        ) : (
          <div className="space-y-3">
            {service.industries.map((ind, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-4 rounded-lg border-2 bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0 mt-1">
                  {idx + 1}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Industry Name
                    </Label>
                    <Input
                      placeholder="e.g., Healthcare"
                      value={ind.name}
                      onChange={(e) =>
                        handleIndustryChange(idx, "name", e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Details
                    </Label>
                    <Input
                      placeholder="Custom solutions for healthcare providers"
                      value={ind.detail}
                      onChange={(e) =>
                        handleIndustryChange(idx, "detail", e.target.value)
                      }
                      className="h-10"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIndustry(idx)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}