import { StyleSheet } from "react-native";

export const navbarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 40,

    // 🔥 Glass effect
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",

    // Ombre douce
    shadowOpacity: 0.1,
    elevation: 8,
  },

  link: {
    color: "#000000e3",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
