import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, MapPin, ThumbsUp } from "lucide-react"

const reasons = [
  {
    title: "Efficiency",
    description:
      "With our track record of on-time deliveries and secure handling, you can trust us with your valuable cargo.",
    icon: Shield,
  },
  {
    title: "Experience",
    description:
      "With years of experience in the logistics industry, we have built a reputation for reliable, seamless, and efficient cargo solutions.",
    icon: Clock,
  },
  {
    title: "Pan-India Network",
    description: "Our extensive network covers all major cities and rural locations across India.",
    icon: MapPin,
  },
  {
    title: "Customer Satisfaction",
    description: "We pride ourselves on our high customer satisfaction rates and personalized service.",
    icon: ThumbsUp,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Arihantcargomovers?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <reason.icon className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  {reason.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

