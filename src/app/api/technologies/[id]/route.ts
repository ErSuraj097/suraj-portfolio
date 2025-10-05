import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Technology from '@/models/Technology';
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
    
    const technology = await Technology.findById(params.id);
    
    if (!technology) {
      return NextResponse.json({ error: 'Technology not found' }, { status: 404 });
    }
    
    return NextResponse.json(technology);
  } catch (error) {
    console.error('Error fetching technology:', error);
    return NextResponse.json({ error: 'Failed to fetch technology' }, { status: 500 });
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
    const technology = await Technology.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!technology) {
      return NextResponse.json({ error: 'Technology not found' }, { status: 404 });
    }
    
    return NextResponse.json(technology);
  } catch (error) {
    console.error('Error updating technology:', error);
    return NextResponse.json({ error: 'Failed to update technology' }, { status: 500 });
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
    
    const technology = await Technology.findByIdAndDelete(params.id);
    
    if (!technology) {
      return NextResponse.json({ error: 'Technology not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Technology deleted successfully' });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return NextResponse.json({ error: 'Failed to delete technology' }, { status: 500 });
  }
}