"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  isNew?: boolean
  rating: number
  reviews: number
}

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Classic Tailored Blazer",
    price: "₹12,500",
    originalPrice: "₹15,000",
    image: "/images/product-1.jpg",
    category: "Women",
    isNew: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Silk Blend Shirt",
    price: "₹8,500",
    image: "/images/product-2.jpg",
    category: "Men",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Designer Evening Dress",
    price: "₹18,000",
    originalPrice: "₹22,000",
    image: "/images/product-3.jpg",
    category: "Women",
    isNew: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Premium Leather Jacket",
    price: "₹25,000",
    image: "/images/product-4.jpg",
    category: "Men",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 5,
    name: "Elegant Evening Gown",
    price: "₹32,000",
    image: "/images/product-5.jpg",
    category: "Women",
    rating: 4.8,
    reviews: 78,
  },
  {
    id: 6,
    name: "Casual Chic Ensemble",
    price: "₹14,500",
    originalPrice: "₹18,000",
    image: "/images/product-6.jpg",
    category: "Women",
    rating: 4.6,
    reviews: 92,
  },
  {
    id: 7,
    name: "Formal Business Suit",
    price: "₹28,000",
    image: "/images/product-7.jpg",
    category: "Men",
    rating: 4.9,
    reviews: 167,
  },
  {
    id: 8,
    name: "Designer Cocktail Dress",
    price: "₹21,000",
    image: "/images/product-8.jpg",
    category: "Women",
    isNew: true,
    rating: 4.7,
    reviews: 134,
  },
  {
    id: 9,
    name: "Leather Handbag",
    price: "₹15,000",
    originalPrice: "₹18,000",
    image: "/images/accessories.jpg",
    category: "Accessories",
    isNew: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 10,
    name: "Designer Watch",
    price: "₹25,000",
    originalPrice: "₹30,000",
    image: "/images/accessories.jpg",
    category: "Accessories",
    rating: 4.8,
    reviews: 156,
  },
]

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [wishlistedItems, setWishlistedItems] = useState<Set<number>>(new Set())
  const { addItem } = useCart()

  // Get related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4)

  const handleWishlistToggle = (productId: number) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
        alert("Removed from wishlist!")
      } else {
        newSet.add(productId)
        alert("Added to wishlist!")
      }
      return newSet
    })
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number.parseInt(product.price.replace(/[₹,]/g, "")),
      originalPrice: product.originalPrice ? Number.parseInt(product.originalPrice.replace(/[₹,]/g, "")) : undefined,
      image: product.image,
      color: "Default",
      size: "M", // Default size for quick add
      category: product.category,
    })

    alert(`Added "${product.name}" to cart for ${product.price}!`)
    console.log("Added to cart:", product)
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-wide mb-4">YOU MAY ALSO LIKE</h2>
          <p className="text-gray-600">Discover more pieces from our {category.toLowerCase()}'s collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </Link>

                {product.isNew && <Badge className="absolute top-3 left-3 bg-black text-white">NEW</Badge>}

                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Button
                    size="icon"
                    className={`bg-white/90 hover:bg-white text-black rounded-full transition-colors ${
                      wishlistedItems.has(product.id) ? "bg-red-50 text-red-600" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleWishlistToggle(product.id)
                    }}
                  >
                    <Heart className={`h-4 w-4 ${wishlistedItems.has(product.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="icon"
                    className="bg-black hover:bg-gray-800 text-white rounded-full"
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddToCart(product)
                    }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
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
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${category.toLowerCase()}`}>
            <Button
              variant="outline"
              className="px-8 py-3 text-lg hover:bg-black hover:text-white transition-colors duration-300 bg-transparent border-gray-300 text-gray-900 hover:scale-105"
            >
              VIEW ALL {category.toUpperCase()}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
