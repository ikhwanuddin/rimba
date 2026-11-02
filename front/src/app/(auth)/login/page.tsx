"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import api from "@/app/api";

import RimbaLogo from "@/lib/components/RimbaLogo";
import { Group, Input } from "@/lib/components/inputs/index";
import LanguageSwitch from "@/lib/components/navigation/LanguageSwitch";

import { t } from "@/lib/i18n";

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
          message: t("Nama pengguna atau kata sandi salah"),
        });
        setError("password", {
          message: t("Nama pengguna atau kata sandi salah"),
        });
        return Promise.reject(t("Nama pengguna atau kata sandi salah"));
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

  // RIMBA: project login page (no "create account" box; accounts are
  // made by the administrator).
  return (
    <div className="flex flex-col min-h-screen bg-emerald-50 dark:bg-stone-900">
      <div className="flex justify-end p-4">
        <LanguageSwitch />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        <RimbaLogo height={138} priority />
        <p className="-mt-6 max-w-sm text-center text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
          Rainforest Identification and Monitoring through Bioacoustic Analysis
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-80 flex flex-col gap-3 rounded-lg border border-emerald-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800"
        >
          <Group
            label={t("Nama pengguna")}
            name="username"
            error={errors.username?.message}
          >
            <Input autoComplete="username" {...register("username")} />
          </Group>
          <Group
            label={t("Kata sandi")}
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
            {t("Masuk")}
          </button>
        </form>
        <p className="w-80 text-center text-sm text-stone-600 dark:text-stone-400">
          {t("Belum punya akun?")}{" "}
          <a
            className="font-semibold text-emerald-700 underline dark:text-emerald-300"
            href="mailto:ri322@ic.ac.uk?subject=RIMBA"
          >
            {t("Hubungi pengelola proyek")}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
