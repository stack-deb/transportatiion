"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ErrorMessage } from "./ErrorMessage"
import emailjs from "emailjs-com"
import { supabase } from "@/lib/supabase"

const goodsTypes = [
  "Household Goods",
  "Office Equipment",
  "Electronics",
  "Vehicles",
  "Machinery",
  "Perishables",
  "Hazardous Materials",
  "Other",
]

export default function QuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    originCity: "",
    destinationCity: "",
    goodsType: "",
    customGoodsType: "",
    weight: "",
    additionalDetails: "",
    name: "",
    mobile: "",
    email: "",
    address: "",
    pinCode: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    // Clear the error for this field when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, goodsType: value }))
    setErrors((prevErrors) => ({ ...prevErrors, goodsType: "" }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (step === 1) {
      if (!formData.originCity) newErrors.originCity = "Origin city is required"
      if (!formData.destinationCity) newErrors.destinationCity = "Destination city is required"
      if (!formData.goodsType) newErrors.goodsType = "Goods type is required"
      if (formData.goodsType === "Other" && !formData.customGoodsType) {
        newErrors.customGoodsType = "Please specify the goods type"
      }
      if (!formData.weight) newErrors.weight = "Weight is required"
    } else {
      if (!formData.name) newErrors.name = "Name is required"
      if (!formData.mobile) newErrors.mobile = "Mobile number is required"
      if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Invalid mobile number"
      if (!formData.email) newErrors.email = "Email is required"
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address"
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.pinCode) newErrors.pinCode = "Pin code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    if (step === 1) {
      setStep(2)
    } else {
      setIsSubmitting(true)
      try {
        // Send email using EmailJS
        const emailResponse = await emailjs.send(
          "service_i4k3pfa",
          "template_7gbsopj",
          {
            from_name: formData.name,
            to_name: "Abhishek",
            from_email: formData.email,
            to_email: "abhishekpalboxer@gmail.com",
            message: `
              Origin City: ${formData.originCity}
              Destination City: ${formData.destinationCity}
              Goods Type: ${formData.goodsType === "Other" ? formData.customGoodsType : formData.goodsType}
              Weight: ${formData.weight}
              Additional Details: ${formData.additionalDetails}
              Mobile: ${formData.mobile}
              Address: ${formData.address}
              Pin Code: ${formData.pinCode}
            `,
          },
          "vNZEpDxHVrmlxDRDm",
        )

        console.log("EmailJS Response:", emailResponse)

        if (emailResponse.status !== 200) {
          throw new Error("Email service failed")
        }

        // Store submission in Supabase
        const { data, error } = await supabase.from("forms").insert([
          {
            type: "quote",
            data: formData,
          },
        ])

        if (error) throw error

        toast({
          title: "✓ Request Sent",
          description: "We'll contact you within 24 hours",
        })

        // Reset form
        setFormData({
          originCity: "",
          destinationCity: "",
          goodsType: "",
          customGoodsType: "",
          weight: "",
          additionalDetails: "",
          name: "",
          mobile: "",
          email: "",
          address: "",
          pinCode: "",
        })
        setStep(1)
      } catch (error) {
        console.error("Submission error:", error)
        toast({
          title: "Submission Failed",
          description: "Please check your details and try again",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section className="bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8">
      <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
        Get Your Quote
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {step === 1 ? (
          <>
            <div>
              <ErrorMessage message={errors.originCity} />
              <Input name="originCity" placeholder="Origin City" value={formData.originCity} onChange={handleChange} />
            </div>
            <div>
              <ErrorMessage message={errors.destinationCity} />
              <Input
                name="destinationCity"
                placeholder="Destination City"
                value={formData.destinationCity}
                onChange={handleChange}
              />
            </div>
            <div>
              <ErrorMessage message={errors.goodsType} />
              <Select onValueChange={handleSelectChange} value={formData.goodsType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Goods Type" />
                </SelectTrigger>
                <SelectContent>
                  {goodsTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.goodsType === "Other" && (
              <div>
                <ErrorMessage message={errors.customGoodsType} />
                <Input
                  name="customGoodsType"
                  placeholder="Specify Goods Type"
                  value={formData.customGoodsType}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <ErrorMessage message={errors.weight} />
              <Input
                name="weight"
                type="number"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                name="additionalDetails"
                placeholder="Additional Details"
                value={formData.additionalDetails}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="md:col-span-2 bg-green-700 hover:bg-green-800 text-white dark:bg-green-600 dark:hover:bg-green-700"
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <div>
              <ErrorMessage message={errors.name} />
              <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <ErrorMessage message={errors.mobile} />
              <Input name="mobile" type="tel" placeholder="Mobile" value={formData.mobile} onChange={handleChange} />
            </div>
            <div>
              <ErrorMessage message={errors.email} />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <ErrorMessage message={errors.address} />
              <Input name="address" placeholder="Current Address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <ErrorMessage message={errors.pinCode} />
              <Input name="pinCode" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} />
            </div>
            <Button
              type="submit"
              className="md:col-span-2 bg-green-700 hover:bg-green-800 text-white dark:bg-green-600 dark:hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </>
        )}
      </form>
    </section>
  )
}

