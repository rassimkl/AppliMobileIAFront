import { StyleSheet } from "react-native";

export const studentReservationStyles = StyleSheet.create({

    background: {
    flex: 1,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 8,
  },

  status: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 13,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    color: "#1E293B",
  },

  payButton: {
    marginTop: 15,
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  payText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },

  paidBadge: {
  marginTop: 12,
  alignSelf: "flex-start",
  backgroundColor: "#16A34A",
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
},

paidText: {
  color: "white",
  fontWeight: "700",
  fontSize: 12,
  letterSpacing: 1,
},

});