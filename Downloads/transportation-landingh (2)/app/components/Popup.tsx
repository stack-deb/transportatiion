"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PopupProps {
  trigger: React.ReactNode
  content: string
  title: string
}

export function Popup({ trigger, content, title }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <span onClick={() => setIsOpen(true)} className="cursor-pointer text-blue-600 hover:underline">
        {trigger}
      </span>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">{content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

