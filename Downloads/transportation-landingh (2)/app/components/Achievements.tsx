import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Truck, Users, TrendingUp } from "lucide-react"

const achievements = [
  {
    title: "1 Million+ Deliveries",
    description: "Successfully completed over a million deliveries across India.",
    icon: Truck,
  },
  {
    title: "98% Customer Satisfaction",
    description: "Consistently maintaining high customer satisfaction rates.",
    icon: Users,
  },
  {
    title: "Industry Awards",
    description: "Recognized with multiple awards for excellence in logistics.",
    icon: Award,
  },
  {
    title: "25% YoY Growth",
    description: "Achieving steady growth and expanding our services each year.",
    icon: TrendingUp,
  },
]

export default function Achievements() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <achievement.icon className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                  {achievement.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

