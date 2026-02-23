import { StyleSheet } from "react-native";

export const adminReservationsStyles = StyleSheet.create({

  goPlansButton: {
    backgroundColor: "#1e3a8a",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15
  },

  goPlansText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10
  },

  title: {
    fontWeight: "bold"
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },

  paidBadge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start"
  },

  paidText: {
    color: "white",
    fontWeight: "bold"
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 10
  },

  approveButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 5,
    marginRight: 10
  },

  rejectButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5
  },

  actionText: {
    color: "white"
  }

});