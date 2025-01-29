"use server";

import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import type { PrayerTimes } from "@/types/prayer-times";

const PRAYER_TIMES_DOC_ID = "fixed_prayer_times";

export async function updatePrayerTimes(data: PrayerTimes) {
  try {
    await setDoc(doc(db, "prayerTimes", PRAYER_TIMES_DOC_ID), data);
    revalidatePath("/admin/prayer-times");
    return { success: true };
  } catch (error) {
    console.error("Error updating prayer times:", error);
    return { success: false, error: "Failed to update prayer times" };
  }
}

export async function getPrayerTimes(): Promise<PrayerTimes | null> {
  try {
    const docRef = doc(db, "prayerTimes", PRAYER_TIMES_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PrayerTimes;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
}
