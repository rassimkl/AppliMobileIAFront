import { StyleSheet } from "react-native";

export const studentsListStyles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },

  name: { fontWeight: "800", marginBottom: 4 },
  email: { opacity: 0.8 },

  actionsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
},

editText: {
  color: "#2563eb",
  fontWeight: "700",
},

deleteText: {
  color: "#dc2626",
  fontWeight: "700",
},
});