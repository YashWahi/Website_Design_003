"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AIChatTrigger } from "@/components/ai-chat-trigger"

const newProducts = [
  {
    id: 1,
    name: "Classic Blazer",
    price: "₹12,500",
    originalPrice: "₹15,000",
    image: "/images/product-1.jpg",
    isNew: true,
    rating: 4.8,
    colors: ["Black", "Navy", "Beige"],
    category: "Women",
    dateAdded: "2024-01-15",
  },
  {
    id: 3,
    name: "Designer Dress",
    price: "₹18,000",
    originalPrice: "₹22,000",
    image: "/images/product-3.jpg",
    isNew: true,
    rating: 4.7,
    colors: ["Black", "Red", "Navy"],
    category: "Women",
    dateAdded: "2024-01-12",
  },
  {
    id: 5,
    name: "Evening Gown",
    price: "₹25,000",
    originalPrice: "₹30,000",
    image: "/images/product-5.jpg",
    isNew: true,
    rating: 4.9,
    colors: ["Gold", "Silver", "Rose"],
    category: "Women",
    dateAdded: "2024-01-10",
  },
  {
    id: 7,
    name: "Summer Dress",
    price: "₹7,500",
    originalPrice: "₹9,500",
    image: "/images/product-7.jpg",
    isNew: true,
    rating: 4.5,
    colors: ["Floral", "Solid", "Striped"],
    category: "Women",
    dateAdded: "2024-01-08",
  },
]

export default function NewInPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-light tracking-widest mb-4">LOADING...</div>
          <div className="loading-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mt-20 bg-gradient-to-r from-black to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 mr-3 animate-float" />
              <h1 className="text-6xl font-light tracking-wide">NEW IN</h1>
              <Sparkles className="h-8 w-8 ml-3 animate-float" />
            </div>
            <p className="text-xl font-light tracking-wide">Fresh arrivals for the fashion-forward</p>
            <div className="mt-6">
              <Badge className="bg-white text-black text-sm px-4 py-2">Latest Collection • Just Dropped</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-light tracking-wide mb-6">LATEST ARRIVALS</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mb-8">
            Discover our newest pieces, carefully curated to bring you the latest in contemporary fashion. From
            statement pieces to everyday essentials, find your next favorite item.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              This Week
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Limited Edition
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Trending Now
            </Badge>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {newProducts.map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer product-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={500}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-red-500 text-white animate-pulse">NEW</Badge>
                    <Badge className="bg-black text-white text-xs">JUST IN</Badge>
                  </div>

                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* New Item Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>

                <div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-light text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Colors:</span>
                      {product.colors.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() === "white" ? "#fff" : color.toLowerCase() }}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-green-600 font-medium">
                      Added {new Date(product.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light tracking-wide mb-6">NEVER MISS A DROP</h2>
          <p className="text-lg font-light mb-8 max-w-2xl mx-auto">
            Be the first to know about our latest arrivals, exclusive collections, and special offers.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white text-black rounded-lg"
            />
            <Button className="bg-white text-black hover:bg-gray-100 px-8">NOTIFY ME</Button>
          </div>
        </div>
      </section>

      {/* AI Stylist Chat */}
      <AIChatTrigger />
    </div>
  )
}
