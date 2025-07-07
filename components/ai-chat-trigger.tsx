"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Sparkles, Bot, X } from "lucide-react"
import { AIStylistChat } from "./ai-stylist-chat"

export function AIChatTrigger() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)

  const openChat = () => {
    setIsChatOpen(true)
    setHasNewMessage(false)
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Notification Badge */}
          {hasNewMessage && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          )}

          {/* Chat Button */}
          <Button
            onClick={openChat}
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group relative z-50"
          >
            <div className="relative">
              <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </Button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Bot className="h-3 w-3" />
                <span>Chat with AI Stylist</span>
              </div>
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>
          </div>
        </div>

        {/* Pulsing Ring Animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 to-black animate-ping opacity-20"></div>
      </div>

      {/* Welcome Message Popup */}
      {hasNewMessage && !isChatOpen && (
        <div className="fixed bottom-24 right-6 z-30 animate-in slide-in-from-bottom-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-900 to-black rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">Aria - AI Stylist</span>
                  <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Hi! I'm here to help you find the perfect outfit based on your mood! ✨
                </p>
                <Button onClick={openChat} size="sm" className="bg-black hover:bg-gray-800 text-white text-xs">
                  Start Styling
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHasNewMessage(false)}
                className="h-6 w-6 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Stylist Chat Modal */}
      <AIStylistChat isOpen={isChatOpen} onClose={closeChat} />
    </>
  )
}
