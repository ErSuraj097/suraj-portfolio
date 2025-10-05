import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Project from '@/models/Project';
import CaseStudy from '@/models/CaseStudy';
import Contact from '@/models/Contact';
import Technology from '@/models/Technology';
import Gallery from '@/models/Gallery';

export async function GET() {
  try {
    await connectDB();

    const [
      blogsCount,
      projectsCount,
      caseStudiesCount,
      contactsCount,
      technologiesCount,
      galleryCount,
    ] = await Promise.all([
      Blog.countDocuments(),
      Project.countDocuments(),
      CaseStudy.countDocuments(),
      Contact.countDocuments(),
      Technology.countDocuments(),
      Gallery.countDocuments(),
    ]);

    return NextResponse.json({
      blogs: blogsCount,
      projects: projectsCount,
      caseStudies: caseStudiesCount,
      contacts: contactsCount,
      technologies: technologiesCount,
      gallery: galleryCount,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}