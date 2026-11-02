"use client";

/* RIMBA: contact goes through the project manager; see the About page. */
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Contact() {
  const router = useRouter();
  useEffect(() => router.replace("/about/"), [router]);
  return null;
}
