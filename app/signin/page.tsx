'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account, ID } from '@/lib/appwriteConfig';
import { OAuthProvider } from 'appwrite';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function SignInPage() {
  const [name, setName] = useState(''); // ✅ Full name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await account.createSession(email, password);
      const user = await account.get();

      if (!user.emailVerification) {
        await account.deleteSession('current');
        toast.error('Please verify your email first.');
        return;
      }
    localStorage.setItem('email', user.email);
      toast.success('Signed in!');
      router.push('/account');
    } catch (err: any) {
      if (err.message?.toLowerCase().includes('user')) {
        try {
          await account.create(ID.unique(), email, password, name || 'User'); // ✅ Use name
          await account.createSession(email, password);

          await account.createVerification(`${window.location.origin}/verify`);
              localStorage.setItem('email', email);

          toast.success('Account created! Please check your email to verify.');
        } catch (signUpErr: any) {
          toast.error(signUpErr.message || 'Signup failed.');
        }
      } else {
        toast.error(err.message || 'Login failed.');
      }
    }
  };

const signInWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/account`,
      `${window.location.origin}/signin`
    );

    // After redirect back to /account, you'll want to fetch user info and save email.
    // You could do this in your /account page or a useEffect hook there:
  } catch (error) {
    toast.error('Google sign-in failed.');
  }
};

  return (
    <div className="h-screen flex bg-gray-100">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Welcome Back</h2>

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Full name (required for sign-up)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Sign In / Sign Up
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600 text-center">— or —</div>

          {/* Google Sign-In */}
          <button
            onClick={signInWithGoogle}
            className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-300 bg-white text-sm text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src="/images/banner-signup.png"
          alt="Sign In Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
