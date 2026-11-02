"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useCallback, useContext } from "react";
import toast from "react-hot-toast";
import { HotkeysProvider } from "react-hotkeys-hook";

import useActiveUser from "@/app/hooks/api/useActiveUser";

import Loading from "@/app/loading";

import { RimbaIcon } from "@/lib/components/icons";
import { NavBar } from "@/lib/components/navigation/NavBar";

import UserContext from "../contexts/user";

function WithLogIn({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const currentPath = `${pathname}${params ? `?${params}` : ""}`;

  const {
    data: user,
    isLoading,
    isError,
  } = useActiveUser({
    onLogout: () => {
      toast.success("You have been logged out");
      router.push(`/login?back=${encodeURIComponent(currentPath)}`);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col items-center">
          <div>
            <RimbaIcon width={128} height={128} className="w-32 h-32" />
          </div>
          <div>
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    router.push(`/login?back=${encodeURIComponent(currentPath)}`);
    return;
  }

  if (user == null) {
    throw Error("User is null");
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

function Contents({ children }: { children: ReactNode }) {
  const router = useRouter();
  const user = useContext(UserContext);

  const handleLogout = useCallback(() => {
    router.push("/login");
  }, [router]);

  // RIMBA: one top bar, no icon side menu; licence and credit are on
  // the login and About pages instead of a footer on every page.
  return (
    <div className="flex flex-col w-full max-w-full min-h-screen">
      <NavBar user={user} onLogout={handleLogout} />
      <main className="flex-grow w-full max-w-full h-full overflow-x-clip">
        {children}
      </main>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HotkeysProvider>
      <WithLogIn>
        <Contents>{children}</Contents>
      </WithLogIn>
    </HotkeysProvider>
  );
}
