import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export interface PrayerTimes {
  fajr: { adhan: string; iqamah: string };
  dhuhr: { adhan: string; iqamah: string };
  asr: { adhan: string; iqamah: string };
  maghrib: { adhan: string; iqamah: string };
  isha: { adhan: string; iqamah: string };
}

export async function getPrayerTimes(): Promise<PrayerTimes | null> {
  try {
    const docRef = doc(db, "prayerTimes", "fixed_prayer_times");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PrayerTimes;
    } else {
      console.log("No prayer times found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
}
