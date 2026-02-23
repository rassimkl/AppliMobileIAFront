import { StyleSheet } from "react-native";

export const adminDashboardStyles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
