import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

import DashboardLayout from "../../components/DashboardLayout";
import PlanCard from "../../components/PlanCard";
import { AuthContext } from "../../context/AuthContext";
import { deletePlan, getPlans, Plan } from "../../services/plan.service";
import { createReservation } from "../../services/reservation.service";
import { plansStyles as styles } from "../../styles/plans.styles";

export default function PlansPage() {

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = useContext(AuthContext);
  const isStudent = auth?.user?.role === "ETUDIANT";
  const isAdmin = auth?.user?.role === "ADMIN";

  const router = useRouter();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.log("Erreur récupération plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async (planId: number) => {
    try {
      await createReservation(planId);
      Alert.alert("Succès", "Réservation envoyée !");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de réserver ce plan.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePlan(id);
      fetchPlans();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de supprimer ce plan.");
    }
  };

  return (

        <ImageBackground
          source={require("../../assets/images/vb2.jpg")}
          style={{ flex: 1 }}
          resizeMode="cover"
          imageStyle={{ opacity: 0.8 }}
        >

    <DashboardLayout title="Plans disponibles">

      {isStudent && (
        <TouchableOpacity
          style={styles.studentButton}
          onPress={() => router.push("/etudiant/reservation")}
        >
          <Text style={styles.buttonText}>
            Voir mes réservations
          </Text>
        </TouchableOpacity>
      )}

      {isAdmin && (
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => router.push("/plans/create")}
        >
          <Text style={styles.buttonText}>
            + Créer un plan
          </Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onDelete={handleDelete}
              onReserve={handleReservation}
            />
          ))}
        </ScrollView>
      )}

    </DashboardLayout>
    </ImageBackground>
  );
}