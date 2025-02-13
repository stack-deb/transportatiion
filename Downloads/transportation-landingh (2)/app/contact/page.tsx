import ContactForm from "../components/ContactForm"
import GoogleMap from "../components/GoogleMap"
import FAQs from "../components/FAQs"

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactForm />
        <GoogleMap />
      </div>
      <FAQs />
    </main>
  )
}

