import { Package, Truck, Clipboard, Home } from "lucide-react"

export default function OurProcess() {
  const steps = [
    { icon: Package, title: "Pickup", description: "We collect your goods from your location" },
    { icon: Clipboard, title: "Documentation", description: "We handle all necessary paperwork" },
    { icon: Truck, title: "Transportation", description: "Your goods are safely transported" },
    { icon: Home, title: "Delivery", description: "We ensure timely delivery to the destination" },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                <step.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

