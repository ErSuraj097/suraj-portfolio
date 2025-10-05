'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  category: string;
  readTime: number;
  createdAt: string;
  published: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blogs?published=true');
      const data = await response.json();
      setPosts(data.slice(0, 6)); // Show only latest 6 posts
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on AI/ML, backend development, 
            and the latest trends in technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {post.coverImage && (
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Clock size={14} />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center space-x-1 text-gray-500 text-sm mb-4">
                  <Calendar size={14} />
                  <span>{formatDate(post.createdAt)}</span>
                </div>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        <Tag size={12} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            <span>View All Posts</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;