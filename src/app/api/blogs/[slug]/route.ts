import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug: params.slug, published: true });
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}