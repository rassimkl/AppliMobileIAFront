import { Text, TouchableOpacity, View } from "react-native";
import { adminUsersSidebarStyles as styles } from "../../styles/adminUsersSidebar.styles";

type AdminSection =
  | "ADD_STUDENT"
  | "ADD_TEACHER"
  | "LIST_STUDENTS"
  | "LIST_TEACHERS"
  | "ASSIGN"
  | "ADD_LANGUE"
  | "LIST_LANGUES";

interface Props {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
  visible: boolean;
  onClose: () => void;
}

export default function AdminUsersSidebar({
  active,
  onChange,
  visible,
  onClose,
}: Props) {
  if (!visible) return null;

  const Item = ({
    label,
    section,
  }: {
    label: string;
    section: AdminSection;
  }) => {
    const isActive = active === section;
    return (
      <TouchableOpacity
        onPress={() => {
          onChange(section);
          onClose(); // ✅ ferme après clic
        }}
        style={[styles.item, isActive && styles.itemActive]}
      >
        <Text style={styles.itemText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sidebar}>
      <Item label="➕ Ajouter étudiant" section="ADD_STUDENT" />
      <Item label="➕ Ajouter enseignant" section="ADD_TEACHER" />
      <Item label="📋 Liste étudiants" section="LIST_STUDENTS" />
      <Item label="📋 Liste enseignants" section="LIST_TEACHERS" />
      <Item label="🔗 Assigner" section="ASSIGN" />
      <Item label="➕ Ajouter une langue" section="ADD_LANGUE" />
      <Item label="📋  Nos langue" section="LIST_LANGUES" />
    </View>
  );
}