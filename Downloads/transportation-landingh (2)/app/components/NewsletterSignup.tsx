"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Store submission in Supabase
      const { data, error } = await supabase.from("forms").insert([
        {
          type: "newsletter",
          data: { email },
        },
      ])

      if (error) throw error

      setIsSubmitted(true)
      console.log("Signing up with email:", email)
    } catch (error) {
      console.error("Submission error:", error)
      // You might want to show an error message to the user here
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
        <p className="text-green-800 dark:text-green-100">Thank you for signing up!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold">Sign up for our newsletter</h3>
      <div className="flex space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  )
}

