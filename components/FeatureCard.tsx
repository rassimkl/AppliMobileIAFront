import { Text, TouchableOpacity } from "react-native";
import { featureCardStyles as styles } from "../styles/featureCard.styles";

interface Props {
  title: string;
  description: string;
  onPress: () => void;
}

export default function FeatureCard({
  title,
  description,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}
