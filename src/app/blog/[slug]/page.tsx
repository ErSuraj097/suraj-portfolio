import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  category: string;
  readTime: number;
  createdAt: string;
  published: boolean;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blogs/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} - Suraj Yadav Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center space-x-4 text-gray-600 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              className="text-gray-700 leading-relaxed"
            />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    <Tag size={12} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
      <Footer />
    </main>
  );
}