import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';
import mongoose from 'mongoose';

export async function GET(
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
    
    const caseStudy = await CaseStudy.findById(params.id);
    
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 });
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
    const caseStudy = await CaseStudy.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
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
    
    const caseStudy = await CaseStudy.findByIdAndDelete(params.id);
    
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 });
  }
}