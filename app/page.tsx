"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { AIChatTrigger } from "@/components/ai-chat-trigger"
import { useCart } from "@/contexts/cart-context"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react"

const heroImages = [
  {
    src: "/images/hero-1.jpg",
    title: "Elevate Your Style",
    subtitle: "Discover timeless pieces that define modern elegance",
    cta: "Shop Collection",
    link: "/women",
  },
  {
    src: "/images/hero-2.jpg",
    title: "Contemporary Fashion",
    subtitle: "Where sophistication meets contemporary design",
    cta: "Explore Now",
    link: "/men",
  },
  {
    src: "/images/hero-3.jpg",
    title: "Curated Excellence",
    subtitle: "Handpicked pieces for the discerning individual",
    cta: "View All",
    link: "/new-in",
  },
]

const collections = [
  {
    id: 1,
    name: "Women's Collection",
    image: "/images/women-collection.jpg",
    description: "Sophisticated pieces for the modern woman",
    link: "/women",
    items: "120+ Items",
  },
  {
    id: 2,
    name: "Men's Collection",
    image: "/images/men-collection.jpg",
    description: "Contemporary styles for the discerning gentleman",
    link: "/men",
    items: "85+ Items",
  },
  {
    id: 3,
    name: "Accessories",
    image: "/images/accessories.jpg",
    description: "Complete your look with premium accessories",
    link: "/accessories",
    items: "45+ Items",
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Classic Tailored Blazer",
    price: "₹12,500",
    originalPrice: "₹15,000",
    image: "/images/product-1.jpg",
    category: "Blazers",
    isNew: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Silk Blend Shirt",
    price: "₹8,500",
    image: "/images/product-2.jpg",
    category: "Shirts",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Designer Evening Dress",
    price: "₹18,000",
    originalPrice: "₹22,000",
    image: "/images/product-3.jpg",
    category: "Dresses",
    isNew: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Premium Leather Jacket",
    price: "₹25,000",
    image: "/images/product-4.jpg",
    category: "Jackets",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 5,
    name: "Elegant Evening Gown",
    price: "₹32,000",
    image: "/images/product-5.jpg",
    category: "Gowns",
    rating: 4.8,
    reviews: 78,
  },
  {
    id: 6,
    name: "Casual Chic Ensemble",
    price: "₹14,500",
    originalPrice: "₹18,000",
    image: "/images/product-6.jpg",
    category: "Sets",
    rating: 4.6,
    reviews: 92,
  },
  {
    id: 7,
    name: "Formal Business Suit",
    price: "₹28,000",
    image: "/images/product-7.jpg",
    category: "Suits",
    rating: 4.9,
    reviews: 167,
  },
  {
    id: 8,
    name: "Designer Cocktail Dress",
    price: "₹21,000",
    image: "/images/product-8.jpg",
    category: "Dresses",
    isNew: true,
    rating: 4.7,
    reviews: 134,
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isContentReady, setIsContentReady] = useState(false)
  const [email, setEmail] = useState("")
  const [wishlistedItems, setWishlistedItems] = useState<Set<number>>(new Set())

  const { addItem } = useCart()

  // Memoized handlers for performance
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  // Handle wishlist toggle
  const handleWishlistToggle = (productId: number) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
        alert(`Removed from wishlist!`)
      } else {
        newSet.add(productId)
        alert(`Added to wishlist!`)
      }
      return newSet
    })
  }

  // Handle add to cart
  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number.parseInt(product.price.replace(/[₹,]/g, "")),
      originalPrice: product.originalPrice ? Number.parseInt(product.originalPrice.replace(/[₹,]/g, "")) : undefined,
      image: product.image,
      color: "Default",
      size: "M", // Default size for homepage quick add
      category: product.category,
    })

    alert(`Added "${product.name}" to cart for ${product.price}!`)
    console.log("Added to cart:", product)
  }

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      alert("Please enter your email address")
      return
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address")
      return
    }
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
    console.log("Newsletter subscription:", email)
  }

  // Handle social media clicks
  const handleSocialClick = (platform: string) => {
    alert(`Opening ${platform}... (This would redirect to our ${platform} page)`)
    console.log(`Social media click: ${platform}`)
  }

  // Handle contact clicks
  const handleContactClick = (type: string, value: string) => {
    if (type === "email") {
      window.location.href = `mailto:${value}`
    } else if (type === "phone") {
      window.location.href = `tel:${value}`
    } else {
      alert(`Contact: ${value}`)
    }
  }

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (Math.abs(currentScrollY - scrollY) > 10) {
      setScrollY(currentScrollY)
    }
  }, [scrollY])

  useEffect(() => {
    const throttledScroll = () => {
      requestAnimationFrame(handleScroll)
    }
    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [handleScroll])

  // Auto-play carousel
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isAutoPlaying && !isLoading) {
      interval = setInterval(nextSlide, 4000)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAutoPlaying, nextSlide, isLoading])

  // Loading animation with proper content ready state
  useEffect(() => {
    // Set content ready immediately
    setIsContentReady(true)

    // Loading screen timer
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (isLoading) return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll(".scroll-animate")
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isLoading])

  // Show loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          {/* Brand Name with Glow Effect */}
          <div className="text-6xl md:text-8xl font-light tracking-[0.3em] text-white mb-8 animate-pulse-glow">
            VANITY
          </div>

          {/* Subtitle */}
          <div className="text-lg text-gray-400 mb-12 animate-fade-in font-light tracking-widest">
            FASHION FOR EVERYONE
          </div>

          {/* Loading Bars Animation */}
          <div className="loading-bars mb-8">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {/* Loading Text */}
          <div className="text-sm text-gray-500 animate-fade-in-delay font-light tracking-wider">
            CURATING YOUR EXPERIENCE...
          </div>

          {/* Floating Particles */}
          <div className="floating-particles">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Main content - only render when content is ready
  if (!isContentReady) {
    return null
  }

  return (
    <div className="min-h-screen bg-white page-enter">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Hero Images */}
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover hero-image"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
          <div className="max-w-4xl mx-auto px-4 hero-content">
            <h1 className="text-5xl md:text-7xl font-light mb-6 hero-title animate-text-reveal">
              {heroImages[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 hero-subtitle max-w-2xl mx-auto">
              {heroImages[currentSlide].subtitle}
            </p>
            <div className="hero-buttons">
              <Link href={heroImages[currentSlide].link}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-medium transform hover:scale-105 transition-all duration-200"
                >
                  {heroImages[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 carousel-indicator hover:scale-125 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 carousel-btn hover:scale-110"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20 carousel-btn hover:scale-110"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-white animate-progress"
            style={{
              animationDuration: isAutoPlaying ? "4s" : "0s",
              animationIterationCount: isAutoPlaying ? "infinite" : "1",
            }}
          />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 text-white scroll-indicator">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-light tracking-wider rotate-90 origin-center transform">SCROLL</span>
            <div className="w-px h-8 bg-white animate-scroll-line" />
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>

        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 px-4 scroll-animate bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">Our Collections</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our carefully curated collections, each piece selected for its exceptional quality and timeless
              appeal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Link key={collection.id} href={collection.link}>
                <div
                  className={`group cursor-pointer collection-card hover:scale-105 transition-transform duration-300`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-96 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-white/20 text-white border-white/30 mb-2">{collection.items}</Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition-colors text-gray-900">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gray-50 scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">Featured Pieces</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked selections from our latest arrivals, showcasing the finest in contemporary fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer product-card hover:scale-105 transition-transform duration-300`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-80 overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Link>
                  {product.isNew && <Badge className="absolute top-3 left-3 bg-black text-white new-badge">New</Badge>}
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800 category-badge">
                    {product.category}
                  </Badge>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className={`bg-white text-black hover:bg-gray-100 transition-colors ${wishlistedItems.has(product.id) ? "bg-red-50 text-red-600" : ""}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleWishlistToggle(product.id)
                        }}
                      >
                        <Heart className={`h-4 w-4 ${wishlistedItems.has(product.id) ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-black text-white hover:bg-gray-800"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddToCart(product)
                        }}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/new-in">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg hover:bg-black hover:text-white transition-colors duration-300 bg-transparent border-gray-300 text-gray-900 hover:scale-105"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 brand-bg text-white scroll-animate">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8 brand-title">The Vanity Experience</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Where timeless elegance meets contemporary design. Each piece in our collection is carefully selected to
            embody sophistication, quality, and the modern aesthetic.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-float">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-medium mb-2">Premium Quality</h3>
              <p className="text-sm opacity-75">Handpicked materials and exceptional craftsmanship</p>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: "0.5s" }}>
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-medium mb-2">Authentic Design</h3>
              <p className="text-sm opacity-75">Original pieces that define contemporary fashion</p>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: "1s" }}>
              <Truck className="h-12 w-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-medium mb-2">Global Delivery</h3>
              <p className="text-sm opacity-75">Worldwide shipping with premium packaging</p>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 scroll-animate bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300 cursor-pointer">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="font-medium mb-2 text-gray-900">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over ₹5,000</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300 cursor-pointer">
                <RotateCcw className="h-8 w-8" />
              </div>
              <h3 className="font-medium mb-2 text-gray-900">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300 cursor-pointer">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-medium mb-2 text-gray-900">Secure Payment</h3>
              <p className="text-sm text-gray-600">SSL encrypted checkout</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300 cursor-pointer">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-medium mb-2 text-gray-900">Premium Quality</h3>
              <p className="text-sm text-gray-600">Guaranteed authenticity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gray-50 scroll-animate">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4 text-gray-900">Stay Connected</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and style
            tips.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-light mb-6">VANITY</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Defining contemporary fashion with timeless elegance and sophisticated design.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSocialClick("Instagram")}
                  className="text-gray-400 hover:text-white transition-colors social-icon hover:scale-110 transform duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSocialClick("Facebook")}
                  className="text-gray-400 hover:text-white transition-colors social-icon hover:scale-110 transform duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSocialClick("Twitter")}
                  className="text-gray-400 hover:text-white transition-colors social-icon hover:scale-110 transform duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSocialClick("YouTube")}
                  className="text-gray-400 hover:text-white transition-colors social-icon hover:scale-110 transform duration-200"
                >
                  <Youtube className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/women"
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block"
                  >
                    Women's Collection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/men"
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block"
                  >
                    Men's Collection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accessories"
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-in"
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sale"
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => alert("Size Guide - This would open our comprehensive size guide")}
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block text-left"
                  >
                    Size Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Shipping Info - Details about our shipping policies and timelines")}
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block text-left"
                  >
                    Shipping Info
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Returns - Information about our 30-day return policy")}
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block text-left"
                  >
                    Returns
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("FAQ - Frequently asked questions and answers")}
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Contact Us - Get in touch with our customer service team")}
                    className="hover:text-white transition-colors footer-link hover:translate-x-1 transform duration-200 inline-block text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <button
                  onClick={() => handleContactClick("email", "hello@vanity.com")}
                  className="flex items-center space-x-3 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                >
                  <Mail className="h-4 w-4" />
                  <span>hello@vanity.com</span>
                </button>
                <button
                  onClick={() => handleContactClick("phone", "+919876543210")}
                  className="flex items-center space-x-3 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </button>
                <button
                  onClick={() => alert("Location: Mumbai, India - Visit our flagship store")}
                  className="flex items-center space-x-3 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Vanity. All rights reserved. |
              <button
                onClick={() => alert("Privacy Policy - Our commitment to protecting your privacy")}
                className="hover:text-white transition-colors ml-1 underline"
              >
                Privacy Policy
              </button>{" "}
              |
              <button
                onClick={() => alert("Terms of Service - Terms and conditions for using our website")}
                className="hover:text-white transition-colors ml-1 underline"
              >
                Terms of Service
              </button>
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Trigger */}
      <AIChatTrigger />
    </div>
  )
}
