"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, X, ShoppingBag, Truck, Shield, RotateCcw, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AIChatTrigger } from "@/components/ai-chat-trigger"
import { useCart } from "@/contexts/cart-context"

const cartItems = [
  {
    id: 1,
    name: "Classic Blazer",
    price: 12500,
    originalPrice: 15000,
    image: "/images/product-1.jpg",
    color: "Black",
    size: "M",
    quantity: 1,
    inStock: true,
  },
  {
    id: 3,
    name: "Designer Dress",
    price: 18000,
    originalPrice: 22000,
    image: "/images/product-3.jpg",
    color: "Navy",
    size: "S",
    quantity: 2,
    inStock: true,
  },
  {
    id: 5,
    name: "Evening Gown",
    price: 25000,
    originalPrice: 30000,
    image: "/images/product-5.jpg",
    color: "Gold",
    size: "M",
    quantity: 1,
    inStock: false,
  },
]

export default function CartPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const items = state.items
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const updateQuantityHandler = (id: number, color: string, size: string, newQuantity: number) => {
    updateQuantity(id, color, size, newQuantity)
    console.log(`Updated quantity for item ${id} to ${newQuantity}`)
  }

  const removeItemHandler = (id: number, color: string, size: string) => {
    removeItem(id, color, size)
    console.log(`Removed item ${id} from cart`)
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "vanity10") {
      setDiscount(0.1) // 10% discount
      alert("Promo code applied! 10% discount added.")
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(0.2) // 20% discount
      alert("Welcome discount applied! 20% off your order.")
    } else {
      alert("Invalid promo code. Try VANITY10 or WELCOME20")
    }
  }

  const subtotal = state.totalPrice
  const discountAmount = subtotal * discount
  const shipping = subtotal > 50000 ? 0 : 500 // Free shipping over ₹50,000
  const total = subtotal - discountAmount + shipping

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
            <h1 className="text-4xl font-light tracking-wide mb-2">SHOPPING CART</h1>
            <p className="text-gray-600 font-light">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </section>

        {items.length === 0 ? (
          <section className="py-16">
            <div className="container mx-auto px-6 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-light tracking-wide mb-4">Your cart is empty</h2>
              <p className="text-gray-600 font-light mb-8">Add some items to your cart to get started</p>
              <Link href="/women">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-light tracking-widest">
                  START SHOPPING
                </Button>
              </Link>
            </div>
          </section>
        ) : (
          <section className="py-12">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.color}-${item.size}`}
                        className="flex gap-4 p-6 bg-white border border-gray-200 rounded-lg"
                      >
                        <div className="relative w-24 h-32 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                              <span className="text-white text-xs font-medium">OUT OF STOCK</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/product/${item.id}`}>
                              <h3 className="text-lg font-light tracking-wide hover:text-gray-600 transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItemHandler(item.id, item.color, item.size)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-light">₹{item.price.toLocaleString()}</span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center border border-gray-300 rounded">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    updateQuantityHandler(item.id, item.color, item.size, item.quantity - 1)
                                  }
                                  className="h-8 w-8 rounded-r-none"
                                  disabled={!item.inStock}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm min-w-[3rem] text-center">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    updateQuantityHandler(item.id, item.color, item.size, item.quantity + 1)
                                  }
                                  className="h-8 w-8 rounded-l-none"
                                  disabled={!item.inStock}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {!item.inStock && (
                            <div className="mt-3">
                              <Badge variant="destructive" className="text-xs">
                                This item is currently out of stock
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                    <h2 className="text-xl font-light tracking-wide mb-6">ORDER SUMMARY</h2>

                    {/* Promo Code */}
                    <div className="mb-6">
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <Button onClick={applyPromoCode} variant="outline" className="px-4 bg-transparent">
                          Apply
                        </Button>
                      </div>
                      {discount > 0 && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <Tag className="h-4 w-4" />
                          <span>Promo code applied!</span>
                        </div>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                          <span>-₹{discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex justify-between text-lg font-medium">
                          <span>Total</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button
                      className="w-full bg-black text-white hover:bg-gray-800 py-3 font-light tracking-widest mb-4"
                      onClick={() => {
                        console.log("Proceeding to checkout with total:", total)
                        alert(`Proceeding to checkout with total: ₹${total.toLocaleString()}`)
                      }}
                    >
                      PROCEED TO CHECKOUT
                    </Button>

                    {/* Benefits */}
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        <span>Free shipping on orders over ₹50,000</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" />
                        <span>30-day easy returns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Secure payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recommendations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-light tracking-wide text-center mb-12">COMPLETE THE LOOK</h2>
            <div className="text-center">
              <Link href="/accessories">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-light tracking-widest">
                  SHOP ACCESSORIES
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      {/* AI Stylist Chat */}
      <AIChatTrigger />
    </div>
  )
}
