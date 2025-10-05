import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query: any = {};
    if (status) query.status = status;
    
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    
    const contact = await Contact.create(data);
    
    // Here you could add email notification logic
    // await sendEmailNotification(contact);
    
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}