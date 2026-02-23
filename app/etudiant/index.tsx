import { useRouter } from "expo-router";
import DashboardLayout from "../../components/DashboardLayout";
import FeatureCard from "../../components/FeatureCard";
import ProtectedPage from "../../components/ProtectedPage";

export default function EtudiantDashboard() {
  const router = useRouter();

  return (
    <ProtectedPage allowedRoles={["ETUDIANT"]}>
      <DashboardLayout title="Espace Étudiant">
        
        <FeatureCard
          title="Cours"
          description="Consulter les cours disponibles"
          onPress={() => router.push("/cours")}
        />

        <FeatureCard
          title="Réservations"
          description="Faire une demande et suivre son statut"
          onPress={() => router.push("/plans")}
        />

        <FeatureCard
          title="Entrainement"
          description="Accéder aux quiz, articles et exercices"
          onPress={() => router.push("/")}
        />

        <FeatureCard
          title="Tests"
          description="Passer les tests et voir vos résultats"
          onPress={() => router.push("/")}
        />

      </DashboardLayout>
    </ProtectedPage>
  );
}
