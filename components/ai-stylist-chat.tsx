"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  X,
  Sparkles,
  Heart,
  Sun,
  Coffee,
  Briefcase,
  PartyPopper,
  Camera,
  ShoppingBag,
  Zap,
  Bot,
  User,
  Smile,
  Meh,
  ThumbsUp,
} from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: StyleSuggestion[]
  mood?: string
  occasion?: string
}

interface StyleSuggestion {
  id: string
  name: string
  image: string
  price: string
  category: string
  description: string
  moodMatch: number
}

interface AIStylistChatProps {
  isOpen: boolean
  onClose: () => void
}

export function AIStylistChat({ isOpen, onClose }: AIStylistChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I'm Aria, your personal AI stylist! 👋 I'm here to help you find the perfect outfit based on your mood and occasion. How are you feeling today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const moods = [
    { id: "happy", name: "Happy", icon: Smile, color: "bg-yellow-100 text-yellow-800", emoji: "😊" },
    { id: "confident", name: "Confident", icon: ThumbsUp, color: "bg-slate-100 text-slate-800", emoji: "💪" },
    { id: "romantic", name: "Romantic", icon: Heart, color: "bg-rose-100 text-rose-800", emoji: "💕" },
    { id: "relaxed", name: "Relaxed", icon: Meh, color: "bg-green-100 text-green-800", emoji: "😌" },
    { id: "energetic", name: "Energetic", icon: Zap, color: "bg-orange-100 text-orange-800", emoji: "⚡" },
    { id: "sophisticated", name: "Sophisticated", icon: Sparkles, color: "bg-gray-100 text-gray-800", emoji: "✨" },
  ]

  const occasions = [
    { id: "work", name: "Work", icon: Briefcase, color: "bg-gray-100 text-gray-800" },
    { id: "date", name: "Date Night", icon: Heart, color: "bg-red-100 text-red-800" },
    { id: "party", name: "Party", icon: PartyPopper, color: "bg-indigo-100 text-indigo-800" },
    { id: "casual", name: "Casual Day", icon: Coffee, color: "bg-amber-100 text-amber-800" },
    { id: "formal", name: "Formal Event", icon: Sparkles, color: "bg-slate-100 text-slate-800" },
    { id: "weekend", name: "Weekend", icon: Sun, color: "bg-yellow-100 text-yellow-800" },
  ]

  const styleSuggestions: StyleSuggestion[] = [
    {
      id: "1",
      name: "Classic Blazer",
      image: "/images/product-1.jpg",
      price: "₹12,500",
      category: "Blazers",
      description: "Perfect for confident, professional looks",
      moodMatch: 95,
    },
    {
      id: "2",
      name: "Silk Shirt",
      image: "/images/product-2.jpg",
      price: "₹8,500",
      category: "Shirts",
      description: "Elegant and sophisticated for any occasion",
      moodMatch: 88,
    },
    {
      id: "3",
      name: "Designer Dress",
      image: "/images/product-3.jpg",
      price: "₹18,000",
      category: "Dresses",
      description: "Romantic and feminine for special moments",
      moodMatch: 92,
    },
    {
      id: "4",
      name: "Evening Gown",
      image: "/images/product-5.jpg",
      price: "₹25,000",
      category: "Gowns",
      description: "Glamorous and sophisticated for formal events",
      moodMatch: 96,
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const generateAIResponse = (userMessage: string, mood?: string, occasion?: string) => {
    setIsTyping(true)

    setTimeout(() => {
      let response = ""
      let suggestions: StyleSuggestion[] = []

      // Convert user message to lowercase for better matching
      const message = userMessage.toLowerCase()

      if (mood && occasion) {
        response = `Perfect! Based on your ${mood} mood and ${occasion} occasion, I've curated some amazing pieces that will make you feel absolutely stunning! ✨`

        // Filter suggestions based on mood and occasion
        if (mood === "confident" && occasion === "work") {
          suggestions = styleSuggestions
            .filter((item) => item.category === "Blazers" || item.category === "Shirts")
            .slice(0, 3)
        } else if (mood === "romantic" && (occasion === "date" || occasion === "formal")) {
          suggestions = styleSuggestions
            .filter((item) => item.category === "Dresses" || item.category === "Gowns")
            .slice(0, 3)
        } else if (mood === "sophisticated" && occasion === "formal") {
          suggestions = styleSuggestions
            .filter((item) => item.category === "Gowns" || item.category === "Blazers")
            .slice(0, 3)
        } else {
          suggestions = styleSuggestions.slice(0, 3)
        }
      } else if (mood) {
        response = `I love that you're feeling ${mood}! What's the occasion? This will help me suggest the perfect pieces for you! 💫`
      } else if (occasion) {
        response = `Great choice for ${occasion}! How are you feeling today? Your mood will help me personalize the perfect look for you! 🎨`
      } else {
        // Handle various user queries
        if (message.includes("color") || message.includes("colour")) {
          response =
            "Colors can totally transform your mood! What's your favorite color family? I can suggest pieces that will complement your style perfectly! 🌈"
        } else if (message.includes("budget") || message.includes("price") || message.includes("cost")) {
          response =
            "I understand budget is important! Our pieces range from ₹5,000 to ₹30,000. Let me know your budget range and I'll find amazing pieces that give you the best value! 💰"
        } else if (message.includes("size") || message.includes("fit")) {
          response =
            "Size is so important for the perfect fit! Have you tried our virtual try-on feature? It helps ensure you get the perfect size every time! 📏"
        } else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
          response =
            "Hello there! I'm so excited to help you find the perfect outfit! Tell me, how are you feeling today and what's the occasion? ✨"
        } else if (message.includes("help") || message.includes("assist")) {
          response =
            "I'm here to help you look absolutely amazing! I can suggest outfits based on your mood, occasion, budget, and style preferences. What would you like to explore? 💫"
        } else if (message.includes("recommend") || message.includes("suggest")) {
          response =
            "I'd love to give you personalized recommendations! First, let me know your current mood and what occasion you're dressing for! 🎯"
          suggestions = styleSuggestions.slice(0, 2) // Show some general suggestions
        } else {
          response =
            "I'd love to help you find the perfect outfit! Tell me about your mood and what occasion you're dressing for, and I'll create a personalized style just for you! ✨"
        }
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: response,
        timestamp: new Date(),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
        mood,
        occasion,
      }

      setMessages((prev) => [...prev, newMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    generateAIResponse(inputMessage, selectedMood || undefined, selectedOccasion || undefined)
    setInputMessage("")
  }

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    const moodObj = moods.find((m) => m.id === mood)
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `I'm feeling ${moodObj?.name.toLowerCase()} ${moodObj?.emoji}`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    generateAIResponse(`feeling ${mood}`, mood, selectedOccasion || undefined)
  }

  const handleOccasionSelect = (occasion: string) => {
    setSelectedOccasion(occasion)
    const occasionObj = occasions.find((o) => o.id === occasion)
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `I need an outfit for ${occasionObj?.name.toLowerCase()}`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    generateAIResponse(`outfit for ${occasion}`, selectedMood || undefined, occasion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleAddToCart = (suggestion: StyleSuggestion) => {
    alert(`Added "${suggestion.name}" to cart for ${suggestion.price}!`)
    console.log('Added to cart:', suggestion)
  }

  const handleTryOn = (suggestion: StyleSuggestion) => {
    alert(`Opening virtual try-on for "${suggestion.name}"`)
    console.log('Try on:', suggestion)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-900 to-black text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Aria - AI Stylist</h3>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Online & Ready to Style</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <div className={`flex items-start gap-2 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" ? "bg-gray-200" : "bg-gradient-to-r from-gray-900 to-black"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="h-4 w-4 text-gray-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.type === "user"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>

                {/* Style Suggestions */}
                {message.suggestions && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-600 font-medium">✨ Personalized Recommendations</p>
                    {message.suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex gap-3">
                          <div className="w-16 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={suggestion.image || "/placeholder.svg"}
                              alt={suggestion.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">{suggestion.name}</h4>
                            <p className="text-xs text-gray-600 mb-1">{suggestion.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{suggestion.price}</span>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                <span className="text-xs text-green-600">{suggestion.moodMatch}% match</span>
                              </div>
                            </div>
                            <div className="flex gap-1 mt-2">
                              <Button
                                size="sm"
                                className="text-xs px-2 py-1 h-6 bg-black hover:bg-gray-800 text-white"
                                onClick={() => handleAddToCart(suggestion)}
                              >
                                <ShoppingBag className="h-3 w-3 mr-1" />
                                Add to Cart
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs px-2 py-1 h-6 bg-transparent"
                                onClick={() => handleTryOn(suggestion)}
                              >
                                <Camera className="h-3 w-3 mr-1" />
                                Try On
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-900 to-black flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-4 py-2 border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {!selectedMood && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2 font-medium">How are you feeling today?</p>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((mood) => {
                const Icon = mood.icon
                return (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`${mood.color} px-2 py-1 rounded-lg text-xs font-medium hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1`}
                  >
                    <span>{mood.emoji}</span>
                    <span className="hidden sm:inline">{mood.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {selectedMood && !selectedOccasion && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600 mb-2 font-medium">What's the occasion?</p>
            <div className="grid grid-cols-2 gap-2">
              {occasions.map((occasion) => {
                const Icon = occasion.icon
                return (
                  <button
                    key={occasion.id}
                    onClick={() => handleOccasionSelect(occasion.id)}
                    className={`${occasion.color} px-3 py-2 rounded-lg text-xs font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2`}
                  >
                    <Icon className="h-3 w-3" />
                    {occasion.name}
                  \
