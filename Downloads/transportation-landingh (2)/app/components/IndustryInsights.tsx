import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const insights = [
  {
    title: "E-commerce Boom",
    content:
      "The rapid growth of e-commerce in India has led to increased demand for efficient logistics solutions. We're at the forefront of this revolution, offering tailored services for online retailers.",
  },
  {
    title: "Technology Integration",
    content:
      "The logistics industry is embracing digital transformation. Our investment in cutting-edge technology ensures real-time tracking, efficient route planning, and seamless communication.",
  },
  {
    title: "Sustainability Focus",
    content:
      "There's a growing emphasis on sustainable logistics practices. We're committed to reducing our carbon footprint through eco-friendly vehicles and optimized routes.",
  },
  {
    title: "Last-Mile Delivery",
    content:
      "With the rise of doorstep deliveries, last-mile logistics has become crucial. Our specialized last-mile services ensure your products reach customers quickly and efficiently.",
  },
]

export default function IndustryInsights() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Industry Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{insight.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

