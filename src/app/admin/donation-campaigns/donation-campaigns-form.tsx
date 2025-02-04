"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import { useState } from "react";
import { createDonationCampaign } from "../donation-campaigns/actions";

const initialCampaignState = {
  title: "",
  organization: "",
  isVerified: false,
  target: 0,
  daysLeft: 0,
  imageUrl: "no image",
};

export function DonationCampaignForm() {
  const [campaign, setCampaign] = useState(initialCampaignState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createDonationCampaign(campaign);
    if (result.success) {
      // alert("Campaign created successfully!");
      setCampaign(initialCampaignState);
    } else {
      console.error("Failed to create campaign:", result.error);
      // alert("Failed to create campaign.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={campaign.title}
          onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="organization">Organization</Label>
        <Input
          type="text"
          id="organization"
          value={campaign.organization}
          onChange={(e) =>
            setCampaign({ ...campaign, organization: e.target.value })
          }
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isVerified"
          checked={campaign.isVerified}
          onCheckedChange={(checked) =>
            setCampaign({ ...campaign, isVerified: checked as boolean })
          }
        />
        <Label htmlFor="isVerified">Verified</Label>
      </div>
      <div>
        <Label htmlFor="target">Target</Label>
        <Input
          id="target"
          type="number"
          value={campaign.target}
          onChange={(e) =>
            setCampaign({ ...campaign, target: Number(e.target.value) })
          }
        />
      </div>
      <div>
        <Label htmlFor="daysLeft">Days Left</Label>
        <Input
          id="daysLeft"
          type="number"
          value={campaign.daysLeft}
          onChange={(e) =>
            setCampaign({ ...campaign, daysLeft: Number(e.target.value) })
          }
        />
      </div>

      <Button type="submit">Create Donation Campaign</Button>
    </form>
  );
}
