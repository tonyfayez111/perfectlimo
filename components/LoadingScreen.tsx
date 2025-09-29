'use client'

import { useEffect, useState } from 'react'
import { COMPANY_BRANDING, getBrandName } from '@/config/branding'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-red-gradient flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="flex items-center justify-center gap-3 mb-8">
          <i className={`${COMPANY_BRANDING.assets.logo.icon} text-5xl`}></i>
          <div className="text-4xl font-bold">
            {getBrandName('prefix')}<span className="font-light">{getBrandName('suffix')}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="w-64 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm mt-2 opacity-90">{progress}%</div>
        </div>
        
        <p className="text-lg opacity-90">Preparing your ultra-realistic limousine experience...</p>
      </div>
    </div>
  )
}
