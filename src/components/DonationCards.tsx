"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CampaignModal } from "./CampaignModal";
import { getDonationCampaigns } from "@/app/actions";
import type { DonationCampaign } from "@/types/donation";

export default function DonationCards() {
  const [donations, setDonations] = useState<DonationCampaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] =
    useState<DonationCampaign | null>(null);

  useEffect(() => {
    async function fetchDonations() {
      const campaigns = await getDonationCampaigns();
      setDonations(campaigns);
    }
    fetchDonations();

    const interval = setInterval(fetchDonations, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
        DONATION CAMPAIGNS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {donations.map((donation) => (
          <Card
            key={donation.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => setSelectedCampaign(donation)}
          >
            <div className="relative h-40 sm:h-48">
              <Image
                src={"/logo.png"}
                alt={donation.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">
                {donation.title}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs sm:text-sm text-gray-600">
                  {donation.organization}
                </span>
                {donation.isVerified && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 text-xs px-1 py-0.5"
                  >
                    ✓
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <Progress
                value={(donation.collected / donation.target) * 100}
                className="h-2"
              />
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium">Terkumpul</p>
                <p className="text-xs sm:text-sm">
                  {formatCurrency(donation.collected)} dari target{" "}
                  {formatCurrency(donation.target)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {donation.daysLeft} hari lagi
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CampaignModal
        campaign={selectedCampaign}
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </div>
  );
}
