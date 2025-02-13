"use client"

import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { SearchBar } from "./components/SearchBar"
import { NewsletterSignup } from "./components/NewsletterSignup"
import BackToTopButton from "./components/BackToTopButton"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import "./globals.css"
import emailjs from "emailjs-com"
import { WhatsAppButton } from "./components/WhatsAppButton"

emailjs.init("vNZEpDxHVrmlxDRDm")

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Arihantcargomovers</title>
        <meta name="description" content="Efficient cargo solutions across India" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 flex-grow">
          <div className="my-4">
            <SearchBar />
          </div>
          <main>{children}</main>
          <div className="my-8">
            <NewsletterSignup />
          </div>
        </div>
        <Footer />
        <BackToTopButton />
        <Toaster />

        {/* Tawk.to Script */}
        <Script strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/YOUR_TAWK_TO_ID/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        <WhatsAppButton />
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
