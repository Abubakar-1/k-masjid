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
import type { DonationCampaign } from "@/types/donation";
import { ConfirmationDialog } from "@/components/confirmation-dialog";

export function DonationCampaignList({
  initialCampaigns,
}: {
  initialCampaigns: any;
}) {
  const [donationCampaigns, setDonationCampaigns] = useState(initialCampaigns);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setDonationCampaigns(initialCampaigns);
  }, [initialCampaigns]);

  const handleDeleteClick = (id: string) => {
    setCampaignToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (campaignToDelete) {
      const result = await deleteDonationCampaign(campaignToDelete);
      if (result.success) {
        // alert("Campaign deleted successfully");
        router.refresh();
      } else {
        console.error("Failed to delete campaign:", result.error);
        // alert(`Failed to delete campaign. ${result.error}`);
      }
    }
    setIsConfirmOpen(false);
    setCampaignToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setCampaignToDelete(null);
  };

  return (
    <>
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
                  onClick={() => handleDeleteClick(campaign.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Campaign"
        description="Are you sure you want to delete this campaign? This action cannot be undone."
      />
    </>
  );
}
