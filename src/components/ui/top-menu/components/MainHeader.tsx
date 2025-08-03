'use client'

import Image from "next/image"
import Link from "next/link"
import { SearchBar } from "../SearchBar"
import { CartButton } from "@/components/ui/top-menu/components/CartButton"
import { UserMenu } from "@/components/ui/top-menu/components/UserMenu"

export const MainHeader = () => {
  return (
    <nav className="bg-orange-300/20 border-b border-blue-400/50  ">
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/dog6zhxr8/image/upload/v1754108900/Ads/Logos/Logo_4_patitas_4_blanco_y3yuka.svg"
              alt="Papelería 4 Patitas"
              width={200}
              height={50}
              className="h-16 w-auto md:h-24"
              priority
            />
          </Link>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <CartButton />
            <UserMenu />
          </div>
        </div>

        {/* Mobile Search - Only shown on mobile */}
        <div className="md:hidden mt-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}