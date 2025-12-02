"use client";

import { redirect } from "next/navigation";

export default function ResetPasswordPage() {
  // Agar koi /reset-password without token kholta hai
  redirect("/login-register");

  // React ko kuch render karne ki zarurat nahi
  return null;
}
