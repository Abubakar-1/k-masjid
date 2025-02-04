"use client";

import { AdminProtection } from "@/components/AdminProtecton";
import { getDonationCampaigns } from "./actions";
import { DonationCampaignForm } from "./donation-campaigns-form";
import { DonationCampaignList } from "./donation-campaigns-list";

export default async function DonationCampaignsPage() {
  const getCampaigns = async () => {
    return await getDonationCampaigns();
  };

  const initialCampaigns = await getCampaigns();

  return (
    <AdminProtection>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Manage Donation Campaigns</h2>
        <DonationCampaignForm />
        <h1>Donation Campaigns</h1>
        <DonationCampaignList initialCampaigns={initialCampaigns} />
      </div>
    </AdminProtection>
  );
}
