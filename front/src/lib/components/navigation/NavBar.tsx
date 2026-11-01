/* Way Canguk fork: one top bar with labelled links instead of the icon side
 * menu. Left: logo and the main sections (Data only for admins). Right: About
 * and the user menu side by side. */
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import classnames from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import useActiveUser from "@/app/hooks/api/useActiveUser";

import type { User } from "@/lib/types";

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
        "rounded-md px-3 py-2 text-sm font-semibold",
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
      <Menu.Button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200 dark:text-stone-300 dark:hover:bg-stone-700">
        <UserCircleIcon className="h-5 w-5" />
        {user?.username}
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
        <Menu.Items className="absolute right-0 z-50 mt-1 w-44 rounded-md border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-700 dark:bg-stone-800">
          <Menu.Item>
            {({ active }) => (
              <a
                href="/profile/"
                className={classnames(
                  item,
                  active && "bg-stone-100 dark:bg-stone-700",
                )}
              >
                Profil
              </a>
            )}
          </Menu.Item>
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
                Keluar
              </button>
            )}
          </Menu.Item>
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
      <div className="mx-auto flex max-w-7xl flex-row items-center gap-2 px-4 py-2">
        <a href="/" className="mr-4 flex items-center gap-2">
          <Image
            src="/waycanguk_icon.svg"
            alt=""
            width={36}
            height={36}
            priority
          />
          <span className="hidden whitespace-nowrap text-lg font-bold uppercase tracking-wide text-emerald-700 sm:inline dark:text-emerald-300">
            Anotasi Way Canguk
          </span>
        </a>
        <NavLink href="/" label="Beranda" active={pathname === "/"} />
        <NavLink
          href="/annotation_projects/"
          label="Proyek"
          active={pathname.startsWith("/annotation_projects")}
        />
        {isAdmin && (
          <NavLink
            href="/datasets/"
            label="Data"
            active={pathname.startsWith("/datasets")}
          />
        )}
        <div className="ml-auto flex items-center gap-1">
          <NavLink
            href="/about/"
            label="Tentang"
            active={pathname.startsWith("/about")}
          />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
}
