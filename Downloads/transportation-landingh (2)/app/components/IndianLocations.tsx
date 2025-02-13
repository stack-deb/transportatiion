export default function IndianLocations() {
  return (
    <section className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
        Serving All of India
      </h3>
      <p className="text-xl mb-8">From the bustling streets of Mumbai to the serene backwaters of Kerala, we've got India covered!</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        <LocationBadge name="Delhi" />
        <LocationBadge name="Mumbai" />
        <LocationBadge name="Kolkata" />
        <LocationBadge name="Chennai" />
        <LocationBadge name="Bangalore" />
        <LocationBadge name="Hyderabad" />
        <LocationBadge name="Ahmedabad" />
        <LocationBadge name="Pune" />
      </div>
    </section>
  )
}

function LocationBadge({ name }) {
  return (
    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-4 py-2 text-sm font-semibold">
      {name}
    </div>
  )
}

