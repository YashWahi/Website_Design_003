"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ShoppingBag,
  Star,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Camera,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { VirtualTryOn } from "@/components/virtual-try-on"
import { useParams } from "next/navigation"
import { AIChatTrigger } from "@/components/ai-chat-trigger"
import { RelatedProducts } from "@/components/related-products"
import { useCart } from "@/contexts/cart-context"

const productData = {
  1: {
    id: 1,
    name: "Classic Tailored Blazer",
    price: "₹12,500",
    originalPrice: "₹15,000",
    images: ["/images/product-1.jpg", "/images/hero-1.jpg", "/images/women-collection.jpg"],
    isNew: true,
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1e3a8a" },
      { name: "Beige", value: "#f5f5dc" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Women",
    description:
      "A timeless classic blazer crafted from premium wool blend. Perfect for both professional and casual settings, this versatile piece features a tailored fit with structured shoulders and elegant lapels. The sophisticated design makes it an essential wardrobe staple for the modern woman.",
    features: [
      "Premium wool blend fabric (70% wool, 30% polyester)",
      "Tailored fit with structured shoulders",
      "Two front pockets and one chest pocket",
      "Fully lined interior with premium silk",
      "Professional dry clean only",
      "Made in Italy with attention to detail",
    ],
    inStock: true,
    stockCount: 15,
    fabric: "Wool Blend",
    care: "Dry clean only",
    origin: "Made in Italy",
  },
  2: {
    id: 2,
    name: "Silk Blend Shirt",
    price: "₹8,500",
    originalPrice: "₹10,000",
    images: ["/images/product-2.jpg", "/images/hero-2.jpg", "/images/men-collection.jpg"],
    isNew: false,
    rating: 4.9,
    reviewCount: 89,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Light Blue", value: "#add8e6" },
      { name: "Gray", value: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Men",
    description:
      "Luxurious silk blend shirt that combines comfort with sophistication. The smooth texture and elegant drape make it perfect for both business and casual occasions. Features mother-of-pearl buttons and French seams for a premium finish.",
    features: [
      "Premium silk blend fabric (60% silk, 40% cotton)",
      "Mother-of-pearl buttons",
      "French seam construction",
      "Spread collar design",
      "Machine washable on delicate cycle",
      "Wrinkle-resistant finish",
    ],
    inStock: true,
    stockCount: 23,
    fabric: "Silk Blend",
    care: "Machine wash delicate",
    origin: "Made in India",
  },
  3: {
    id: 3,
    name: "Designer Evening Dress",
    price: "₹18,000",
    originalPrice: "₹22,000",
    images: ["/images/product-3.jpg", "/images/hero-3.jpg", "/images/women-collection.jpg"],
    isNew: true,
    rating: 4.7,
    reviewCount: 156,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Navy", value: "#1e3a8a" },
      { name: "Burgundy", value: "#800020" },
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "Women",
    description:
      "Elegant evening dress designed for special occasions. The flowing silhouette and premium fabric create a stunning look that's perfect for dinner parties, galas, or romantic evenings. Features a flattering A-line cut with subtle embellishments.",
    features: [
      "Premium crepe fabric with subtle sheen",
      "A-line silhouette for flattering fit",
      "Hidden back zipper closure",
      "Fully lined with soft cotton",
      "Hand-sewn embellishments",
      "Professional dry clean recommended",
    ],
    inStock: true,
    stockCount: 8,
    fabric: "Premium Crepe",
    care: "Dry clean recommended",
    origin: "Designed in Paris",
  },
  4: {
    id: 4,
    name: "Premium Leather Jacket",
    price: "₹25,000",
    originalPrice: "₹30,000",
    images: ["/images/product-4.jpg", "/images/hero-1.jpg", "/images/men-collection.jpg"],
    isNew: false,
    rating: 4.9,
    reviewCount: 203,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Brown", value: "#8b4513" },
      { name: "Tan", value: "#d2b48c" },
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Men",
    description:
      "Handcrafted premium leather jacket made from the finest Italian leather. This timeless piece combines classic styling with modern comfort. Perfect for adding an edge to any outfit while maintaining sophistication.",
    features: [
      "100% genuine Italian leather",
      "YKK premium zippers",
      "Quilted lining for warmth",
      "Multiple interior and exterior pockets",
      "Adjustable waist tabs",
      "Handcrafted with attention to detail",
    ],
    inStock: true,
    stockCount: 12,
    fabric: "Genuine Leather",
    care: "Professional leather care",
    origin: "Made in Italy",
  },
  5: {
    id: 5,
    name: "Elegant Evening Gown",
    price: "₹32,000",
    originalPrice: "₹38,000",
    images: ["/images/product-5.jpg", "/images/hero-2.jpg", "/images/women-collection.jpg"],
    isNew: false,
    rating: 4.8,
    reviewCount: 78,
    colors: [
      { name: "Gold", value: "#ffd700" },
      { name: "Silver", value: "#c0c0c0" },
      { name: "Rose Gold", value: "#e8b4b8" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Women",
    description:
      "Stunning floor-length evening gown perfect for formal events and galas. The luxurious fabric and elegant design create a show-stopping look. Features intricate beading and a flattering silhouette that enhances your natural beauty.",
    features: [
      "Luxurious silk chiffon fabric",
      "Hand-beaded embellishments",
      "Floor-length with train",
      "Built-in corset for support",
      "Hidden side zipper",
      "Comes with matching stole",
    ],
    inStock: true,
    stockCount: 5,
    fabric: "Silk Chiffon",
    care: "Professional dry clean only",
    origin: "Couture design from Milan",
  },
  6: {
    id: 6,
    name: "Casual Chic Ensemble",
    price: "₹14,500",
    originalPrice: "₹18,000",
    images: ["/images/product-6.jpg", "/images/hero-3.jpg", "/images/accessories.jpg"],
    isNew: false,
    rating: 4.6,
    reviewCount: 92,
    colors: [
      { name: "Cream", value: "#f5f5dc" },
      { name: "Blush", value: "#ffc0cb" },
      { name: "Sage", value: "#9caf88" },
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "Women",
    description:
      "Perfect casual ensemble for weekend outings and relaxed occasions. This coordinated set combines comfort with style, featuring soft fabrics and a modern cut that's both flattering and comfortable for all-day wear.",
    features: [
      "Soft cotton blend fabric",
      "Coordinated top and bottom set",
      "Relaxed fit for comfort",
      "Machine washable",
      "Versatile styling options",
      "Sustainable fabric sourcing",
    ],
    inStock: true,
    stockCount: 18,
    fabric: "Cotton Blend",
    care: "Machine wash cold",
    origin: "Ethically made in India",
  },
  7: {
    id: 7,
    name: "Formal Business Suit",
    price: "₹28,000",
    originalPrice: "₹35,000",
    images: ["/images/product-7.jpg", "/images/hero-1.jpg", "/images/men-collection.jpg"],
    isNew: false,
    rating: 4.9,
    reviewCount: 167,
    colors: [
      { name: "Charcoal", value: "#36454f" },
      { name: "Navy", value: "#1e3a8a" },
      { name: "Black", value: "#000000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Men",
    description:
      "Impeccably tailored business suit crafted from premium wool. This two-piece suit features a modern slim fit that's perfect for boardroom meetings and formal occasions. Includes matching jacket and trousers.",
    features: [
      "Premium wool suiting fabric",
      "Modern slim fit tailoring",
      "Two-piece set (jacket + trousers)",
      "Half-canvas construction",
      "Working buttonholes",
      "Professional tailoring included",
    ],
    inStock: true,
    stockCount: 10,
    fabric: "Premium Wool",
    care: "Dry clean only",
    origin: "Tailored in London",
  },
  8: {
    id: 8,
    name: "Designer Cocktail Dress",
    price: "₹21,000",
    originalPrice: "₹26,000",
    images: ["/images/product-8.jpg", "/images/hero-2.jpg", "/images/women-collection.jpg"],
    isNew: true,
    rating: 4.7,
    reviewCount: 134,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Emerald", value: "#50c878" },
      { name: "Sapphire", value: "#0f52ba" },
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "Women",
    description:
      "Sophisticated cocktail dress perfect for evening events and parties. The modern design features clean lines and a flattering silhouette that transitions beautifully from day to night. Made with attention to every detail.",
    features: [
      "Premium jersey fabric with stretch",
      "Flattering bodycon silhouette",
      "Three-quarter sleeve design",
      "Hidden back zipper",
      "Lined for comfort and opacity",
      "Wrinkle-resistant fabric",
    ],
    inStock: true,
    stockCount: 14,
    fabric: "Premium Jersey",
    care: "Machine wash gentle",
    origin: "Designer piece from New York",
  },
  9: {
    id: 9,
    name: "Leather Handbag",
    price: "₹15,000",
    originalPrice: "₹18,000",
    images: ["/images/accessories.jpg", "/images/hero-3.jpg", "/images/women-collection.jpg"],
    isNew: true,
    rating: 4.7,
    reviewCount: 89,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Brown", value: "#8b4513" },
      { name: "Tan", value: "#d2b48c" },
    ],
    sizes: ["One Size"],
    category: "Accessories",
    description:
      "Luxurious leather handbag crafted from premium Italian leather. Features multiple compartments for organization and a timeless design that complements any outfit. Perfect for both professional and casual use.",
    features: [
      "100% genuine Italian leather",
      "Multiple interior compartments",
      "Adjustable shoulder strap",
      "Gold-tone hardware",
      "Dust bag included",
      "Handcrafted construction",
    ],
    inStock: true,
    stockCount: 25,
    fabric: "Genuine Leather",
    care: "Leather conditioner recommended",
    origin: "Made in Italy",
  },
  10: {
    id: 10,
    name: "Designer Watch",
    price: "₹25,000",
    originalPrice: "₹30,000",
    images: ["/images/accessories.jpg", "/images/hero-1.jpg", "/images/men-collection.jpg"],
    isNew: false,
    rating: 4.8,
    reviewCount: 156,
    colors: [
      { name: "Gold", value: "#ffd700" },
      { name: "Silver", value: "#c0c0c0" },
      { name: "Rose Gold", value: "#e8b4b8" },
    ],
    sizes: ["One Size"],
    category: "Accessories",
    description:
      "Elegant designer watch with Swiss movement and premium materials. Features a classic design that works for both formal and casual occasions. Water-resistant and built to last with precision craftsmanship.",
    features: [
      "Swiss quartz movement",
      "Stainless steel case and band",
      "Sapphire crystal glass",
      "Water resistant to 50m",
      "Date display function",
      "2-year international warranty",
    ],
    inStock: true,
    stockCount: 8,
    fabric: "Stainless Steel",
    care: "Wipe with soft cloth",
    origin: "Swiss made",
  },
}

export default function ProductPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const product = productData[productId as keyof typeof productData]

  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [virtualTryOn, setVirtualTryOn] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showReviews, setShowReviews] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [zoomedImage, setZoomedImage] = useState(false)

  const { addItem } = useCart()

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

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-light tracking-wide mb-4">Product Not Found</h1>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-light tracking-widest">
                BACK TO HOME
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleImageZoom = () => {
    setZoomedImage(!zoomedImage)
  }

  const handleSizeGuideClick = () => {
    setShowSizeGuide(true)
    alert(
      "Size Guide: Our comprehensive size guide helps you find the perfect fit. XS (32-34), S (34-36), M (36-38), L (38-40), XL (40-42)",
    )
  }

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from Vanity Fashion`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Product link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Virtual Try-On Modal */}
      {virtualTryOn && (
        <VirtualTryOn
          productName={product.name}
          productImage={product.images[currentImageIndex]}
          category={product.category as "Women" | "Men" | "Accessories"}
          onClose={() => setVirtualTryOn(false)}
        />
      )}

      <div className="pt-20">
        {/* Breadcrumb */}
        <section className="py-4 border-b border-gray-200">
          <div className="container mx-auto px-6">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-black">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/${product.category.toLowerCase()}`} className="hover:text-black">
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-black">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div
                  className="relative aspect-square overflow-hidden rounded-lg cursor-zoom-in"
                  onClick={handleImageZoom}
                >
                  <Image
                    src={product.images[currentImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className={`object-cover transition-transform duration-300 ${zoomedImage ? "scale-150" : "hover:scale-105"}`}
                    priority
                  />

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {product.isNew && <Badge className="absolute top-4 left-4 bg-black text-white">NEW</Badge>}

                  {/* Virtual Try-On Badge */}
                  <Badge
                    className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setVirtualTryOn(true)}
                  >
                    <Camera className="h-3 w-3 mr-1" />
                    TRY-ON
                  </Badge>

                  {/* Zoom indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Click to zoom
                  </div>
                </div>

                {/* Enhanced Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                          index === currentImageIndex
                            ? "border-black shadow-lg"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-light tracking-wide mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-2xl font-light">{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      SAVE ₹
                      {Number.parseInt(product.originalPrice.replace(/[₹,]/g, "")) -
                        Number.parseInt(product.price.replace(/[₹,]/g, ""))}
                    </Badge>
                  </div>
                </div>

                {/* Virtual Try-On CTA */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Camera className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Try Before You Buy</h3>
                        <p className="text-sm text-gray-600">See how it looks on you with AR</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setVirtualTryOn(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      TRY NOW
                    </Button>
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Color: {selectedColor?.name}</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedColor?.name === color.name
                            ? "border-black scale-110"
                            : "border-gray-300 hover:border-gray-500"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Size</h3>
                    <button onClick={handleSizeGuideClick} className="text-sm text-gray-600 hover:text-black underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md text-sm transition-all duration-200 hover:scale-105 ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-10 w-10 rounded-r-none"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 text-sm min-w-[3rem] text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-10 w-10 rounded-l-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-600">{product.stockCount} items left</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-800 py-3 font-light tracking-widest transition-all duration-200 hover:scale-105"
                    disabled={!selectedSize && product.category !== "Accessories"}
                    onClick={() => {
                      if (product.category !== "Accessories" && !selectedSize) {
                        alert("Please select a size")
                        return
                      }

                      addItem({
                        id: product.id,
                        name: product.name,
                        price: Number.parseInt(product.price.replace(/[₹,]/g, "")),
                        originalPrice: product.originalPrice
                          ? Number.parseInt(product.originalPrice.replace(/[₹,]/g, ""))
                          : undefined,
                        image: product.images[0],
                        color: selectedColor?.name || "Default",
                        size: selectedSize || "One Size",
                        category: product.category,
                        quantity: quantity,
                      })

                      alert(
                        `Added ${quantity} x ${product.name} (${selectedColor?.name}${selectedSize ? `, ${selectedSize}` : ""}) to cart!`,
                      )
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    ADD TO CART - {product.price}
                  </Button>

                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsWishlisted(!isWishlisted)
                        console.log(isWishlisted ? "Removed from wishlist" : "Added to wishlist")
                        alert(isWishlisted ? "Removed from wishlist" : "Added to wishlist!")
                      }}
                      className={`transition-all duration-200 hover:scale-105 ${isWishlisted ? "bg-red-50 border-red-200 text-red-600" : ""}`}
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleShareClick}
                      className="transition-all duration-200 hover:scale-105 bg-transparent"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setVirtualTryOn(true)}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 hover:scale-105"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Benefits */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on orders over ₹50,000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <RotateCcw className="h-4 w-4" />
                    <span>30-day easy returns</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>2-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-purple-600">
                    <Camera className="h-4 w-4" />
                    <span>Virtual try-on available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12 border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-8">
                {[
                  { id: "description", label: "Description" },
                  { id: "features", label: "Features" },
                  { id: "care", label: "Care & Materials" },
                  { id: "reviews", label: `Reviews (${product.reviewCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-8">
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-2xl font-light tracking-wide mb-4">DESCRIPTION</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                  </div>
                )}

                {activeTab === "features" && (
                  <div>
                    <h2 className="text-2xl font-light tracking-wide mb-4">FEATURES</h2>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                          <span className="w-2 h-2 bg-black rounded-full mr-4 mt-2 flex-shrink-0"></span>
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "care" && (
                  <div>
                    <h2 className="text-2xl font-light tracking-wide mb-4">CARE & MATERIALS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Fabric</h3>
                        <p className="text-gray-600">{product.fabric}</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Care Instructions</h3>
                        <p className="text-gray-600">{product.care}</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-medium mb-2">Origin</h3>
                        <p className="text-gray-600">{product.origin}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-2xl font-light tracking-wide mb-4">CUSTOMER REVIEWS</h2>
                    <div className="space-y-6">
                      {/* Review Summary */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-3xl font-light">{product.rating}</div>
                          <div>
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">Based on {product.reviewCount} reviews</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => alert("Review form would open here")}
                          variant="outline"
                          className="bg-transparent"
                        >
                          Write a Review
                        </Button>
                      </div>

                      {/* Sample Reviews */}
                      <div className="space-y-4">
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">Sarah M. - Verified Purchase</span>
                          </div>
                          <p className="text-gray-700">
                            "Absolutely love this piece! The quality is exceptional and the fit is perfect. Highly
                            recommend!"
                          </p>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                              <Star className="h-4 w-4 text-gray-300" />
                            </div>
                            <span className="text-sm text-gray-600">Michael R. - Verified Purchase</span>
                          </div>
                          <p className="text-gray-700">
                            "Great quality and fast shipping. The size was perfect as described."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
      {/* AI Stylist Chat */}
      <AIChatTrigger />
    </div>
  )
}
