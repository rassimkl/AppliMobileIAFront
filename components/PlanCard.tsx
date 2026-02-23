import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Plan } from "../services/plan.service";
import { planCardStyles as styles } from "../styles/planCard.styles";

interface Props {
  plan: Plan;
  onDelete?: (id: number) => void;
  onReserve?: (id: number) => void;
}

export default function PlanCard({
  plan,
  onDelete,
  onReserve
}: Props) {

  const router = useRouter();
  const auth = useContext(AuthContext);

  const isAdmin = auth?.user?.role === "ADMIN";
  const isStudent = auth?.user?.role === "ETUDIANT";

  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        {plan.courseTitle}
      </Text>

      <Text>Langue: {plan.language}</Text>
      <Text>Niveau: {plan.level}</Text>
      <Text>Heures: {plan.numberOfHours}</Text>
      <Text>Type: {plan.type}</Text>

      {plan.type === "GROUP" && (
        <Text>Max participants: {plan.maxParticipants}</Text>
      )}

      <Text style={styles.price}>
        Prix: {plan.price} €
      </Text>

      {/* ETUDIANT */}
      {isStudent && (
        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() => onReserve?.(plan.id)}
        >
          <Text style={styles.reserveText}>
            Demander réservation
          </Text>
        </TouchableOpacity>
      )}

      {/* ADMIN */}
      {isAdmin && (
        <View style={styles.adminRow}>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: "/plans/edit/[id]",
                params: { id: String(plan.id) }
              })
            }
          >
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete?.(plan.id)}
          >
            <Text style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}