// components/admin/AssignStudentToTeacher.tsx

import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AssignStudentToTeacher() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  const handleAssign = async () => {
    if (!selectedStudent || !selectedTeacher) return;

    // TODO: appeler backend assign
  };

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Assigner étudiant à enseignant
      </Text>

      <TouchableOpacity
        onPress={handleAssign}
        style={{ backgroundColor: "#9333ea", padding: 12 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Assigner
        </Text>
      </TouchableOpacity>
    </View>
  );
}