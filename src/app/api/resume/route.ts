import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Resume from '@/models/Resume';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }
    
    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
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
    
    // Delete existing resume and create new one (only one resume should exist)
    await Resume.deleteMany({});
    const resume = await Resume.create(data);
    
    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const data = await request.json();
    const resume = await Resume.findOneAndUpdate({}, data, { new: true, upsert: true });
    
    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 });
  }
}