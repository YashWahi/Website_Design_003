"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star, Flame, Clock, Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { VirtualTryOn } from "@/components/virtual-try-on"
import { AIChatTrigger } from "@/components/ai-chat-trigger"

const saleProducts = [
  {
    id: 1,
    name: "Classic Blazer",
    price: "₹12,500",
    originalPrice: "₹15,000",
    image: "/images/product-1.jpg",
    discount: 17,
    rating: 4.8,
    colors: ["Black", "Navy", "Beige"],
    category: "Women",
    saleEndDate: "2024-02-15",
  },
  {
    id: 2,
    name: "Silk Shirt",
    price: "₹8,500",
    originalPrice: "₹10,000",
    image: "/images/product-2.jpg",
    discount: 15,
    rating: 4.9,
    colors: ["White", "Blue", "Gray"],
    category: "Men",
    saleEndDate: "2024-02-15",
  },
  {
    id: 4,
    name: "Casual Jacket",
    price: "₹9,500",
    originalPrice: "₹12,000",
    image: "/images/product-4.jpg",
    discount: 21,
    rating: 4.6,
    colors: ["Brown", "Black", "Olive"],
    category: "Men",
    saleEndDate: "2024-02-15",
  },
  {
    id: 8,
    name: "Casual Wear",
    price: "₹5,500",
    originalPrice: "₹7,000",
    image: "/images/product-8.jpg",
    discount: 21,
    rating: 4.4,
    colors: ["White", "Gray", "Blue"],
    category: "Men",
    saleEndDate: "2024-02-15",
  },
]

export default function SalePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [virtualTryOn, setVirtualTryOn] = useState<{
    isOpen: boolean
    product: (typeof saleProducts)[0] | null
  }>({
    isOpen: false,
    product: null,
  })

  useEffect(() => {
    setIsLoaded(true)

    // Countdown timer
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const saleEnd = new Date("2024-02-15").getTime()
      const distance = saleEnd - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const openVirtualTryOn = (product: (typeof saleProducts)[0]) => {
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
          category={virtualTryOn.product.category as "Women" | "Men" | "Accessories"}
          onClose={closeVirtualTryOn}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden mt-20 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Flame className="h-8 w-8 mr-3 animate-bounce text-yellow-300" />
              <h1 className="text-6xl font-light tracking-wide">SALE</h1>
              <Flame className="h-8 w-8 ml-3 animate-bounce text-yellow-300" />
            </div>
            <p className="text-xl font-light tracking-wide mb-6">Up to 50% off selected items</p>
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-white text-red-600 text-lg px-6 py-3 animate-pulse">LIMITED TIME OFFER</Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                <Camera className="h-4 w-4 mr-2" />
                Virtual Try-On Available
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-8 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 mr-2" />
              <h2 className="text-2xl font-light tracking-wide">SALE ENDS IN</h2>
            </div>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-light">{timeLeft.days}</div>
                <div className="text-sm text-gray-400">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light">{timeLeft.hours}</div>
                <div className="text-sm text-gray-400">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-400">MINUTES</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-400">SECONDS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-light tracking-wide mb-6">SEASONAL CLEARANCE</h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mb-8">
            Don't miss out on incredible savings across our entire collection. From wardrobe essentials to statement
            pieces, find your favorites at unbeatable prices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-red-500 text-white px-4 py-2">Up to 50% OFF</Badge>
            <Badge className="bg-orange-500 text-white px-4 py-2">Free Shipping</Badge>
            <Badge className="bg-green-500 text-white px-4 py-2">Easy Returns</Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2">
              <Camera className="h-4 w-4 mr-1" />
              Try Before You Buy
            </Badge>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {saleProducts.map((product, index) => (
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
                    <Badge className="bg-red-500 text-white animate-pulse">-{product.discount}%</Badge>
                    <Badge className="bg-orange-500 text-white text-xs">SALE</Badge>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Button
                        onClick={() => openVirtualTryOn(product)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 text-sm"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        TRY ON
                      </Button>
                    </div>
                  </div>
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
                    <span className="text-lg font-medium text-red-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    <Badge variant="outline" className="text-xs text-red-600 border-red-600">
                      SAVE ₹
                      {Number.parseInt(product.originalPrice.replace(/[₹,]/g, "")) -
                        Number.parseInt(product.price.replace(/[₹,]/g, ""))}
                    </Badge>
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
                    <Button
                      size="sm"
                      onClick={() => openVirtualTryOn(product)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs px-3 py-1"
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

      {/* Sale Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light tracking-wide mb-6">DON'T WAIT, SALE ENDS SOON!</h2>
          <p className="text-lg font-light mb-8 max-w-2xl mx-auto">
            These prices won't last forever. Shop now and save big on your favorite fashion pieces.
          </p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-lg font-light tracking-widest">
            SHOP ALL SALE ITEMS
          </Button>
        </div>
      </section>

      {/* AI Stylist Chat */}
      <AIChatTrigger />
    </div>
  )
}
