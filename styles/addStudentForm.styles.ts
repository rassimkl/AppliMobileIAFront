import { StyleSheet } from "react-native";

export const addStudentFormStyles = StyleSheet.create({
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
    marginBottom: 12,
  },

  label: {
    marginTop: 15,
    marginBottom: 8,
    fontWeight: "700",
    color: "#374151",
  },

  languageButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    marginBottom: 8,
    alignSelf: "flex-start",
  },

  languageSelected: {
    backgroundColor: "#2563eb",
  },

  languageText: {
    fontWeight: "600",
    color: "#111827",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  dropdownButton: {
  borderWidth: 1,
  borderColor: "rgba(0,0,0,0.12)",
  padding: 14,
  borderRadius: 12,
  backgroundColor: "white",
  marginTop: 8,
  marginBottom: 12,
},

dropdownText: {
  fontSize: 15,
},

modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  padding: 20,
},

modalContainer: {
  backgroundColor: "white",
  borderRadius: 16,
  padding: 20,
  maxHeight: "70%",
},

modalItem: {
  paddingVertical: 14,
  borderBottomWidth: 1,
  borderColor: "rgba(0,0,0,0.05)",
},

modalItemText: {
  fontSize: 16,
},

modalClose: {
  marginTop: 15,
  alignItems: "center",
},

modalCloseText: {
  color: "#2563eb",
  fontWeight: "700",
}
});