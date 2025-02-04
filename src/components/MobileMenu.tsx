"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
    </>
  );
}
