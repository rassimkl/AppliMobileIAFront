import { StyleSheet } from "react-native";

export const profilStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  role: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
  },
});