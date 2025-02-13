"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

  const handleGetQuote = () => {
    router.push("/services#quote")
    // Add a small delay to ensure the page has loaded before scrolling
    setTimeout(() => {
      const quoteSection = document.getElementById("quote")
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-lg shadow-lg overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-2 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-10"></div>
        ))}
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
          Efficient Service That Fits Your Budget
        </h1>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          Reliable logistics solutions tailored to your needs
        </p>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={handleGetQuote}
        >
          Get Quote Now
        </Button>
      </div>
    </section>
  )
}

