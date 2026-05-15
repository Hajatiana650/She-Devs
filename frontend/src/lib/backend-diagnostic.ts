/**
 * Utilitaire de diagnostic pour vérifier la connexion au backend
 */
const BASE_URL = "http://localhost:3000";

export async function checkBackendConnection(): Promise<{
  isRunning: boolean;
  message: string;
  endpoint?: string;
}> {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      credentials: "include",
    });

    return {
      isRunning: true,
      message: "✅ Backend connecté et réactif",
      endpoint: BASE_URL,
    };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        isRunning: false,
        message: `❌ Impossible de connecter le backend sur ${BASE_URL}. Vérifiez que le serveur est en cours d'exécution.`,
        endpoint: BASE_URL,
      };
    }
    return {
      isRunning: false,
      message: `❌ Erreur lors de la vérification: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
      endpoint: BASE_URL,
    };
  }
}

export async function checkAuthEndpoint(): Promise<{
  available: boolean;
  message: string;
}> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "OPTIONS",
      credentials: "include",
    });

    return {
      available: true,
      message: "✅ Endpoint /auth/login accessible",
    };
  } catch (error) {
    return {
      available: false,
      message: `❌ Endpoint /auth/login inaccessible`,
    };
  }
}

export async function runFullDiagnostic() {
  console.log("🔍 Démarrage du diagnostic du backend...");
  
  const backendCheck = await checkBackendConnection();
  console.log(backendCheck.message);

  if (backendCheck.isRunning) {
    const authCheck = await checkAuthEndpoint();
    console.log(authCheck.message);
  }

  return {
    backend: backendCheck,
  };
}
