import { StyleSheet } from "react-native";

export const planCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  },

  price: {
    fontWeight: "bold",
    marginTop: 5
  },

  reserveButton: {
    marginTop: 10,
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 8
  },

  reserveText: {
    color: "white",
    textAlign: "center"
  },

  adminRow: {
    flexDirection: "row",
    marginTop: 10
  },

  editButton: {
    backgroundColor: "#f39c12",
    padding: 8,
    borderRadius: 6,
    marginRight: 10
  },

  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 6
  },

  buttonText: {
    color: "white"
  }
});