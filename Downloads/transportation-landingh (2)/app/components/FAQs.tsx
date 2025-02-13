import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We provide logistics services across all major cities and regions in India, including remote locations.",
  },
  {
    question: "How can I track my shipment?",
    answer:
      "You can track your shipment using the tracking number provided to you. Simply enter it on our website or mobile app for real-time updates.",
  },
  {
    question: "What types of goods do you transport?",
    answer:
      "We handle a wide range of goods, from small parcels to large industrial equipment. However, there are restrictions on hazardous materials and perishables.",
  },
  {
    question: "How do I get a quote for my shipment?",
    answer:
      "You can get a quote by filling out our online quote form, calling our customer service, or visiting one of our offices.",
  },
]

export default function FAQs() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

