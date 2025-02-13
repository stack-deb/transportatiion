"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for search results
const searchData = [
  { word: "Logistics", section: "Services" },
  { word: "Shipping", section: "Services" },
  { word: "Trucking", section: "Blog" },
  { word: "Warehousing", section: "Services" },
  { word: "Supply Chain", section: "Blog" },
  { word: "Freight", section: "Services" },
  { word: "Cargo", section: "Services" },
  { word: "Transportation", section: "Blog" },
]

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof searchData>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
    setShowSuggestions(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setSearchQuery(value)
    if (value.length > 0) {
      const filteredSuggestions = searchData.filter(
        (item) => item.word.toLowerCase().includes(value) || item.section.toLowerCase().includes(value),
      )
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      const selected = suggestions[selectedIndex]
      if (selected) {
        setSearchQuery(selected.word)
        setShowSuggestions(false)
      }
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          {suggestions.map((item, index) => (
            <Link
              key={index}
              href={`/${item.section.toLowerCase()}?search=${encodeURIComponent(item.word)}`}
              className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                index === selectedIndex ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
              onClick={() => setShowSuggestions(false)}
            >
              <span>{item.word}</span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{item.section}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

