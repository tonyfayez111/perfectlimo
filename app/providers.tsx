'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  loading: boolean
  setLoading: (loading: boolean) => void
  showMessage: (message: string, type: 'success' | 'error') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a Providers')
  }
  return context
}

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <AppContext.Provider value={{ loading, setLoading, showMessage }}>
      {children}
      {message && (
        <div
          className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg font-semibold animate-slideInRight ${
            message.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {message.text}
        </div>
      )}
    </AppContext.Provider>
  )
}
