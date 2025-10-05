import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import OurStory from '@/models/OurStory';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const ourStory = await OurStory.find({ published: true }).sort({ order: 1 });

    return NextResponse.json(ourStory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch our story' }, { status: 500 });
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
    const storyItem = await OurStory.create(data);

    return NextResponse.json(storyItem, { status: 201 });
  } catch (error) {
    console.error('Error creating story item:', error);
    return NextResponse.json({ error: 'Failed to create story item' }, { status: 500 });
  }
}
