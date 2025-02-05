"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPrayerTimes } from "./actions";
import type { PrayerTimes, PrayerTime } from "@/types/prayer-times";

export async function PrayerTimeList() {
  const prayerTimes = await getPrayerTimes();

  if (!prayerTimes) {
    return <div>No prayer times set yet.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prayer</TableHead>
          <TableHead>Adhan</TableHead>
          <TableHead>Iqamah</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(Object.entries(prayerTimes) as [keyof PrayerTimes, PrayerTime][]).map(
          ([key, prayer]) => (
            <TableRow key={key}>
              <TableCell>{prayer.name}</TableCell>
              <TableCell>{prayer.adhan}</TableCell>
              <TableCell>{prayer.iqamah}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
