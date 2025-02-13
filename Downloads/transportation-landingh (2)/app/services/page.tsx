import ServiceDescriptions from "../components/ServiceDescriptions"
import WhyChooseUs from "../components/WhyChooseUs"
import IndustryInsights from "../components/IndustryInsights"
import QuoteForm from "../components/QuoteForm"

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <ServiceDescriptions />
      <WhyChooseUs />
      <IndustryInsights />
      <div id="quote">
        <QuoteForm />
      </div>
    </main>
  )
}

