import { toast } from "sonner";

// Toast Styles de luxe avec emojis et messages élégants
export const luxeToast = {
  // Succès - Messages de succès avec style luxueux
  success: (message: string) => {
    toast.success(message, {
      description: "Opération complétée avec succès ✨",
      duration: 4000,
      position: "top-center",
    });
  },

  campaignSuccess: () => {
    toast.success("🎉 Campagne de sensibilisation créée", {
      description: "Les citoyens ont été notifiés. Bonne chance pour cette belle initiative!",
      duration: 4000,
      position: "top-center",
    });
  },

  signalAccepted: () => {
    toast.success("✅ Signalement pris en compte", {
      description: "Le citoyen a été notifié. Une équipe sera dépêchée.",
      duration: 4000,
      position: "top-center",
    });
  },

  signalValidated: () => {
    toast.success("✅ Signalement validé", {
      description: "Les informations ont été sauvegardées avec succès.",
      duration: 4000,
      position: "top-center",
    });
  },

  dataUpdated: () => {
    toast.success("💾 Mise à jour effectuée", {
      description: "Les données ont été synchronisées avec succès.",
      duration: 3000,
      position: "top-center",
    });
  },

  // Erreur - Messages d'erreur avec style luxueux
  error: (message: string) => {
    toast.error(message, {
      description: "Une erreur s'est produite. Réessayez.",
      duration: 4000,
      position: "top-center",
    });
  },

  campaignError: () => {
    toast.error("⚠️ Impossible de créer la campagne", {
      description: "Vérifiez vos informations et réessayez.",
      duration: 4000,
      position: "top-center",
    });
  },

  networkError: () => {
    toast.error("🌐 Erreur de connexion", {
      description: "Vérifiez votre connexion internet et réessayez.",
      duration: 4000,
      position: "top-center",
    });
  },

  // En cours / Loading
  loading: (message: string) => {
    return toast.loading(message, {
      duration: Infinity,
      position: "top-center",
    });
  },

  // Info / Notification
  info: (message: string, description?: string) => {
    toast(message, {
      description: description || "ℹ️ Information",
      duration: 3000,
      position: "top-center",
    });
  },

  // Avertissement
  warning: (message: string) => {
    toast.error(message, {
      description: "⚠️ Attention requise",
      duration: 4000,
      position: "top-center",
    });
  },
};

// Promesse de toast - Utile pour les opérations async
export const luxePromiseToast = {
  async: (
    promise: Promise<any>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(
      promise,
      {
        loading: {
          title: loading,
          description: "Veuillez patienter...",
        },
        success: {
          title: success,
          description: "✨ Opération réussie",
        },
        error: {
          title: error,
          description: "Une erreur s'est produite",
        },
      },
      {
        duration: 4000,
        position: "top-center",
      }
    );
  },
};
