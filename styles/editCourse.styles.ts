import { StyleSheet } from "react-native";

export const editCourseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
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
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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

  textArea: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#F8FAFC",
    minHeight: 100,
    textAlignVertical: "top",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
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
});
