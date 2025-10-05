import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import SuccessStory from '@/models/SuccessStory';
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
    
    const successStory = await SuccessStory.findById(params.id);
    
    if (!successStory) {
      return NextResponse.json({ error: 'Success story not found' }, { status: 404 });
    }
    
    return NextResponse.json(successStory);
  } catch (error) {
    console.error('Error fetching success story:', error);
    return NextResponse.json({ error: 'Failed to fetch success story' }, { status: 500 });
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
    const successStory = await SuccessStory.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!successStory) {
      return NextResponse.json({ error: 'Success story not found' }, { status: 404 });
    }
    
    return NextResponse.json(successStory);
  } catch (error) {
    console.error('Error updating success story:', error);
    return NextResponse.json({ error: 'Failed to update success story' }, { status: 500 });
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
    
    const successStory = await SuccessStory.findByIdAndDelete(params.id);
    
    if (!successStory) {
      return NextResponse.json({ error: 'Success story not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Success story deleted successfully' });
  } catch (error) {
    console.error('Error deleting success story:', error);
    return NextResponse.json({ error: 'Failed to delete success story' }, { status: 500 });
  }
}