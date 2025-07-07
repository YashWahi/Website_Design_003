"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, Search, User, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { state } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-2xl font-light tracking-[0.2em] nav-brand ${scrollY > 50 ? "text-black" : "text-white"}`}
          >
            VANITY
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {[
              { name: "WOMEN", href: "/women" },
              { name: "MEN", href: "/men" },
              { name: "ACCESSORIES", href: "/accessories" },
              { name: "NEW IN", href: "/new-in" },
              { name: "SALE", href: "/sale" },
            ].map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-light transition-all duration-200 tracking-wide nav-link relative group hover:scale-105 ${
                  scrollY > 50 ? "text-gray-700 hover:text-black" : "text-white/90 hover:text-white"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${
                    scrollY > 50 ? "bg-black" : "bg-white"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={`transition-all duration-200 nav-icon hover:scale-110 ${
                scrollY > 50 ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/20 text-white"
              }`}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link href="/auth">
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 nav-icon hover:scale-110 ${
                  scrollY > 50 ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/20 text-white"
                }`}
              >
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 nav-icon hover:scale-110 ${
                  scrollY > 50 ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/20 text-white"
                }`}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className={`transition-all duration-200 relative nav-icon hover:scale-110 ${
                  scrollY > 50 ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/20 text-white"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[10px] animate-bounce">
                    {state.totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${scrollY > 50 ? "text-gray-700" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden mobile-menu">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-lg font-light tracking-wide">
            {[
              { name: "WOMEN", href: "/women" },
              { name: "MEN", href: "/men" },
              { name: "ACCESSORIES", href: "/accessories" },
              { name: "NEW IN", href: "/new-in" },
              { name: "SALE", href: "/sale" },
            ].map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-gray-600 transition-colors duration-200 mobile-link"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
