import { Suspense } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboard />
      </Suspense>
    </div>
  );
}