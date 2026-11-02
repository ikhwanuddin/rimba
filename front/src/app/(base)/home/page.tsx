"use client";

/* RIMBA: the old placeholder page; the dashboard lives at "/". */
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => router.replace("/"), [router]);
  return null;
}
