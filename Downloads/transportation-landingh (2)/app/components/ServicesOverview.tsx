import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Package, Warehouse } from "lucide-react"

export default function ServicesOverview() {
  const services = [
    { title: "Full Truckload", description: "Dedicated trucks for large shipments", icon: Truck },
    { title: "Less Than Truckload", description: "Cost-effective for smaller shipments", icon: Package },
    { title: "Warehousing", description: "Secure storage solutions", icon: Warehouse },
  ]

  return (
    <section className="py-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <service.icon className="mr-2 h-6 w-6" />
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/services"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-semibold hover:underline"
        >
          View All Services
        </Link>
      </div>
    </section>
  )
}

