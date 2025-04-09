import { getBlogPosts } from '@/lib/strapi';
import { markdownToHtml } from '@/lib/markdown';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  // Convert markdown to HTML for all posts
  const postsWithHtml = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      contentHtml: await markdownToHtml(post.Content)
    }))
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">블로그</h1>
      <div className="grid gap-12">
        {postsWithHtml.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{post.Title}</h2>
              <div className="text-gray-500 mb-6">
                {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-gray-900 prose-em:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:border-blue-200 prose-blockquote:rounded-lg prose-blockquote:p-4 prose-code:bg-gray-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 