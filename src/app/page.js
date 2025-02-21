'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import Hero from '@/components/Hero'
import Features from '@/components/Features'

export default function Home() {
  const { user, isAdmin } = useSelector(state => state.auth);

  // If user is logged in, redirect appropriately
  if (user && isAdmin) {
    redirect('/admin');
  } else if (user) {
    redirect('/dashboard');
  }

  // For non-authenticated users, show the landing page
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
    </div>
  );
}
