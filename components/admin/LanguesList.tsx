import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  deleteLangue,
  getLangues,
  Langue
} from "../../services/langue.service";

import { languesListStyles as styles } from "../../styles/languesList.styles";

export default function LanguesList() {

  const [langues, setLangues] = useState<Langue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLangues();
  }, []);

  const fetchLangues = async () => {
    try {
      const data = await getLangues();
      setLangues(data);
    } catch (error) {
      console.log("Erreur récupération langues:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {

    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cette langue ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteLangue(id);
              fetchLangues();
            } catch (error) {
              Alert.alert(
                "Erreur",
                "Impossible de supprimer cette langue.\nElle est peut-être utilisée dans un cours."
              );
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (langues.length === 0) {
    return <Text>Aucune langue disponible</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {langues.map((langue) => (
        <View key={langue.id} style={styles.card}>

          <Text style={styles.name}>
            {langue.name}
          </Text>

          <TouchableOpacity
            onPress={() => handleDelete(langue.id)}
          >
            <Text style={styles.deleteText}>
              Supprimer
            </Text>
          </TouchableOpacity>

        </View>
      ))}
    </ScrollView>
  );
}