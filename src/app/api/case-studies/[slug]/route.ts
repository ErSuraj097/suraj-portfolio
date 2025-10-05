import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const caseStudy = await CaseStudy.findOne({ slug: params.slug });
    
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 });
  }
}