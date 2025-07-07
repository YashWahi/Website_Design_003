"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star, X, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AIChatTrigger } from "@/components/ai-chat-trigger"

const wishlistItems = [
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
    inStock: true,
    dateAdded: "2024-01-10",
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
    inStock: true,
    dateAdded: "2024-01-08",
  },
  {
    id: 5,
    name: "Evening Gown",
    price: "₹25,000",
    originalPrice: "₹30,000",
    image: "/images/product-5.jpg",
    isNew: false,
    rating: 4.9,
    colors: ["Gold", "Silver", "Rose"],
    category: "Women",
    inStock: false,
    dateAdded: "2024-01-05",
  },
]

export default function WishlistPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState(wishlistItems)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const removeFromWishlist = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const filteredItems = items.filter((item) => {
    if (filter === "in-stock") return item.inStock
    if (filter === "out-of-stock") return !item.inStock
    return true
  })

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

      <div className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-light tracking-wide mb-2">MY WISHLIST</h1>
                <p className="text-gray-600 font-light">
                  {items.length} {items.length === 1 ? "item" : "items"} saved for later
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Share Wishlist
                </Button>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="all">All Items</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Wishlist Items */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-light tracking-wide mb-4">
                  {filter === "all" ? "Your wishlist is empty" : "No items match your filter"}
                </h2>
                <p className="text-gray-600 font-light mb-8">
                  {filter === "all"
                    ? "Start adding items you love to see them here"
                    : "Try changing your filter to see more items"}
                </p>
                <Link href="/women">
                  <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-light tracking-widest">
                    START SHOPPING
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <div key={item.id} className="group product-card" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <Link href={`/product/${item.id}`}>
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={400}
                          height={500}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Stock Status Overlay */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge className="bg-red-500 text-white">OUT OF STOCK</Badge>
                        </div>
                      )}

                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {item.isNew && <Badge className="bg-black text-white">NEW</Badge>}
                      </div>

                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button
                          size="icon"
                          onClick={() => removeFromWishlist(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <Button
                          size="icon"
                          disabled={!item.inStock}
                          className="bg-white/90 hover:bg-white text-black rounded-full disabled:opacity-50"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-lg font-light tracking-wide mb-2 group-hover:text-gray-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({item.rating})</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-lg font-light text-gray-900">{item.price}</span>
                        <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Colors:</span>
                          {item.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: color.toLowerCase() === "white" ? "#fff" : color.toLowerCase(),
                              }}
                            />
                          ))}
                        </div>
                        <Badge variant={item.inStock ? "outline" : "destructive"} className="text-xs">
                          {item.inStock ? "IN STOCK" : "OUT OF STOCK"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Added {new Date(item.dateAdded).toLocaleDateString()}
                        </span>
                        <Button
                          size="sm"
                          disabled={!item.inStock}
                          className="bg-black text-white hover:bg-gray-800 disabled:opacity-50 font-light tracking-wide"
                        >
                          {item.inStock ? "ADD TO CART" : "NOTIFY ME"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recommendations */}
        {filteredItems.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-light tracking-wide text-center mb-12">YOU MIGHT ALSO LIKE</h2>
              <div className="text-center">
                <Link href="/women">
                  <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-light tracking-widest">
                    EXPLORE MORE
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* AI Stylist Chat */}
        <AIChatTrigger />
      </div>
    </div>
  )
}
