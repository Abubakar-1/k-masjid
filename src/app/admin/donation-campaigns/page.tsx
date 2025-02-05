/* eslint-disable @next/next/no-async-client-component */
"use client";

import { AdminProtection } from "@/components/AdminProtecton";
import { DonationCampaignForm } from "./donation-campaigns-form";
import { DonationCampaignList } from "./donation-campaigns-list";
import { getDonationCampaigns } from "./actions";

export default async function DonationCampaignsPage() {
  const initialCampaigns = await getDonationCampaigns();

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
