import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import useActiveUser from "@/app/hooks/api/useActiveUser";

import { Group, Input } from "@/lib/components/inputs/index";

import { t } from "@/lib/i18n";
import type { User } from "@/lib/types";

const schema = z
  .object({
    password: z.string().min(8, "Minimal 8 karakter"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Kata sandi tidak sama",
    path: ["password2"],
  });

type FormData = z.infer<typeof schema>;

export default function UserChangePassword(props: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const {
    update: { mutate: updateUser },
  } = useActiveUser({ user: props.user });

  const handleChangePassword = (data: FormData) => {
    updateUser(
      { password: data.password },
      { onSuccess: () => toast.success(t("Kata sandi diganti.")) },
    );
  };

  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <div className="mb-3">
        <Group
          label={t("Kata sandi baru")}
          name="password"
          error={errors.password?.message && t(errors.password.message)}
        >
          <Input type="password" {...register("password")} />
        </Group>
      </div>
      <div className="mb-3">
        <Group
          label={t("Ulangi kata sandi baru")}
          name="password2"
          error={errors.password2?.message && t(errors.password2.message)}
        >
          <Input type="password" {...register("password2")} />
        </Group>
      </div>
      <div>
        <Input type="submit" value={t("Simpan")} />
      </div>
    </form>
  );
}
