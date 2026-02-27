import { StyleSheet } from "react-native";

export const adminUsersPageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 16,
  },

  // bouton pour ouvrir/fermer la sidebar
  sidebarToggle: {
    position: "absolute",
    right: 2,
    top: -30,
    zIndex: 50,
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
  },

  sidebarToggleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  // fond sombre quand sidebar ouverte
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 40,
  },
});