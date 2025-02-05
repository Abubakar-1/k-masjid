"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const PaystackButton = dynamic(
  () => import("./PaystackButton").then((mod) => mod.PaystackButton),
  {
    ssr: false,
    loading: () => <Button disabled>Loading...</Button>,
  }
);

interface ClientOnlyPaystackButtonProps {
  amount: number;
  email: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export function ClientOnlyPaystackButton(props: ClientOnlyPaystackButtonProps) {
  return <PaystackButton {...props} />;
}
