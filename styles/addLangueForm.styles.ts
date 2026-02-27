import { StyleSheet } from "react-native";

export const addLangueFormStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 18,
    color: "#111827",
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});