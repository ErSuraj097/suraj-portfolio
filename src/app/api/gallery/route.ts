import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let query: any = { published: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const gallery = await Gallery.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const data = await request.json();
    const galleryItem = await Gallery.create(data);

    return NextResponse.json(galleryItem, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
