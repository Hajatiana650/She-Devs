import type {
  AdminBusUser,
  AdminTrashUser,
} from "../type/Auth";

import { apiClient } from "../lib/api-client";

export async function loginByRole(
  role:
    | "POPULATION"
    | "CHAUFFEUR"
    | "ADMIN_BUS"
    | "ADMIN_TRASH",
  email: string,
  password: string
) {
  const data = await apiClient.login<any>(
    email,
    password
  );

  if (
    role === "ADMIN_BUS" &&
    (data as AdminBusUser).rolee !== "BUS"
  ) {
    apiClient.logout();

    throw new Error(
      "Ce compte n'est pas un admin Transport."
    );
  }

  if (
    role === "ADMIN_TRASH" &&
    (data as AdminTrashUser).rolee !==
      "TRASH"
  ) {
    apiClient.logout();

    throw new Error(
      "Ce compte n'est pas un admin Déchets."
    );
  }

  return data;
}