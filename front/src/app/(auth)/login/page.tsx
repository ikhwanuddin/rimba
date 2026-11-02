"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import api from "@/app/api";

import { Group, Input } from "@/lib/components/inputs/index";

const schema = z.object({
  username: z.string(),
  password: z.string(),
});
type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    api.auth
      .login(data)
      .catch(() => {
        reset();
        setError("username", {
          message: "Nama pengguna atau kata sandi salah",
        });
        setError("password", {
          message: "Nama pengguna atau kata sandi salah",
        });
        return Promise.reject("Nama pengguna atau kata sandi salah");
      })
      .then(() => {
        const back = params.get("back");
        if (back) {
          router.push(back);
        } else {
          router.push("/");
        }
      });
  };

  // Way Canguk fork: project login page (no "create account" box; accounts are
  // made by the administrator).
  return (
    <div className="flex flex-col min-h-screen bg-emerald-50 dark:bg-stone-900">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        <Image
          src="/waycanguk_logo.svg"
          alt="Anotasi Kicau Burung Way Canguk"
          width={420}
          height={131}
          priority
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-80 flex flex-col gap-3 rounded-lg border border-emerald-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800"
        >
          <Group
            label="Nama pengguna"
            name="username"
            error={errors.username?.message}
          >
            <Input autoComplete="username" {...register("username")} />
          </Group>
          <Group
            label="Kata sandi"
            name="password"
            error={errors.password?.message}
          >
            <Input
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
          </Group>
          <button
            type="submit"
            className="mt-2 rounded-md bg-emerald-700 px-4 py-2 font-bold text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            Masuk
          </button>
        </form>
        <p className="w-80 text-center text-sm text-stone-600 dark:text-stone-400">
          Belum punya akun? Hubungi pengelola proyek.
        </p>
      </div>
      <footer className="p-4 text-center text-xs text-stone-500">
        Dibangun di atas{" "}
        <a className="underline" href="https://github.com/mbsantiago/whombat">
          Whombat
        </a>{" "}
        © Martínez Balvanera et al., GPL-3.0 ·{" "}
        <a
          className="underline"
          href="https://github.com/ikhwanuddin/whombat/tree/waycanguk"
        >
          kode sumber
        </a>
      </footer>
    </div>
  );
}
