"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import "./index.css";
import Image from "next/image";
import PrayerSchedule from "@/components/PrayerSchedule";
// import DonationCards from "@/components/DonationCards";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicHijriDate = dynamic(() => import("@/components/HijriDate"), {
  ssr: false,
});
const DynamicMobileMenu = dynamic(() => import("@/components/MobileMenu"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative bg-pattern bg-cover min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FEF5ED] to-[#EE9A49] opacity-30"></div>

      <div className="relative z-10">
        <nav className="flex justify-between items-center p-4 md:p-5">
          <div className="logo">
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
          <DynamicMobileMenu />
        </nav>

        <div className="text-center mt-2">
          <Suspense fallback={<div>Loading date...</div>}>
            <DynamicHijriDate />
          </Suspense>
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
          {/* <DonationCards /> */}
        </div>
      </div>
    </div>
  );
}
