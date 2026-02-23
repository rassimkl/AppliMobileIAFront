import { StyleSheet } from "react-native";

export const courseStyles = StyleSheet.create({

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.05,
  },

  createButton: {
    backgroundColor: "#1E293B",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  createButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#0F172A",
  },

  description: {
    fontSize: 14,
    color: "#64748B",
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  editText: {
    color: "#2563EB",
    marginRight: 20,
    fontWeight: "500",
  },

  deleteText: {
    color: "#DC2626",
    fontWeight: "500",
  },

  flag: {
    width: 42,
    height: 30,
    borderRadius: 6,
  },

});