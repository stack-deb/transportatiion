import Link from "next/link"

export default function FeaturedBlogs() {
  // In a real application, you would fetch featured blog posts here
  const featuredPosts = [
    { id: 1, title: "Featured Post 1" },
    { id: 2, title: "Featured Post 2" },
    { id: 3, title: "Featured Post 3" },
  ]

  return (
    <section>
      <h2>Featured Blogs</h2>
      <ul>
        {featuredPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

