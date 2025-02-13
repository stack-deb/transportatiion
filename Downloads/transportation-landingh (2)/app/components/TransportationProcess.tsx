import { Package, Clock, Truck, Home, Clipboard, Wrench, Building, Cpu } from 'lucide-react'

const processes = [
  {
    title: "Household Goods",
    steps: [
      { text: "We pack your belongings", icon: <Package className="w-10 h-10 text-blue-600 dark:text-blue-400" /> },
      { text: "Provide estimated delivery time", icon: <Clock className="w-10 h-10 text-green-600 dark:text-green-400" /> },
      { text: "Load onto our vehicles", icon: <Truck className="w-10 h-10 text-yellow-600 dark:text-yellow-400" /> },
      { text: "Secure delivery to destination", icon: <Home className="w-10 h-10 text-red-600 dark:text-red-400" /> }
    ]
  },
  {
    title: "Industrial Goods",
    steps: [
      { text: "Assess and plan logistics", icon: <Clipboard className="w-10 h-10 text-blue-600 dark:text-blue-400" /> },
      { text: "Specialized packaging", icon: <Wrench className="w-10 h-10 text-green-600 dark:text-green-400" /> },
      { text: "Secure loading and transport", icon: <Truck className="w-10 h-10 text-yellow-600 dark:text-yellow-400" /> },
      { text: "On-time delivery and setup", icon: <Building className="w-10 h-10 text-red-600 dark:text-red-400" /> }
    ]
  },
  {
    title: "Corporate Relocation",
    steps: [
      { text: "Detailed inventory and planning", icon: <Clipboard className="w-10 h-10 text-blue-600 dark:text-blue-400" /> },
      { text: "Systematic packing and labeling", icon: <Package className="w-10 h-10 text-green-600 dark:text-green-400" /> },
      { text: "Coordinated transport", icon: <Truck className="w-10 h-10 text-yellow-600 dark:text-yellow-400" /> },
      { text: "Setup at new location", icon: <Cpu className="w-10 h-10 text-red-600 dark:text-red-400" /> }
    ]
  }
]

export default function TransportationProcess() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-12 text-center bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
        Our Transportation Process
      </h3>
      <div className="space-y-16">
        {processes.map((process, index) => (
          <div key={index} className="mb-12">
            <h4 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
              {process.title}
            </h4>
            <div className="flex flex-wrap justify-center items-start gap-8">
              {process.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex flex-col items-center max-w-[200px]">
                  <div className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-full shadow-md">
                    {step.icon}
                  </div>
                  <p className="text-center text-gray-700 dark:text-gray-300">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

