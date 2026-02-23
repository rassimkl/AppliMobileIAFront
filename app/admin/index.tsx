import { useRouter } from "expo-router";
import { ImageBackground, View } from "react-native";
import CustomNavBar from "../../components/CustomNavBar";
import FeatureCard from "../../components/FeatureCard";
import ProtectedPage from "../../components/ProtectedPage";
import { adminDashboardStyles as styles } from "../../styles/adminDashboard.styles";


export default function AdminDashboard() {
  const router = useRouter();

  return (
    <ProtectedPage allowedRoles={["ADMIN"]}>
      <ImageBackground
        source={require("../../assets/images/vb.jpg")}
        style={styles.background}
        resizeMode="cover"
      >

        
        {/* 🔥 NAVBAR EN HAUT */}
        <CustomNavBar />


        <View style={styles.content}>
          <FeatureCard
            title="Cours"
            description="Créer et gérer les cours"
            onPress={() => router.push("/cours")}
          />

          <FeatureCard
            title="Réservations"
            description="Voir et confirmer les réservations"
            onPress={() => router.push("/admin/reservation")}
          />

          <FeatureCard
            title="Entrainement"
            description="Quiz, articles, ebooks et exercices"
            onPress={() => router.push("/")}
          />

          <FeatureCard
            title="Tests"
            description="Créer des tests et voir les résultats"
            onPress={() => router.push("/")}
          />

          <FeatureCard
            title="Utilisateurs"
            description="Gérer les utilisateurs et rôles"
            onPress={() => router.push("/")}
          />
        </View>
      </ImageBackground>
    </ProtectedPage>
  );
}
