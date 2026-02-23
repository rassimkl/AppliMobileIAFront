import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import DashboardLayout from "../../components/DashboardLayout";
import ProtectedPage from "../../components/ProtectedPage";
import api from "../../services/api";
import { payReservation } from "../../services/payment.service";
import { studentReservationStyles as styles } from "../../styles/studentReservation.styles";

export default function EtudiantReservations() {

  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get("/reservations/my");
      setReservations(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (reservationId: number) => {
    try {
      await payReservation(reservationId);
      Alert.alert("Succès", "Paiement effectué !");
      fetchReservations();
    } catch (error) {
      Alert.alert("Erreur", "Paiement impossible");
    }
  };

  return (
    <ProtectedPage allowedRoles={["ETUDIANT"]}>
      <DashboardLayout title="Mes Réservations">

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>

            {reservations.map((res) => (
              <View key={res.id} style={styles.card}>

                <Text style={styles.title}>
                  {res.plan.course.title}
                </Text>

                <Text>Prix : {res.plan.price} €</Text>

                <Text style={styles.status}>
                  Statut : {res.status}
                </Text>

                {res.status === "APPROVED" && (
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePayment(res.id)}
                  >
                    <Text style={styles.payText}>
                      💳 Payer
                    </Text>
                  </TouchableOpacity>
                )}

              </View>
            ))}

          </ScrollView>
        )}

      </DashboardLayout>
    </ProtectedPage>
  );
}