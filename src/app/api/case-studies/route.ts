import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let query: any = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    
    console.log('Case Studies Query:', query);
    
    const caseStudies = await CaseStudy.find(query).sort({ createdAt: -1 });
    
    console.log(`Found ${caseStudies.length} case studies`);
    
    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch case studies',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
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
    
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    const caseStudy = await CaseStudy.create(data);
    
    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error('Error creating case study:', error);
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
  }
}