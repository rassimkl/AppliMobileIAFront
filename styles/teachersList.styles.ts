import { StyleSheet } from "react-native";

export const teachersListStyles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.95)",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },

  name: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 4,
    color: "#111827",
  },

  email: {
    opacity: 0.8,
    marginBottom: 6,
  },

  badge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },

  badgeActive: {
    backgroundColor: "#16a34a",
  },

  badgeInactive: {
    backgroundColor: "#ef4444",
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
});