import useActiveUser from "@/app/hooks/api/useActiveUser";

import { UserIcon } from "@/lib/components/icons";
import Description from "@/lib/components/ui/Description";
import Dialog from "@/lib/components/ui/Dialog";
import UserChangePassword from "@/lib/components/users/UserChangePassword";

import { t } from "@/lib/i18n";
import type { User } from "@/lib/types";

export default function UserProfile(props: { user: User }) {
  const { user } = props;

  const {
    update: { mutate: updateUser },
  } = useActiveUser();

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-end px-4 sm:px-0">
        <UserIcon className="w-12 h-12 text-stone-500 dark:text-stone-400" />
        <h3 className="text-base font-semibold leading-7 text-stone-900 dark:text-stone-200">
          {t("Profil kamu")}
        </h3>
      </div>
      <p className="text-stone-500 dark:text-stone-400">
        {t(
          "Nama tampil di bagian atas halaman. Nama pengguna dipakai untuk masuk dan tidak bisa diubah di sini.",
        )}
      </p>
      <div className="mt-6 border-t border-stone-300 dark:border-stone-700">
        <dl className="divide-y divide-stone-500">
          <div className="py-6 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <Description
              name={t("Nama pengguna")}
              value={user.username}
              type="text"
            />
          </div>
          <div className="py-6 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <Description
              name={t("Nama")}
              value={user.name ?? ""}
              onChange={(name) => updateUser({ name })}
              type="text"
              editable
            />
          </div>
          <div className="py-6 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <Description
              name="Email"
              value={user.email}
              onChange={(email) => updateUser({ email })}
              type="text"
              editable
            />
          </div>
        </dl>
        <Dialog
          mode="text"
          title={t("Ganti kata sandi")}
          label={t("Ganti kata sandi")}
        >
          {() => <UserChangePassword user={user} />}
        </Dialog>
      </div>
    </div>
  );
}
