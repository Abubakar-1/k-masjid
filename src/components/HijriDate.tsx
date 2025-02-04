"use client";

import { useState, useEffect } from "react";
import moment from "moment-hijri";

export default function HijriDate() {
  const [hijriDate, setHijriDate] = useState({ month: "", year: "", day: "" });

  useEffect(() => {
    const currentHijriMonth = moment().iMonth();
    const currentHijriYear = moment().iYear();
    const currentHijriDay = moment().iDate();

    const hijriMonthNames = [
      "Muharram",
      "Safar",
      "Rabi' al-awwal",
      "Rabi' al-thani",
      "Jumada al-awwal",
      "Jumada al-thani",
      "Rajab",
      "Sha'ban",
      "Ramadhan",
      "Shawwal",
      "Dhu al-Qi'dah",
      "Dhu al-Hijjah",
    ];

    setHijriDate({
      month: hijriMonthNames[currentHijriMonth],
      year: currentHijriYear.toString(),
      day: currentHijriDay.toString(),
    });
  }, []);

  return (
    <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold">
      {hijriDate.day} {hijriDate.month} {hijriDate.year} H
    </h1>
  );
}
