import { apiClient } from "../lib/api-client";

export async function loginByRole(
  selectedRole: "POPULATION" | "CHAUFFEUR" | "ADMIN_BUS" | "ADMIN_TRASH",
  email: string,
  password: string
) {
  // 1. Login normal
  const user = await apiClient.login<any>(email, password);
  console.log("✅ User après login :", user);

  // 2. Si c'est un admin → on récupère la liste des admins
  if (selectedRole === "ADMIN_BUS" || selectedRole === "ADMIN_TRASH") {
    try {
      const adminList = await apiClient.get<any[]>("/admin");  

      console.log("🔍 Admin List récupéré :", adminList);

      const currentAdmin = adminList.find((admin: any) => admin.id_user === user.id_user);

      if (!currentAdmin) {
        apiClient.logout();
        throw new Error("Impossible de trouver vos informations admin.");
      }

      console.log("🔍 Current Admin trouvé :", currentAdmin);

      const rolee = currentAdmin.rolee;

      if (selectedRole === "ADMIN_BUS" && rolee !== "BUS") {
        apiClient.logout();
        throw new Error("Ce compte n'est pas un admin Transport.");
      }

      if (selectedRole === "ADMIN_TRASH" && rolee !== "TRASH") {
        apiClient.logout();
        throw new Error("Ce compte n'est pas un admin Déchets.");
      }

      return { 
        ...user, 
        admin: currentAdmin, 
        rolee 
      };

    } catch (err: any) {
      console.error("Erreur lors de la récupération admin :", err);
      apiClient.logout();
      throw new Error("Impossible de récupérer les informations admin.");
    }
  }

  // Pour les rôles normaux (Population / Chauffeur)
  return user;
}