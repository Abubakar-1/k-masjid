/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
// import { usePaystackPayment } from "react-paystack";
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

  const config: any = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };
  console.log(config);

  // const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    try {
      setIsLoading(true); // Start the loading state

      // initializePayment({
      //   onSuccess: (response: any) => {
      //     // Payment successful
      //     setIsLoading(false);
      //     console.log(response);
      //     onSuccess(response.reference);
      //   },
      //   onClose: () => {
      //     // Payment modal closed
      //     setIsLoading(false);
      //     onClose();
      //   },
      // });
    } catch (error) {
      console.error("Error during payment initialization:", error);
      setIsLoading(false); // Ensure loading state is reset in case of error
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading || amount <= 0 || !email}
    >
      {isLoading ? "Processing..." : "Donate Now"}
    </Button>
  );
}
