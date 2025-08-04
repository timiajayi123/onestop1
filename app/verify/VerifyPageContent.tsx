'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { account } from '@/lib/appwriteConfig';

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const userId = params.get('userId');
  const secret = params.get('secret');
  const [message, setMessage] = useState('Verifying...');

  
  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !secret) {
        setMessage('Invalid verification link.');
        return;
      }

      try {
        await account.updateVerification(userId, secret);
        setMessage('Email verified! Redirecting...');
        setTimeout(() => {
          router.push('/login'); // Redirect after success
        }, 2000);
      } catch (error: any) {
        console.error(error);
        setMessage('Verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [userId, secret, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
