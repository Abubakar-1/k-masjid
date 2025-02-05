/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  Timestamp,
  runTransaction,
  doc,
} from "firebase/firestore";
import type { DonationCampaign } from "@/types/donation";
import { revalidatePath } from "next/cache";

export async function getDonationCampaigns(): Promise<DonationCampaign[]> {
  try {
    const q = query(
      collection(db, "donationCampaigns"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const campaigns = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : null;

      return {
        id: doc.id,
        ...data,
        createdAt,
      } as DonationCampaign;
    });
    return campaigns;
  } catch (error) {
    console.error("Error fetching donation campaigns:", error);
    return [];
  }
}

export async function updateDonation(
  donationId: string,
  reference: string,
  amount: number
) {
  try {
    console.log(
      `Verifying payment for reference: ${reference}, amount: ${amount}`
    );

    // Verify the payment with Paystack API
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Paystack API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Paystack API error: ${response.status} ${response.statusText}`
      );
      console.error(`Paystack API response: ${errorText}`);
      throw new Error(
        `Failed to verify payment with Paystack: ${response.statusText}`
      );
    }

    let data;
    try {
      data = await response.json();
      console.log("Parsed Paystack response:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error parsing Paystack API response:", error);
      const rawResponse = await response.text();
      console.error("Raw response:", rawResponse);
      throw new Error("Invalid response from Paystack");
    }

    if (data.status) {
      const verifiedAmount = data.data.amount / 100; // Convert from kobo to Naira

      if (verifiedAmount !== amount) {
        console.error(
          `Amount mismatch: expected ${amount}, got ${verifiedAmount}`
        );
        throw new Error("Verified amount does not match the expected amount");
      }

      const donationRef = doc(db, "donationCampaigns", donationId);

      await runTransaction(db, async (transaction) => {
        const donationDoc = await transaction.get(donationRef);

        if (!donationDoc.exists()) {
          throw new Error("Document does not exist!");
        }

        const currentData = donationDoc.data();
        const newCollected = (currentData.collected || 0) + amount;

        transaction.update(donationRef, { collected: newCollected });
      });

      console.log(`Successfully updated donation for campaign ${donationId}`);

      // Revalidate the donations page
      revalidatePath("/donations");

      return { success: true };
    } else {
      console.error("Payment verification failed:", data.message);
      throw new Error("Payment verification failed");
    }
  } catch (error) {
    console.error("Error updating donation:", error);
    return {
      success: false,
      error: (error as any).message || "Failed to update donation",
    };
  }
}
