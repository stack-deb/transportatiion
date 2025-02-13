"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4">
      <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full">
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open live chat</span>
      </Button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Live Chat</h3>
          {/* Add chat interface here */}
        </div>
      )}
    </div>
  )
}

