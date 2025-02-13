"use client"

import Mermaid from "react-mermaid2"

export default function SiteFlowchart() {
  const flowchartDefinition = `
    graph TD
    A[Home Page] --> B((Hero Section))
    A --> C[Get Your Quote Form]
    A --> D[Our Services Overview]
    A --> E[Where We Serve]
    A --> F[Our Process]
    A --> G[Featured Blogs]
    A --> H[Trusted Partners]
    A --> I[About Us Snippet]
    A --> J[Footer]

    B --> C
    B --> D
    C --> K((Confirmation Modal))
    D --> L[Services Page]
    E --> M[Regional Details]
    G --> N[Blog Posts]
    I --> O[About Us Page]
    J --> A
    J --> L
    J --> P[Blog Section]
    J --> O
    J --> Q[Terms & Conditions]
    J --> R[Contact Us]

    L --> S[Service Descriptions]
    L --> T[Why Choose Us?]
    L --> U[Industry Insights]
    S --> C
    T --> O
    U --> N

    P --> V[Blog Listing]
    V --> W[Single Blog Post]
    W --> X((Like and Comment))
    W --> Y((Social Sharing))
    W --> V

    O --> Z[Our Story]
    O --> AA[Team]
    O --> AB[Achievements]
    O --> C

    R --> AC[Contact Form]
    R --> AD[Google Map]
    AC --> AE((Submission Confirmation))

    AF((Search Bar)) --> A
    AG((Live Chat)) --> A

    AH[Newsletter Signup] --> AI((Thank You Modal))

    classDef page fill:#3498db,stroke:#2980b9,stroke-width:2px;
    classDef element fill:#e67e22,stroke:#d35400,stroke-width:2px;
    classDef external fill:#2ecc71,stroke:#27ae60,stroke-width:2px;

    class A,L,P,O,Q,R page;
    class B,C,K,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI element;
    class M,N external;
  `

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
          Site Structure
        </h2>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg overflow-x-auto">
          <Mermaid chart={flowchartDefinition} />
        </div>
      </div>
    </section>
  )
}

