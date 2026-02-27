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

  const formatLevel = (level: string) => {
  if (level === "ALL") return "Tous les niveaux";
  return level;
};

  return (
  <View style={styles.card}>

    {/* Header */}
    <View style={styles.headerRow}>
      <Text style={styles.title}>{plan.courseTitle}</Text>

      <View
        style={[
          styles.typeBadge,
          plan.type === "GROUP"
            ? styles.groupBadge
            : styles.individualBadge
        ]}
      >
        <Text style={styles.badgeText}>
          {plan.type}
        </Text>
      </View>
    </View>

    {/* Infos */}
    
    <View style={styles.infoBlock}>
      <Text style={styles.infoText}> Niveau • {formatLevel(plan.level)} </Text>
      <Text style={styles.infoText}>Durée • {plan.numberOfHours}h</Text>

      {plan.type === "GROUP" && (
        <Text style={styles.infoText}>
          Max • {plan.maxParticipants} participants
        </Text>
      )}
    </View>

    {/* Prix */}
    <Text style={styles.price}>
      {plan.price} €
    </Text>

    {/* ETUDIANT */}
    {isStudent && (
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={() => onReserve?.(plan.id)}
      >
        <Text style={styles.reserveText}>
          Réserver
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