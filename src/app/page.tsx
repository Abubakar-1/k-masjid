"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import "./index.css";
import Image from "next/image";
import PrayerSchedule from "@/components/PrayerSchedule";
import DonationCards from "@/components/DonationCards";
import { Menu, X } from "lucide-react";
import moment from "moment-hijri";
import Link from "next/link";
import { WindowSafe } from "@/components/window-safe";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <WindowSafe>
      <div className="relative bg-pattern bg-cover min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FEF5ED] to-[#EE9A49] opacity-30"></div>

        <div className="relative z-10">
          <nav className="flex justify-between items-center p-4 md:p-5">
            <div className="logo">
              {/* <Image
              src="/Logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-16 h-16 md:w-full md:h-full"
            /> */}
              <h1 className="font-bold text"> Kontagora Logo</h1>
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-5">
                <li className="cursor-pointer hover:text-primary">
                  <Link href="/">Home</Link>
                </li>
                <li className="cursor-pointer hover:text-primary">
                  <Link href="#prayer">Prayer Times</Link>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <Button>
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {isMenuOpen && (
            <div className="md:hidden bg-white p-4 absolute top-20 left-0 right-0 z-20">
              <ul className="space-y-2">
                <li className="cursor-pointer hover:text-primary">
                  <Link href="/">Home</Link>
                </li>
                <li className="cursor-pointer hover:text-primary">
                  <Link href="#prayer">Prayer Times</Link>
                </li>
              </ul>
              <Button className="mt-4 w-full">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            </div>
          )}

          <div className="text-center mt-2">
            <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold">
              {hijriDate.day} {hijriDate.month} {hijriDate.year} H
            </h1>
          </div>

          <div className="flex items-center justify-center mt-0">
            <Image
              src="/Mosque Front.png"
              alt="Mosque"
              width={520}
              height={500}
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[520px]"
            />
          </div>

          <div className="mt-8 md:mt-12 px-4 md:px-8" id="prayer">
            <PrayerSchedule />
          </div>

          <div className="mt-8 md:mt-12 px-4 md:px-8">
            <DonationCards />
          </div>
        </div>
      </div>
    </WindowSafe>
  );
}
