"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/logo.svg";
import { api } from "@/lib/api";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [emailFromQuery]);

  const { mutate: requestReset, isPending } = useMutation({
    mutationFn: api.requestPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message || "If an account with that email exists, a password reset link has been sent.");
      router.push("/signin");
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
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    requestReset({ email });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <h2 className="text-3xl font-normal">Reset your password</h2>
        <p className="text-primary text-sm font-medium leading-4">
          We will send you an email to reset your password
        </p>
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
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Sending link..." : "Send link"}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-[50px]">
        <div className="flex justify-center">
          <Image src={Logo} alt="Ker Active Logo" />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}


