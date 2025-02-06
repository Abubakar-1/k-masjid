/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePrayerTimes, getPrayerTimes } from "./actions";
import type { PrayerTimes } from "@/types/prayer-times";

const defaultPrayerTimes: PrayerTimes = {
  fajr: { id: "fajr", name: "Fajr", adhan: "", iqamah: "" },
  dhuhr: { id: "dhuhr", name: "Dhuhr", adhan: "", iqamah: "" },
  asr: { id: "asr", name: "Asr", adhan: "", iqamah: "" },
  maghrib: { id: "maghrib", name: "Maghrib", adhan: "", iqamah: "" },
  isha: { id: "isha", name: "Isha", adhan: "", iqamah: "" },
};

export function PrayerTimeForm() {
  const [prayerTimes, setPrayerTimes] =
    useState<PrayerTimes>(defaultPrayerTimes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const times = await getPrayerTimes();
      if (times) {
        setPrayerTimes(times);
      }
      setIsLoading(false);
    };
    fetchPrayerTimes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePrayerTimes(prayerTimes);
    try {
      await updatePrayerTimes(prayerTimes);
      alert("Paryer time updated");
    } catch (error: any) {
      console.log(error);
      alert("Couldnt update prayer time");
    }
  };

  const handleInputChange = (
    prayer: keyof PrayerTimes,
    type: "adhan" | "iqamah",
    value: string
  ) => {
    setPrayerTimes((prev) => ({
      ...prev,
      [prayer]: { ...prev[prayer], [type]: value },
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.entries(prayerTimes).map(([key, prayer]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle>{prayer.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${key}-adhan`}>Adhan</Label>
              <Input
                type="time"
                id={`${key}-adhan`}
                value={prayer.adhan}
                onChange={(e) =>
                  handleInputChange(
                    key as keyof PrayerTimes,
                    "adhan",
                    e.target.value
                  )
                }
                required
              />
            </div>
            <div>
              <Label htmlFor={`${key}-iqamah`}>Iqamah</Label>
              <Input
                type="time"
                id={`${key}-iqamah`}
                value={prayer.iqamah}
                onChange={(e) =>
                  handleInputChange(
                    key as keyof PrayerTimes,
                    "iqamah",
                    e.target.value
                  )
                }
                required
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button type="submit">Update Prayer Times</Button>
    </form>
  );
}
