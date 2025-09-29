'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ClientReviews from './ClientReviews'

export default function RealisticLimousine() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showReviews, setShowReviews] = useState(false)
  const [isVideoClicked, setIsVideoClicked] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showQuote, setShowQuote] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Video control functions
  let reverseInterval: NodeJS.Timeout | null = null
  
  const playVideoForward = () => {
    const video = videoRef.current
    if (!video) return
    
    console.log('▶️ Playing video forward')
    setIsHovering(true)
    
    // Clear any reverse interval
    if (reverseInterval) {
      clearInterval(reverseInterval)
      reverseInterval = null
    }
    
    video.playbackRate = 1.0
    video.currentTime = 0
    video.play().catch(console.error)
  }
  
  const playVideoBackward = () => {
    const video = videoRef.current
    if (!video || reverseInterval) return
    
    console.log('◀️ Playing video backward')
    setIsHovering(false)
    
    // Start from current position and play backward
    video.pause()
    
    if (video.currentTime <= 0) {
      video.currentTime = video.duration
    }
    
    reverseInterval = setInterval(() => {
      if (video.currentTime <= 0) {
        if (reverseInterval) {
          clearInterval(reverseInterval)
          reverseInterval = null
        }
        return
      }
      video.currentTime = Math.max(0, video.currentTime - 0.033) // ~30fps backward
    }, 33)
  }

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    
    if (!video || !container) return

    // Setup video event handlers
    const handleLoadedMetadata = () => {
      console.log('📹 Video loaded, duration:', video.duration)
      setVideoLoaded(true)
      setShowQuote(true)
    }

    // Hover interactions
    const handleMouseEnter = () => {
      playVideoForward()
    }

    const handleMouseLeave = () => {
      playVideoBackward()
    }

    // Touch interactions for mobile
    const handleTouchStart = () => {
      playVideoForward()
    }

    const handleTouchEnd = () => {
      playVideoBackward()
    }

    // Click interaction
    const handleClick = () => {
      setIsVideoClicked(true)
      setShowReviews(true)
      
      // Click animation
      gsap.to(video, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })
    }

    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('mouseenter', handleMouseEnter)
    video.addEventListener('mouseleave', handleMouseLeave)
    video.addEventListener('touchstart', handleTouchStart)
    video.addEventListener('touchend', handleTouchEnd)
    video.addEventListener('click', handleClick)

    // Entrance animation
    gsap.fromTo(container, 
      { 
        opacity: 0, 
        scale: 0.8, 
        y: 50 
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 1.5, 
        ease: "power2.out",
        delay: 0.5 
      }
    )

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('mouseenter', handleMouseEnter)
      video.removeEventListener('mouseleave', handleMouseLeave)
      video.removeEventListener('touchstart', handleTouchStart)
      video.removeEventListener('touchend', handleTouchEnd)
      video.removeEventListener('click', handleClick)
      
      if (reverseInterval) {
        clearInterval(reverseInterval)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Quote - appears above video */}
      {videoLoaded && showQuote && (
        <div className="flex-shrink-0 px-2 sm:px-4 pt-2 sm:pt-4 pb-2">
          <div className="max-w-xl sm:max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm text-perfect-gray px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl sm:rounded-2xl shadow-xl border-l-4 border-perfect-red transform transition-all duration-1000 translate-y-0 opacity-100 scale-100">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="text-perfect-red text-lg sm:text-xl md:text-2xl mt-1 flex-shrink-0">
                  <i className="fas fa-quote-left"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                    "Your comfort is our priority — because every journey should feel as smooth as home."
                  </p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3 text-xs sm:text-sm text-perfect-text-gray">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-perfect-red rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      PE
                    </div>
                    <span className="font-semibold text-xs sm:text-sm">Perfect Limo Egypt Representative</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Container - responsive sizing */}
      <div 
        ref={containerRef}
        className="relative flex-1 flex items-center justify-center px-2 sm:px-4 py-2 sm:py-4"
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
          src="/samy-video.mp4"
          muted
          playsInline
          preload="metadata"
          style={{
            width: '95%',
            height: 'auto',
            maxHeight: '30vh'
          }}
        />
      </div>
      
      {/* Loading indicator */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading video...</p>
            <p className="text-sm opacity-80 mt-2">samy-video.mp4</p>
          </div>
        </div>
      )}
 


     
    </div>
  )
}
