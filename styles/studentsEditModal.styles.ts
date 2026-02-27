import { StyleSheet } from "react-native";

export const studentsEditModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
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
    marginBottom: 12,
  },

  sectionTitle: {
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 8,
    color: "#111827",
  },

  languageItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },

  languageSelected: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  languageUnselected: {
    backgroundColor: "#f3f4f6",
    borderColor: "#e5e7eb",
  },

  languageTextSelected: {
    color: "white",
    fontWeight: "600",
  },

  languageTextUnselected: {
    color: "#111827",
  },

  buttonPrimary: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  buttonSecondary: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#e5e7eb",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
  },

  buttonTextSecondary: {
    color: "#111827",
    fontWeight: "600",
  },
});