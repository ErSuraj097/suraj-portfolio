import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import OurStory from '@/models/OurStory';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    
    const storyItem = await OurStory.findById(params.id);
    
    if (!storyItem) {
      return NextResponse.json({ error: 'Story item not found' }, { status: 404 });
    }
    
    return NextResponse.json(storyItem);
  } catch (error) {
    console.error('Error fetching story item:', error);
    return NextResponse.json({ error: 'Failed to fetch story item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    
    const data = await request.json();
    const storyItem = await OurStory.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!storyItem) {
      return NextResponse.json({ error: 'Story item not found' }, { status: 404 });
    }
    
    return NextResponse.json(storyItem);
  } catch (error) {
    console.error('Error updating story item:', error);
    return NextResponse.json({ error: 'Failed to update story item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }
    
    const storyItem = await OurStory.findByIdAndDelete(params.id);
    
    if (!storyItem) {
      return NextResponse.json({ error: 'Story item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Story item deleted successfully' });
  } catch (error) {
    console.error('Error deleting story item:', error);
    return NextResponse.json({ error: 'Failed to delete story item' }, { status: 500 });
  }
}