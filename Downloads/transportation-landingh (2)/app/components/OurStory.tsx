import Image from "next/image"

export default function OurStory() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg"
              alt="Arihantcargomovers history"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <p className="mb-4">
              Founded in 2005, Arihantcargomovers started as a small local logistics company in Mumbai. Our founder,
              Rajesh Arihant, saw the need for a reliable and efficient cargo transportation service in the rapidly
              growing Indian market.
            </p>
            <p className="mb-4">
              Over the years, we've expanded our operations to cover all of India, investing in cutting-edge technology
              and building a team of dedicated professionals. Our commitment to excellence and customer satisfaction has
              been the driving force behind our growth.
            </p>
            <p>
              Today, Arihantcargomovers is proud to be one of India's leading logistics providers, offering a wide range
              of services to businesses of all sizes. We continue to innovate and adapt to the changing needs of the
              industry, always with our customers' success in mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

