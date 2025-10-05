import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get all case studies with detailed info
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      count: caseStudies.length,
      caseStudies: caseStudies,
      message: `Found ${caseStudies.length} case studies in database`
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch case studies',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}