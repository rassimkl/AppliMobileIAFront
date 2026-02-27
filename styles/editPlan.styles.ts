import { StyleSheet } from "react-native";

export const editPlanStyles = StyleSheet.create({

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#334155",
    fontWeight: "600",
  },
  
  card: {
  backgroundColor: "white",
  padding: 25,
  borderRadius: 18,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 15,
  shadowOffset: { width: 0, height: 5 },
  elevation: 5,
},

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#F8FAFC",
  },

  typeContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },

  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
  },

  typeButtonActive: {
    backgroundColor: "#1D4ED8",
  },

  typeButtonInactive: {
    backgroundColor: "#CBD5E1",
  },

  typeText: {
    color: "white",
    fontWeight: "600",
  },

  submitButton: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  submitText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#64748B",
  }

});