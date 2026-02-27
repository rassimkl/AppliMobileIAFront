import { StyleSheet } from "react-native";

export const assignStudentToTeacherStyles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "700", marginBottom: 14 },

  box: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#9333ea",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: { color: "white", fontWeight: "700" },
});