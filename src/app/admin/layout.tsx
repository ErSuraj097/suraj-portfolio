import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Portfolio',
  description: 'Admin dashboard for managing portfolio content',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}