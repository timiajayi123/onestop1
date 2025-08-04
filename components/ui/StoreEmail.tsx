'use client';

import { useEffect } from 'react';
import { account } from '@/lib/appwriteConfig';

export default function StoreEmail() {
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const user = await account.get();
        localStorage.setItem('email', user.email); // ✅ Store in localStorage
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    };

    fetchEmail();
  }, []);

  return null; // Nothing to render
}
