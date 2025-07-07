"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, List, Heart, ShoppingBag, Star, SlidersHorizontal, Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { VirtualTryOn } from "@/components/virtual-try-on"
import { AIChatTrigger } from "@/components/ai-chat-trigger"

const womenProducts = [
  {
    id: 1,
    name: "Classic Blazer",
    price: "₹12,500",
    originalPrice: "₹15,000",
    image: "/images/product-1.jpg",
    isNew: true,
    rating: 4.8,
    colors: ["Black", "Navy", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Blazers",
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
    sizes: ["XS", "S", "M", "L"],
    category: "Dresses",
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
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Gowns",
  },
  {
    id: 7,
    name: "Summer Dress",
    price: "₹7,500",
    originalPrice: "₹9,500",
    image: "/images/product-7.jpg",
    isNew: false,
    rating: 4.5,
    colors: ["Floral", "Solid", "Striped"],
    sizes: ["XS", "S", "M", "L"],
    category: "Dresses",
  },
]

export default function WomenPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [virtualTryOn, setVirtualTryOn] = useState<{
    isOpen: boolean
    product: (typeof womenProducts)[0] | null
  }>({
    isOpen: false,
    product: null,
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openVirtualTryOn = (product: (typeof womenProducts)[0]) => {
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
          category="Women"
          onClose={closeVirtualTryOn}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mt-20">
        <Image src="/images/women-collection.jpg" alt="Women's Collection" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-light tracking-wide mb-4">WOMEN'S COLLECTION</h1>
            <p className="text-xl font-light tracking-wide mb-6">Elegant designs for the contemporary woman</p>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
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
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{womenProducts.length} products</span>
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
                    {["Blazers", "Dresses", "Gowns", "Tops", "Pants"].map((category) => (
                      <label key={category} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="space-y-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <label key={size} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Color</h3>
                  <div className="space-y-2">
                    {["Black", "White", "Navy", "Red", "Beige"].map((color) => (
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
                    {["Under ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹30,000", "Above ₹30,000"].map((range) => (
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
            {womenProducts.map((product, index) => (
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
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      <Camera className="h-3 w-3 mr-1" />
                      TRY-ON
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-white/90 hover:bg-white text-black rounded-full"
                      onClick={() => {
                        console.log("Added to cart:", product.name)
                      }}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Virtual Try-On Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Button
                        onClick={() => openVirtualTryOn(product)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 text-sm"
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
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sizes:</span>
                      <div className="flex gap-1">
                        {product.sizes.slice(0, 4).map((size) => (
                          <span key={size} className="text-xs px-2 py-1 border border-gray-300 rounded">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => openVirtualTryOn(product)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs px-3 py-1"
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
