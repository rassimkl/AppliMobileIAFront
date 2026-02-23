import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DashboardLayout from "../../components/DashboardLayout";
import ProtectedPage from "../../components/ProtectedPage";
import {
  approveReservation,
  getAllReservations,
  rejectReservation,
} from "../../services/reservation.service";

import { adminReservationsStyles as styles } from "../../styles/adminReservations.styles";

export default function AdminReservations() {

  const router = useRouter();

  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getAllReservations();
      setReservations(data);
    } catch (error) {
      console.log("Erreur récupération réservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        await approveReservation(id);
      } else {
        await rejectReservation(id);
      }
      fetchReservations();
    } catch (error) {
      console.log("Erreur update status:", error);
    }
  };

  const getPaidColor = (paid: boolean) =>
    paid ? "#2ecc71" : "#e74c3c";

  return (
    <ProtectedPage allowedRoles={["ADMIN"]}>
        <ImageBackground
          source={require("../../assets/images/vb2.jpg")}
          style={{ flex: 1 }}
          resizeMode="cover"
          imageStyle={{ opacity: 0.8 }}
        >

      <DashboardLayout title="Gestion des Réservations">

        <TouchableOpacity
          onPress={() => router.push("/plans")}
          style={styles.goPlansButton}
        >
          <Text style={styles.goPlansText}>
            Gérer les Plans
          </Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>
            {reservations.map((res) => (
              <View key={res.id} style={styles.card}>

                <Text style={styles.title}>
                  Étudiant : {res.userEmail}
                </Text>

                <Text>
                  Plan : {res.courseTitle}
                </Text>

                <View style={styles.statusRow}>
                  <Text>Statut : {res.status}</Text>
                </View>

                {/* 💳 Statut Paiement */}
                <View
                  style={[
                    styles.paidBadge,
                    { backgroundColor: getPaidColor(res.paid) }
                  ]}
                >
                  <Text style={styles.paidText}>
                    {res.paid ? "PAYÉ" : "NON PAYÉ"}
                  </Text>
                </View>

                {res.status === "PENDING" && (
                  <View style={styles.actionRow}>

                    <TouchableOpacity
                      onPress={() => updateStatus(res.id, "approve")}
                      style={styles.approveButton}
                    >
                      <Text style={styles.actionText}>
                        Approve
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => updateStatus(res.id, "reject")}
                      style={styles.rejectButton}
                    >
                      <Text style={styles.actionText}>
                        Reject
                      </Text>
                    </TouchableOpacity>

                  </View>
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