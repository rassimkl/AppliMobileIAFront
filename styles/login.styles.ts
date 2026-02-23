import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
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
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 15,
    elevation: 8,
    marginBottom: -10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0A2A66",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#f9fafb",
  },

  button: {
    backgroundColor: "#0A2A66",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "#d32f2f",
    marginBottom: 15,
    textAlign: "center",
  },

  link: {
    color: "#0A2A66",
    textAlign: "center",
    fontWeight: "500",
  },

  inscription: {
      marginTop: 20,
      alignItems: "center",
  }
});
