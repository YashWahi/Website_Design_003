"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, X, Download, Share2, Zap, Sparkles, Eye, Ruler } from "lucide-react"

interface VirtualTryOnProps {
  productName: string
  productImage: string
  category: "Women" | "Men" | "Accessories"
  onClose: () => void
}

export function VirtualTryOn({ productName, productImage, category, onClose }: VirtualTryOnProps) {
  const [isActive, setIsActive] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [currentFilter, setCurrentFilter] = useState("realistic")
  const [showMeasurements, setShowMeasurements] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const filters = [
    { id: "realistic", name: "Realistic", icon: Eye },
    { id: "enhanced", name: "Enhanced", icon: Sparkles },
    { id: "studio", name: "Studio", icon: Zap },
  ]

  const measurements = {
    Women: {
      chest: "34-36 inches",
      waist: "26-28 inches",
      hips: "36-38 inches",
      recommended: "Size M",
    },
    Men: {
      chest: "38-40 inches",
      waist: "32-34 inches",
      shoulders: "17-18 inches",
      recommended: "Size L",
    },
    Accessories: {
      wrist: "6.5-7 inches",
      neck: "14-15 inches",
      recommended: "One Size",
    },
  }

  useEffect(() => {
    if (isActive) {
      startCamera()
      // Simulate AI processing
      const timer = setInterval(() => {
        setConfidence((prev) => Math.min(prev + 10, 95))
      }, 200)
      return () => clearInterval(timer)
    }
  }, [isActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraReady(true)
      }
    } catch (error) {
      console.error("Camera access denied:", error)
      // Simulate camera for demo
      setIsCameraReady(true)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    setIsActive(false)
    setIsCameraReady(false)
    setConfidence(0)
  }

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)

        // Simulate download
        const link = document.createElement("a")
        link.download = `virtual-tryOn-${productName}.png`
        link.href = canvas.toDataURL()
        link.click()
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-light tracking-wide">VIRTUAL TRY-ON</h2>
              <p className="text-sm text-gray-600">{productName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200">AI Powered</Badge>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Camera View */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
              {!isActive ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Camera className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-light mb-2">Ready to Try On?</h3>
                  <p className="text-gray-300 text-center mb-6 max-w-md">
                    Position yourself in front of the camera and see how {productName} looks on you with our AI-powered
                    virtual fitting.
                  </p>
                  <Button
                    onClick={() => setIsActive(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    START TRY-ON
                  </Button>
                </div>
              ) : (
                <>
                  <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* AR Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Virtual Product Overlay */}
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <img
                          src={productImage || "/placeholder.svg"}
                          alt={productName}
                          className="w-32 h-40 object-cover opacity-80 mix-blend-multiply"
                          style={{
                            filter: `${currentFilter === "enhanced" ? "brightness(1.2) contrast(1.1)" : ""} ${
                              currentFilter === "studio" ? "brightness(1.1) saturate(1.2)" : ""
                            }`,
                          }}
                        />
                        {/* Fitting indicators */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-2 border-green-400 rounded-full animate-pulse" />
                      </div>
                    </div>

                    {/* Measurement Lines */}
                    {showMeasurements && (
                      <div className="absolute inset-0">
                        <svg className="w-full h-full">
                          <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                            </marker>
                          </defs>
                          <line
                            x1="20%"
                            y1="30%"
                            x2="80%"
                            y2="30%"
                            stroke="#10b981"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                          <line
                            x1="20%"
                            y1="50%"
                            x2="80%"
                            y2="50%"
                            stroke="#10b981"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                          <line
                            x1="20%"
                            y1="70%"
                            x2="80%"
                            y2="70%"
                            stroke="#10b981"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                    <Button
                      size="icon"
                      className="bg-white/90 hover:bg-white text-black rounded-full"
                      onClick={capturePhoto}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-white/90 hover:bg-white text-black rounded-full"
                      onClick={() => setShowMeasurements(!showMeasurements)}
                    >
                      <Ruler className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="bg-white/90 hover:bg-white text-black rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full"
                      onClick={stopCamera}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Confidence Indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-3 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">AI Fitting</span>
                    </div>
                    <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-300"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-300">{confidence}% confident</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Filter Options */}
            <div>
              <h3 className="text-lg font-light tracking-wide mb-4">RENDERING MODE</h3>
              <div className="space-y-2">
                {filters.map((filter) => {
                  const Icon = filter.icon
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setCurrentFilter(filter.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                        currentFilter === filter.id
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{filter.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Size Recommendations */}
            <div>
              <h3 className="text-lg font-light tracking-wide mb-4">SIZE ANALYSIS</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {Object.entries(measurements[category]).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 capitalize">{key}:</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium text-green-800">Perfect Fit Detected</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Based on AI analysis, this size should fit you perfectly.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-light tracking-wide mb-4">QUICK ACTIONS</h3>
              <div className="space-y-3">
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  <Sparkles className="h-4 w-4 mr-2" />
                  ADD TO CART
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  SHARE TRY-ON
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  SAVE PHOTO
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Stand 2-3 feet from camera</li>
                <li>• Ensure good lighting</li>
                <li>• Keep arms slightly away from body</li>
                <li>• Look straight at camera</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
