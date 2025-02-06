"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { PaystackButton } from "./PaystackButton";
import { updateDonation } from "@/app/actions";
import type { DonationCampaign } from "@/types/donation";
import { useToast } from "@/components/ui/toast-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CampaignModalProps {
  campaign: DonationCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignModal({
  campaign,
  isOpen,
  onClose,
}: CampaignModalProps) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const { addToast } = useToast();
  const router = useRouter();

  if (!campaign) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const handlePaymentSuccess = async (reference: string) => {
    const result = await updateDonation(campaign.id, reference, Number(amount));
    if (result.success) {
      addToast({
        title: "Payment Successful",
        description: "Your donation has been processed and verified.",
        variant: "default",
      });
      router.refresh();
    } else {
      addToast({
        title: "Payment Failed",
        description:
          result.error || "There was an error processing your donation.",
        variant: "destructive",
      });
    }
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="-z-10">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:max-w-[425px]"
          >
            <DialogHeader>
              <DialogTitle>{campaign.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="relative h-48 w-full">
                <Image
                  src={"/logo.png"}
                  alt={campaign.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <Progress
                value={(campaign.collected / campaign.target) * 100}
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                {formatCurrency(campaign.collected)} raised of{" "}
                {formatCurrency(campaign.target)} goal
              </p>
              <p className="text-sm">{campaign.daysLeft} days left</p>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Amount to donate"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <PaystackButton
                amount={Number(amount)}
                email={email}
                onSuccess={handlePaymentSuccess}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
