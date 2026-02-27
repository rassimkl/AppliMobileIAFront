import { StyleSheet } from "react-native";

export const planCardStyles = StyleSheet.create({

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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    flex: 1,
    paddingRight: 10,
  },

  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  groupBadge: {
    backgroundColor: "#DBEAFE",
  },

  individualBadge: {
    backgroundColor: "#DCFCE7",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E293B",
  },

  infoBlock: {
    marginTop: 5,
    marginBottom: 15,
  },

  infoText: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 3,
  },

  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 15,
  },

  reserveButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  reserveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },

  adminRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#F59E0B",
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },

});