import { StyleSheet } from "react-native";

export const adminUsersSidebarStyles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    right: 12,
    top: 60,
    zIndex: 60,
    width: 190,              // ✅ petite
    padding: 10,
    borderRadius: 14,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 8,
  },

  itemActive: {
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  itemText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
});