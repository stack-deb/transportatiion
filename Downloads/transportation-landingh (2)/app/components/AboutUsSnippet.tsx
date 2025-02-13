import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutUsSnippet() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/images/about-us-image.jpg"
            alt="About Arihantcargomovers"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">About Arihantcargomovers</h2>
          <p className="mb-4">
            With years of experience in the logistics industry, Arihantcargomovers is committed to providing efficient
            and reliable cargo solutions across India. Our dedication to customer satisfaction and innovative approach
            sets us apart in the transportation sector.
          </p>
          <Link href="/about">
            <Button variant="outline">Learn More About Us</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

