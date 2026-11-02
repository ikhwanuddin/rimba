/* RIMBA: one top bar with labelled links instead of the icon side
 * menu. Left: logo, Beranda, and for admins a "Kelola" menu that explains its two
 * parts (audio recordings are the material, annotation projects are the work).
 * Annotators reach their projects from Beranda. Right: About and the user menu. */
import icon from "@/assets/rimba_icon.svg";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import useActiveUser from "@/app/hooks/api/useActiveUser";

import ThemeSwitch from "@/lib/components/navigation/ThemeSwitch";

import { t } from "@/lib/i18n";
import type { User } from "@/lib/types";

import LanguageSwitch from "./LanguageSwitch";

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={classnames(
        "rounded-md px-2 py-2 text-sm font-semibold sm:px-3",
        active
          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100"
          : "text-stone-700 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-700",
      )}
    >
      {label}
    </a>
  );
}

function UserMenu({ user, onLogout }: { user?: User; onLogout?: () => void }) {
  const {
    logout: { mutate: logout },
  } = useActiveUser({ user, onLogout });
  const item =
    "group flex w-full items-center rounded-md px-3 py-2 text-sm text-stone-700 dark:text-stone-200";
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm font-semibold sm:px-3 text-stone-700 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-700">
        <UserCircleIcon className="h-5 w-5" />
        <span className="hidden max-w-[12rem] truncate sm:inline">
          {user?.name || user?.username}
        </span>
        <ChevronDownIcon className="h-4 w-4" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-1 w-60 rounded-md border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-700 dark:bg-stone-800">
          <Menu.Item>
            {({ active }) => (
              <a
                href="/profile/"
                className={classnames(
                  item,
                  active && "bg-stone-100 dark:bg-stone-700",
                )}
              >
                {t("Profil")}
              </a>
            )}
          </Menu.Item>
          <ThemeSwitch />
          <div className="my-1 border-t border-stone-200 dark:border-stone-700" />
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                onClick={() => logout()}
                className={classnames(
                  item,
                  active && "bg-stone-100 dark:bg-stone-700",
                )}
              >
                {t("Keluar")}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const MANAGE = [
  {
    href: "/datasets/",
    label: "1. Rekaman audio",
    note: "File audio yang terdaftar di server. Bahan untuk membuat proyek.",
  },
  {
    href: "/annotation_projects/",
    label: "2. Proyek anotasi",
    note: "Pekerjaan anotasi: klip yang ditanyakan, label, petunjuk, dan jawaban.",
  },
];

function ManageMenu({ active }: { active: boolean }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={classnames(
          "inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm font-semibold sm:px-3",
          active
            ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100"
            : "text-stone-700 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-700",
        )}
      >
        {t("Kelola")}
        <ChevronDownIcon className="h-4 w-4" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-50 mt-1 w-80 rounded-lg border border-stone-200 bg-white p-1.5 shadow-lg dark:border-stone-700 dark:bg-stone-800">
          {MANAGE.map((m) => (
            <Menu.Item key={m.href}>
              {({ active }) => (
                <a
                  href={m.href}
                  className={classnames(
                    "flex flex-col rounded-md px-3 py-2",
                    active && "bg-emerald-50 dark:bg-stone-700",
                  )}
                >
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {t(m.label)}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {t(m.note)}
                  </span>
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function NavBar({
  user,
  onLogout,
}: {
  user: User;
  onLogout?: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const isAdmin = user?.is_superuser === true;
  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur dark:border-stone-700 dark:bg-stone-900/95">
      <div className="mx-auto flex max-w-7xl flex-row items-center gap-0.5 px-2 py-2 sm:gap-2 sm:px-4">
        <a href="/" className="mr-1 flex flex-none items-center gap-2 sm:mr-4">
          <Image src={icon} alt="" width={36} height={36} priority />
          <span className="hidden whitespace-nowrap text-lg font-bold uppercase tracking-wide text-emerald-700 sm:inline dark:text-emerald-300">
            RIMBA
          </span>
        </a>
        <NavLink href="/" label={t("Beranda")} active={pathname === "/"} />
        {isAdmin && (
          <ManageMenu
            active={
              pathname.startsWith("/annotation_projects") ||
              pathname.startsWith("/datasets")
            }
          />
        )}
        <div className="ml-auto flex flex-none items-center gap-0.5 sm:gap-1">
          <NavLink
            href="/about/"
            label={t("Tentang")}
            active={pathname.startsWith("/about")}
          />
          <LanguageSwitch />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
}
