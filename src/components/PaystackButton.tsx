/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PaystackButtonProps {
  amount: number;
  email: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export function PaystackButton({
  amount,
  email,
  onSuccess,
  onClose,
}: PaystackButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [PaystackButton, setPaystackButton] = useState<any>(null);

  useEffect(() => {
    import("react-paystack").then((mod) => {
      setPaystackButton(() => mod.usePaystackPayment);
    });
  }, []);

  const handlePayment = () => {
    if (!PaystackButton) return;

    try {
      setIsLoading(true);

      const config = {
        reference: new Date().getTime().toString(),
        email: email,
        amount: amount * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      };

      const initializePayment = PaystackButton(config);

      initializePayment({
        onSuccess: (response: any) => {
          setIsLoading(false);
          console.log(response, "soks respomse");
          onSuccess(response.reference);
        },
        onClose: () => {
          setIsLoading(false);
          onClose();
        },
      });
    } catch (error) {
      console.error("Error during payment initialization:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading || amount <= 0 || !email || !PaystackButton}
    >
      {isLoading ? "Processing..." : "Donate Now"}
    </Button>
  );
}
