import { MapPin } from "lucide-react"

export default function WhereWeServe() {
  const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Pune"]

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Where We Serve</h2>
        <p className="text-center mb-8">From bustling metros to growing tier-2 cities, we cover all of India</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
            >
              <MapPin className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>{location}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

