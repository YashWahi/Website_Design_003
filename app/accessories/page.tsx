"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star, SlidersHorizontal, Grid3X3, List, Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { VirtualTryOn } from "@/components/virtual-try-on"
import { AIChatTrigger } from "@/components/ai-chat-trigger"

const accessoryProducts = [
  {
    id: 9,
    name: "Leather Handbag",
    price: "₹15,000",
    originalPrice: "₹18,000",
    image: "/images/accessories.jpg",
    isNew: true,
    rating: 4.7,
    colors: ["Black", "Brown", "Tan"],
    category: "Bags",
  },
  {
    id: 10,
    name: "Designer Watch",
    price: "₹25,000",
    originalPrice: "₹30,000",
    image: "/images/accessories.jpg",
    isNew: false,
    rating: 4.8,
    colors: ["Gold", "Silver", "Rose Gold"],
    category: "Watches",
  },
  {
    id: 11,
    name: "Silk Scarf",
    price: "₹3,500",
    originalPrice: "₹4,500",
    image: "/images/accessories.jpg",
    isNew: true,
    rating: 4.6,
    colors: ["Floral", "Geometric", "Solid"],
    category: "Scarves",
  },
  {
    id: 12,
    name: "Statement Necklace",
    price: "₹8,000",
    originalPrice: "₹10,000",
    image: "/images/accessories.jpg",
    isNew: false,
    rating: 4.5,
    colors: ["Gold", "Silver", "Rose Gold"],
    category: "Jewelry",
  },
]

export default function AccessoriesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [virtualTryOn, setVirtualTryOn] = useState<{
    isOpen: boolean
    product: (typeof accessoryProducts)[0] | null
  }>({
    isOpen: false,
    product: null,
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openVirtualTryOn = (product: (typeof accessoryProducts)[0]) => {
    setVirtualTryOn({ isOpen: true, product })
  }

  const closeVirtualTryOn = () => {
    setVirtualTryOn({ isOpen: false, product: null })
  }

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

      {/* Virtual Try-On Modal */}
      {virtualTryOn.isOpen && virtualTryOn.product && (
        <VirtualTryOn
          productName={virtualTryOn.product.name}
          productImage={virtualTryOn.product.image}
          category="Accessories"
          onClose={closeVirtualTryOn}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mt-20">
        <Image src="/images/accessories.jpg" alt="Accessories Collection" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-light tracking-wide mb-4">ACCESSORIES</h1>
            <p className="text-xl font-light tracking-wide mb-6">Complete your look with premium accessories</p>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2">
              <Camera className="h-4 w-4 mr-2" />
              Virtual Try-On Available
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{accessoryProducts.length} products</span>
              <div className="flex border border-gray-300 rounded">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {["Bags", "Watches", "Jewelry", "Scarves", "Belts"].map((category) => (
                      <label key={category} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Material</h3>
                  <div className="space-y-2">
                    {["Leather", "Metal", "Silk", "Cotton", "Synthetic"].map((material) => (
                      <label key={material} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Color</h3>
                  <div className="space-y-2">
                    {["Black", "Brown", "Gold", "Silver", "Multi"].map((color) => (
                      <label key={color} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {["Under ₹5,000", "₹5,000 - ₹15,000", "₹15,000 - ₹25,000", "Above ₹25,000"].map((range) => (
                      <label key={range} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {accessoryProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer product-card ${viewMode === "list" ? "flex gap-6" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`relative overflow-hidden rounded-lg ${
                    viewMode === "list" ? "w-64 h-80 flex-shrink-0" : "mb-4"
                  }`}
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={500}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" ? "w-full h-full" : "w-full h-80"
                      }`}
                    />
                  </Link>

                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-black text-white">NEW</Badge>}
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs">
                      <Camera className="h-3 w-3 mr-1" />
                      TRY-ON
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full">
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Virtual Try-On Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Button
                        onClick={() => openVirtualTryOn(product)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 text-sm"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        TRY ON
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={viewMode === "list" ? "flex-1" : ""}>
                  <Link href={`/product/${product.id}`} className="block">
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
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600">Colors:</span>
                    {product.colors.slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() === "white" ? "#fff" : color.toLowerCase() }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => openVirtualTryOn(product)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs px-3 py-1"
                    >
                      <Camera className="h-3 w-3 mr-1" />
                      TRY
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Stylist Chat */}
      <AIChatTrigger />
    </div>
  )
}
