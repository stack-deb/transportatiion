import Image from "next/image"

const partners = [
  { name: "Company A", logo: "/images/partner-a-logo.png" },
  { name: "Company B", logo: "/images/partner-b-logo.png" },
  { name: "Company C", logo: "/images/partner-c-logo.png" },
  { name: "Company D", logo: "/images/partner-d-logo.png" },
]

export default function TrustedPartners() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Trusted Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} width={100} height={50} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

