"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { Timestamp } from "firebase/firestore";

export async function createDonationCampaign(data: {
  title: string;
  organization: string;
  isVerified: boolean;
  target: number;
  daysLeft: number;
  imageUrl: string;
}) {
  try {
    await addDoc(collection(db, "donationCampaigns"), {
      ...data,
      collected: 0,
      createdAt: new Date(),
    });
    revalidatePath("/admin/donation-campaigns");
    return { success: true };
  } catch (error) {
    console.error("Error creating donation campaign:", error);
    return { success: false, error: "Failed to create donation campaign" };
  }
}

export async function getDonationCampaigns(): Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { id: string; [key: string]: any }[]
> {
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
      };
    });
    return campaigns;
  } catch (error) {
    console.error("Error fetching donation campaigns:", error);
    return [];
  }
}

export async function deleteDonationCampaign(campaignId: string) {
  try {
    await deleteDoc(doc(db, "donationCampaigns", campaignId));
    revalidatePath("/admin/donation-campaigns");
    return { success: true };
  } catch (error) {
    console.error("Error deleting donation campaign:", error);
    return { success: false, error: "Failed to delete donation campaign" };
  }
}
