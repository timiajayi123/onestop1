'use client';

import { account } from '@/lib/appwriteConfig';
import { OAuthProvider } from 'appwrite';

export default function SignInPage() {
  const signInWithGoogle = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      'http://localhost:3000/account', // success redirect
      'http://localhost:3000/login'    // failure redirect
    );
  };

  return (
    <div className="h-screen flex">
      {/* LEFT SIDE - Sign In */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
          <button
  onClick={signInWithGoogle}
  className="flex items-center justify-center gap-2 w-full border border-gray-300 bg-white text-sm text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 transition"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google logo"
    className="w-5 h-5"
  />
  Sign in with Google
</button>
<br />



        </div>
      </div>

      {/* RIGHT SIDE - Image (same as signup) */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src="/images/banner-signup.png" // using the same signup image
          alt="Sign In Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
