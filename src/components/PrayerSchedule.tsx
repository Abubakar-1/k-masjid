import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { getPrayerTimes, type PrayerTimes } from "@/lib/getPrayerTimes";

export default function PrayerSchedule() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

  useEffect(() => {
    async function fetchPrayerTimes() {
      const times = await getPrayerTimes();
      setPrayerTimes(times);
    }
    fetchPrayerTimes();
  }, []);

  if (!prayerTimes) {
    return <div>Loading prayer times...</div>;
  }

  return (
    <Card className="max-w-6xl mx-auto border-none rounded-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm sm:text-base">
                Kontagora Estate Masjid, Gwagwalada
              </span>
            </div>
            <span className="block text-sm sm:text-base">
              Khutbah Jumah, 12-1pm Every Friday
            </span>
            <div className="flex items-center gap-3 bg-[#EBF5ED] p-4 rounded-lg">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage
                  src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WLqzVIvEkXSU1hAgtnLEmdjzLHtHGv.png`}
                  alt="Profile"
                />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium text-sm sm:text-base">
                  Mallam Musa.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Cheif Imam, Kontagora Masjid
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-card overflow-x-auto">
            <div className="grid grid-cols-6 items-center gap-2 sm:gap-4 p-2 sm:p-4 text-xs sm:text-sm font-medium">
              <div className="col-span-1"></div>
              <div className="text-center">FAJR</div>
              <div className="text-center">DHUHR</div>
              <div className="text-center">ASR</div>
              <div className="text-center">MAGHRIB</div>
              <div className="text-center">ISHA</div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 sm:gap-4 px-2 sm:px-4 py-1 text-xs sm:text-sm">
              <div className="col-span-1 font-medium">Adhan</div>
              <div className="col-span-5 grid grid-cols-5 rounded-[10px] py-2 sm:py-4 bg-[#FEF5ED] text-center">
                <div>{prayerTimes.fajr.adhan}</div>
                <div>{prayerTimes.dhuhr.adhan}</div>
                <div>{prayerTimes.asr.adhan}</div>
                <div>{prayerTimes.maghrib.adhan}</div>
                <div>{prayerTimes.isha.adhan}</div>
              </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-2 sm:gap-4 px-2 sm:px-4 py-1 text-xs sm:text-sm">
              <div className="col-span-1 font-medium">Iqamah</div>
              <div className="col-span-5 grid grid-cols-5 rounded-[10px] py-2 sm:py-4 bg-[#FEF5ED] text-center">
                <div>{prayerTimes.fajr.iqamah}</div>
                <div>{prayerTimes.dhuhr.iqamah}</div>
                <div>{prayerTimes.asr.iqamah}</div>
                <div>{prayerTimes.maghrib.iqamah}</div>
                <div>{prayerTimes.isha.iqamah}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
