"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import emailjs from "emailjs-com"
import { supabase } from "@/lib/supabase"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await emailjs.send(
        "service_i4k3pfa",
        "template_7gbsopj",
        {
          from_name: formData.name,
          to_name: "Abhishek",
          from_email: formData.email,
          to_email: "abhishekpalboxer@gmail.com",
          subject: formData.subject,
          message: formData.message,
        },
        "vNZEpDxHVrmlxDRDm",
      )
      console.log("EmailJS Response:", response)

      if (response.status !== 200) {
        throw new Error("Email service failed")
      }

      // Store submission in Supabase
      const { data, error } = await supabase.from("forms").insert([
        {
          type: "contact",
          data: formData,
        },
      ])

      if (error) throw error

      toast({
        title: "Message Sent",
        description: "We'll get back to you soon.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}

