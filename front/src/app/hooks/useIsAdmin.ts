/* Way Canguk fork: admins (is_superuser) see every menu; annotators only see
 * annotation projects and the annotate page. This hides menus only: the API
 * itself is unchanged, so access control stays with the reverse proxy. */
import { useContext } from "react";

import UserContext from "@/app/contexts/user";

export default function useIsAdmin(): boolean {
  const user = useContext(UserContext);
  return user?.is_superuser === true;
}
