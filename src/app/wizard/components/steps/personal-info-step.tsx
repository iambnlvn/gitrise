import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Building, Globe } from "lucide-react";
import { useWizardStore } from "@/store/wizard-store";

export function PersonalInfoStep() {
  const { data, updateField } = useWizardStore();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="David Martinez"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            value={data.username}
            onChange={(e) => updateField("username", e.target.value)}
            placeholder="shadowrunner"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => updateField("bio", e.target.value)}
          placeholder="Tell us about yourself..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">
            <MapPin className="mr-1 inline size-4" />
            Location
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="Night City, NY"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">
            <Building className="mr-1 inline size-4" />
            Company
          </Label>
          <Input
            id="company"
            value={data.company}
            onChange={(e) => updateField("company", e.target.value)}
            placeholder="Evil corp"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">
          <Globe className="mr-1 inline size-4" />
          Website
        </Label>
        <Input
          id="website"
          value={data.website}
          onChange={(e) => updateField("website", e.target.value)}
          placeholder="https://johndoe.dev"
        />
      </div>
    </div>
  );
}
