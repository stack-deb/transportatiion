import Link from 'next/link'

const blogPosts = [
  { id: 1, title: "Best Practices for Packing Fragile Items", excerpt: "Learn how to ensure your delicate items arrive safely..." },
  { id: 2, title: "The Future of Logistics in India", excerpt: "Exploring upcoming trends in the transportation industry..." },
  { id: 3, title: "Sustainable Shipping: Reducing Your Carbon Footprint", excerpt: "Discover eco-friendly options for your cargo needs..." },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
        Latest from Our Blog
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-black to-green-500 dark:from-white dark:to-green-700 bg-clip-text text-transparent">
              {post.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
              Read more
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 font-semibold">
          View all posts
        </Link>
      </div>
    </section>
  )
}

