import { useRouter } from "expo-router";
import DashboardLayout from "../../components/DashboardLayout";
import FeatureCard from "../../components/FeatureCard";
import ProtectedPage from "../../components/ProtectedPage";

export default function EnseignantDashboard() {
  const router = useRouter();

  return (
    <ProtectedPage allowedRoles={["ENSEIGNANT"]}>
      <DashboardLayout title="Espace Enseignant">
        
        <FeatureCard
          title="Tests"
          description="Consulter les résultats envoyés par l'admin"
          onPress={() => router.push("/")}
        />

        <FeatureCard
          title="Étudiants"
          description="Voir les étudiants qui vous sont assignés"
          onPress={() => router.push("/")}
        />

      </DashboardLayout>
    </ProtectedPage>
  );
}
