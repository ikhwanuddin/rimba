"use client";

import { useContext } from "react";

import Center from "@/lib/components/layouts/Center";
import Card from "@/lib/components/ui/Card";
import Hero from "@/lib/components/ui/Hero";
import UserProfile from "@/lib/components/users/UserProfile";

import { t } from "@/lib/i18n";

import UserContext from "../../contexts/user";

export default function Page() {
  const user = useContext(UserContext);

  return (
    <>
      <Hero text={t("Profil")} />
      <Center>
        <Card className="max-w-prose">
          <UserProfile user={user} />
        </Card>
      </Center>
    </>
  );
}
