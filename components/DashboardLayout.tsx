import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { dashboardLayoutStyles as styles } from "../styles/dashboardLayout.styles";
import CustomNavBar from "./CustomNavBar";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ title, children }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* NAVBAR EN HAUT */}
      <CustomNavBar />

      {/* HEADER */}
      <View style={styles.header}>
        
        {/* Bouton retour */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        {/* Titre centré */}
        <Text style={styles.title}>{title}</Text>

        {/* Espace vide pour équilibrer */}
        <View style={styles.rightPlaceholder} />
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ padding: 20 }}
      >
        {children}
      </ScrollView>

    </View>
  );
}