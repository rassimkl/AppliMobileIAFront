import { useRouter } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { courseStyles as styles } from "../styles/course.styles";

interface Props {
  id: number;
  title: string;
  description: string;
  langueName?: string;
  onDelete?: (id: number) => void;
}

export default function CourseCard({
  id,
  title,
  description,
  langueName,
  onDelete,
}: Props) {

  const router = useRouter();
  const auth = useContext(AuthContext);
  const isAdmin = auth?.user?.role === "ADMIN";

  const getFlag = (lang?: string) => {
    switch (lang) {
      case "EN": return "https://flagcdn.com/w80/gb.png";
      case "FR": return "https://flagcdn.com/w80/fr.png";
      case "ES": return "https://flagcdn.com/w80/es.png";
      case "PT": return "https://flagcdn.com/w80/pt.png";
      case "EU": return "https://flagcdn.com/w80/es-pv.png";
      case "AR": return "https://flagcdn.com/w80/sa.png";
      case "JA": return "https://flagcdn.com/w80/jp.png";
      case "ZH": return "https://flagcdn.com/w80/cn.png";
      case "RU": return "https://flagcdn.com/w80/ru.png";
      case "DE": return "https://flagcdn.com/w80/de.png";
      default: return null;
    }
  };

  return (
    <View style={styles.card}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {isAdmin && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => router.push(`./cours/edit/${id}`)}
            >
              <Text style={styles.editText}>
                Modifier
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete?.(id)}>
              <Text style={styles.deleteText}>
                Supprimer
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

    {langueName && (
      <Image
        source={{ uri: getFlag(langueName) || undefined }}
        style={styles.flag}
      />
    )}

    </View>
  );
}