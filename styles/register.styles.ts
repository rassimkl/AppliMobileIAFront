import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%",
  },

  formWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 7,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#0F172A",
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#334155",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#F8FAFC",
  },

  button: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "#DC2626",
    marginBottom: 15,
    textAlign: "center",
  },

  link: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "600",
    paddingTop: 50,
  },
});
