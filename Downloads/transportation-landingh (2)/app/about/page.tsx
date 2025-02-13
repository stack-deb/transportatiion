import OurStory from "../components/OurStory"
import Achievements from "../components/Achievements"
import QuoteForm from "../components/QuoteForm"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Arihantcargomovers</h1>
      <OurStory />
      <Achievements />
      <QuoteForm />
    </main>
  )
}

