import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query: any = {};
    if (category) query.category = category;
    
    const successStories = await SuccessStory.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(successStories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch success stories' }, { status: 500 });
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
    const successStory = await SuccessStory.create(data);
    
    return NextResponse.json(successStory, { status: 201 });
  } catch (error) {
    console.error('Error creating success story:', error);
    return NextResponse.json({ error: 'Failed to create success story' }, { status: 500 });
  }
}