export default function VerifySuccess() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Email Verified ✅</h1>
        <p className="mt-2">You can now sign in to your account.</p>
        <a
          href="/signin"
          className="mt-4 inline-block text-blue-600 underline"
        >
          Go to Sign In
        </a>
      </div>
    </div>
  );
}
