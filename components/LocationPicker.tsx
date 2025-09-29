'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })

// Import Leaflet only on client side
let L: any = null

interface LocationPickerProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  error?: string
  required?: boolean
}

interface LocationData {
  lat: number
  lng: number
  address: string
}

export default function LocationPicker({
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false
}: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Default to Cairo, Egypt
  const defaultPosition: [number, number] = [30.0444, 31.2357]

  // Initialize Leaflet only on client side
  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      L = require('leaflet')
      require('leaflet/dist/leaflet.css')
      
      // Fix for default markers in react-leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })
    }
  }, [])

  useEffect(() => {
    if (value && !location) {
      // Try to geocode the existing value
      geocodeAddress(value)
    }
  }, [value])

  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=eg`
      )
      const data = await response.json()
      
      if (data.length > 0) {
        const result = data[0]
        setLocation({
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          address: result.display_name
        })
      }
    } catch (error) {
      console.error('Geocoding error:', error)
    }
  }

  const searchAddresses = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=eg&addressdetails=1`
      )
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onChange(query)
    searchAddresses(query)
  }

  const handleResultSelect = (result: any) => {
    const address = result.display_name
    setSearchQuery(address)
    onChange(address)
    setLocation({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: address
    })
    setSearchResults([])
    // Don't close the map, just center on the selected location
  }

  const handleMapClick = (lat: number, lng: number) => {
    // Reverse geocode to get address
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    )
      .then(response => response.json())
      .then(data => {
        const address = data.display_name
        setSearchQuery(address)
        onChange(address)
        setLocation({ lat, lng, address })
        setIsOpen(false)
      })
      .catch(error => console.error('Reverse geocoding error:', error))
  }

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="relative">
        <label className="block text-sm font-semibold text-perfect-gray mb-2">
          {label} {required && <span className="text-perfect-red">*</span>}
        </label>
        <div className="input-field flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-perfect-red mr-2"></div>
          Loading map...
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-perfect-gray mb-2">
        {label} {required && <span className="text-perfect-red">*</span>}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery || value}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`input-field pr-20 ${error ? 'border-perfect-red' : ''}`}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-perfect-gray hover:text-perfect-red transition-colors"
            title="Open Map"
          >
            <i className="fas fa-map-marker-alt"></i>
          </button>
          
     
        </div>
      </div>

      {error && (
        <p className="text-perfect-red text-sm mt-1">{error}</p>
      )}

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleResultSelect(result)}
              className="w-full text-left px-4 py-2 hover:bg-perfect-light-gray border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-sm">{result.display_name}</div>
              {result.address && (
                <div className="text-xs text-perfect-text-gray">
                  {result.address.city || result.address.town || result.address.village}
                  {result.address.state && `, ${result.address.state}`}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Map Modal */}
      {isOpen && isClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[500px] relative">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Select Location on Map</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-perfect-gray hover:text-perfect-red"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            {/* Map Search Bar */}
            <div className="p-4 border-b bg-perfect-light-gray">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      searchAddresses(e.target.value)
                    }}
                    placeholder="🔍 Search for a location in Egypt (e.g., Cairo Airport, Pyramids, Tahrir Square)..."
                    className="w-full input-field pr-12 text-sm"
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {isSearching && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-perfect-red"></div>
                    )}
                    <i className="fas fa-search text-perfect-gray"></i>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setSearchResults([])
                  }}
                  className="px-3 py-2 text-perfect-gray hover:text-perfect-red transition-colors text-sm"
                  title="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              {/* Search Results in Map */}
              {searchResults.length > 0 && (
                <div className="mt-3 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="p-2 text-xs text-perfect-text-gray border-b">
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    Found {searchResults.length} location{searchResults.length !== 1 ? 's' : ''} - Click to select
                  </div>
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleResultSelect(result)}
                      className="w-full text-left px-4 py-3 hover:bg-perfect-light-gray border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-sm text-perfect-gray">{result.display_name}</div>
                      {result.address && (
                        <div className="text-xs text-perfect-text-gray mt-1">
                          <i className="fas fa-map-pin mr-1"></i>
                          {result.address.city || result.address.town || result.address.village}
                          {result.address.state && `, ${result.address.state}`}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Search Tips */}
              {searchResults.length === 0 && searchQuery.length > 0 && !isSearching && (
                <div className="mt-2 text-xs text-perfect-text-gray">
                  <i className="fas fa-lightbulb mr-1"></i>
                  Try searching for: "Cairo Airport", "Pyramids of Giza", "Tahrir Square", "Alexandria", "Sharm El Sheikh"
                </div>
              )}
            </div>
            
            <div className="h-80 relative">
              <MapContainer
                center={location ? [location.lat, location.lng] : defaultPosition}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapClickHandler onMapClick={handleMapClick} />
                <MapCenter center={location ? [location.lat, location.lng] : defaultPosition} />
                
                {location && (
                  <Marker position={[location.lat, location.lng]} />
                )}
              </MapContainer>
              
              {/* Floating Search Button on Map */}
              <div className="absolute top-4 right-4 z-[1000]">
                <button
                  type="button"
                  onClick={() => {
                    const searchInput = document.querySelector('input[placeholder*="Search for a location"]') as HTMLInputElement
                    if (searchInput) {
                      searchInput.focus()
                      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  }}
                  className="bg-white hover:bg-perfect-light-gray text-perfect-gray hover:text-perfect-red shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-105"
                  title="Focus search bar"
                >
                  <i className="fas fa-search text-lg"></i>
                </button>
              </div>
              
              {/* Map Controls Info */}
              <div className="absolute bottom-4 left-4 z-[1000] bg-white bg-opacity-90 rounded-lg p-2 text-xs text-perfect-text-gray">
                <div className="flex items-center gap-2">
                  <i className="fas fa-mouse-pointer text-perfect-red"></i>
                  <span>Click to select</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <i className="fas fa-search text-perfect-red"></i>
                  <span>Search above</span>
                </div>
              </div>
            </div>
            
            {/* Map Instructions */}
            <div className="p-3 bg-perfect-light-gray text-center text-sm text-perfect-text-gray">
              <i className="fas fa-info-circle mr-2"></i>
              Click anywhere on the map to select a location, or search for a specific address above
            </div>
          </div>
        </div>
      )}

      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-perfect-red"></div>
        </div>
      )}
    </div>
  )
}

// Component to handle map clicks
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  const { useMapEvents } = require('react-leaflet')
  useMapEvents({
    click: (e: any) => {
      onMapClick(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}

// Component to center map on location
function MapCenter({ center }: { center: [number, number] }) {
  const { useMap } = require('react-leaflet')
  const map = useMap()
  
  useEffect(() => {
    if (center) {
      map.setView(center, 15)
    }
  }, [center, map])
  
  return null
}
