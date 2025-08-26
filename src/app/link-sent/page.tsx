import Link from "next/link";

export default function LinkSentPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-sm space-y-4 border rounded p-6 text-center shadow-sm">
        <h1 className="text-xl font-semibold">Check your email</h1>
        <p className="text-gray-600 text-sm">
          If an account exists, we sent a password reset link to your inbox.
        </p>
        <div className="flex justify-center gap-3">
          <Link className="px-4 py-2 bg-black text-white rounded" href="/signin">Back to sign in</Link>
          <Link className="px-4 py-2 border rounded" href="/reset">Resend</Link>
        </div>
      </div>
    </main>
  );
}


