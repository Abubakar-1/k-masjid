"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Kajian", href: "/kajian" },
    { name: "Fasilitas", href: "/fasilitas" },
    { name: "Berita", href: "/berita" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[#FFF6ED]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Masjid Ibnu Sina Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold">Masjid Ibnu Sina</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-[#F4A261] text-white hover:bg-[#E76F51]">
            Donasi
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-[#FFF6ED]">
              <div className="mt-6 flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="bg-[#F4A261] text-white hover:bg-[#E76F51]">
                  Donasi
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
