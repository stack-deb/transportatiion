import { MapPin, Package, Clock, Truck } from 'lucide-react'

export default function Features() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCard
        icon={<MapPin className="w-12 h-12 text-blue-600 dark:text-blue-400" />}
        title="Pan-India Coverage"
        description="We deliver to all states and union territories"
      />
      <FeatureCard
        icon={<Package className="w-12 h-12 text-blue-600 dark:text-blue-400" />}
        title="Diverse Cargo Types"
        description="From small parcels to industrial equipment"
      />
      <FeatureCard
        icon={<Clock className="w-12 h-12 text-blue-600 dark:text-blue-400" />}
        title="24/7 Support"
        description="Round-the-clock customer service for your convenience"
      />
      <FeatureCard
        icon={<Truck className="w-12 h-12 text-blue-600 dark:text-blue-400" />}
        title="On-Time Delivery"
        description="Punctual and reliable transportation services"
      />
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
        {title}
      </h4>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

