/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteDonationCampaign } from "../donation-campaigns/actions";
import { useRouter } from "next/navigation";
import { DonationCampaign } from "@/types/donation";

export function DonationCampaignList({ initialCampaigns }: any) {
  const [donationCampaigns, setDonationCampaigns] = useState(initialCampaigns);
  const router = useRouter();

  useEffect(() => {
    setDonationCampaigns(initialCampaigns);
  }, [initialCampaigns]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }
    const result = await deleteDonationCampaign(id);
    if (result.success) {
      alert("Campaign deleted successfully");
      router.refresh();
    } else {
      console.error("Failed to delete campaign:", result.error);
      alert(`Failed to delete campaign. ${result.error}`);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Collected</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Days Left</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donationCampaigns.map((campaign: DonationCampaign) => (
          <TableRow key={campaign.id}>
            <TableCell>{campaign.title}</TableCell>
            <TableCell>{campaign.organization}</TableCell>
            <TableCell>{campaign.isVerified ? "Yes" : "No"}</TableCell>
            <TableCell>${campaign.collected}</TableCell>
            <TableCell>${campaign.target}</TableCell>
            <TableCell>{campaign.daysLeft}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => handleDelete(campaign.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
