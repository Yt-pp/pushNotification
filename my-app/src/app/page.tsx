'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {

      router.replace('/user/login'); // Redirect to user login page if no token
    
  }, [router]);

  return null; // Optionally return null or a loading spinner while redirecting
}
