import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Technology from '@/models/Technology';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query: any = {};
    if (category) query.category = category;
    
    const technologies = await Technology.find(query).sort({ proficiency: -1, name: 1 });
    
    return NextResponse.json(technologies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch technologies' }, { status: 500 });
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
    const technology = await Technology.create(data);
    
    return NextResponse.json(technology, { status: 201 });
  } catch (error) {
    console.error('Error creating technology:', error);
    return NextResponse.json({ error: 'Failed to create technology' }, { status: 500 });
  }
}