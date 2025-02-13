"use client"

import { Popup } from "../components/Popup"

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms & Conditions</h1>
      <div className="prose max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the services provided by Arihantcargomovers, you agree to comply with and be bound by
          these Terms & Conditions.
        </p>

        <h2>2. Service Description</h2>
        <p>
          Arihantcargomovers provides logistics and transportation services across India. The specific details of our
          services are outlined on our website and in our service agreements.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          Users are responsible for providing accurate information when using our services, including but not limited to
          shipment details, contact information, and delivery addresses.
        </p>

        <h2>4. Pricing and Payment</h2>
        <p>
          Prices for our services are as quoted on our website or in personalized quotes. Payment terms are specified in
          our invoices and service agreements.
        </p>

        <h2>5. Liability</h2>
        <p>
          Arihantcargomovers' liability is limited as per industry standards and applicable laws. We are not responsible
          for damages or losses outside our control. For more information, please refer to our{" "}
          <Popup
            trigger="Liability Policy"
            title="Liability Policy"
            content="Our liability is limited to the terms specified in our service agreement. We are not responsible for any damages or losses caused by events beyond our control, including but not limited to natural disasters, strikes, or government actions."
          />
          .
        </p>

        <h2>6. Claims</h2>
        <p>
          In the event of loss or damage to your shipment, please refer to our{" "}
          <Popup
            trigger="Claims Process"
            title="Claims Process"
            content="To file a claim, please contact our customer service within 7 days of delivery. Provide all relevant documentation, including photos of damaged goods and original packaging. Our team will review your claim and respond within 14 business days."
          />{" "}
          for information on how to file a claim.
        </p>

        <h2>7. Privacy Policy</h2>
        <p>
          Our privacy policy, which explains how we collect, use, and protect your personal information, is an integral
          part of these Terms & Conditions.
        </p>

        <h2>8. Modifications to Terms</h2>
        <p>
          Arihantcargomovers reserves the right to modify these Terms & Conditions at any time. Users will be notified
          of significant changes.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive
          jurisdiction of the courts in Mumbai, India.
        </p>
      </div>
    </main>
  )
}

