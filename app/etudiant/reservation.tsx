import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { ImageBackground } from "react-native";
import DashboardLayout from "../../components/DashboardLayout";
import ProtectedPage from "../../components/ProtectedPage";
import { payReservation } from "../../services/payment.service";
import { getMyReservations, Reservation } from "../../services/reservation.service";
import { studentReservationStyles as styles } from "../../styles/studentReservation.styles";

export default function EtudiantReservations() {

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getMyReservations();
      setReservations(data);
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

            <ImageBackground
              source={require("../../assets/images/vb.jpg")}
              style={styles.background}
              resizeMode="cover"
            >

      <DashboardLayout title="Mes Réservations">

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>

            {reservations.map((res) => (
              <View key={res.id} style={styles.card}>

                <Text style={styles.title}>
                  {res.courseTitle}
                </Text>

                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: "700", 
                  color: "#1D4ED8",
                  marginBottom: 6
                }}>
                  {res.planPrice} €
                </Text>

                <Text style={styles.status}>
                  Statut : {res.status}
                </Text>

                {res.paid && (
                  <View style={styles.paidBadge}>
                    <Text style={styles.paidText}>
                      PAYÉ
                    </Text>
                  </View>
                )}

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

      </ImageBackground>
    </ProtectedPage>
  );
}