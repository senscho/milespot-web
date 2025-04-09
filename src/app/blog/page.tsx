import { getBlogPosts } from '@/lib/strapi';
import { BlogPostPreview } from '../components/blog/BlogPost';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  console.log('Blog posts:', JSON.stringify(posts, null, 2));

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">블로그</h1>
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <BlogPostPreview key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
} 