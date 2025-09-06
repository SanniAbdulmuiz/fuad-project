"use client";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/logo.svg";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { session } from "@/lib/session";

function SignInSubtitle() {
  const searchParams = useSearchParams();
  const resetLinkSent = searchParams.get('reset_link_sent');

  if (resetLinkSent) {
    return (
      <p className="text-primary">
        We've sent an email link to reset your password
      </p>
    );
  }

  return (
    <p className="text-gray-500">
      Sign in to your account
    </p>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: api.login,
    onSuccess: (data) => {
      toast.success("Login successful!");
      session.setToken(data.data.token);
      router.push("/dashboard");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login({ email, password, userType: "SUPERADMIN" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-[50px]">
        <div className="flex justify-center">
          <Image src={Logo} alt="Ker Active Logo" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <Suspense>
              <SignInSubtitle />
            </Suspense>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                placeholder="Password"
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm font-medium">
                  Remember me
                </Label>
              </div>
              <Link
                className="text-sm font-medium text-primary hover:underline"
                href={`/reset?email=${encodeURIComponent(email)}`}
              >
                Forgot password?
              </Link>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


