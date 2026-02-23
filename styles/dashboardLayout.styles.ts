import { StyleSheet } from "react-native";

export const dashboardLayoutStyles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
  },
  header: {
  marginTop: 10,
  paddingTop: 10,
  paddingBottom: 10,
  paddingHorizontal: 20,
  backgroundColor: "#1E293B",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

title: {
  color: "white",
  fontSize: 20,
  fontWeight: "600",
  textAlign: "center",
},
  content: {
    flex: 1,
    padding: 20,
  },

backButton: {
  width: 40,
  alignItems: "flex-start",
},

backText: {
  color: "white",
  fontSize: 28,
  fontWeight: "600",
},

rightPlaceholder: {
  width: 40,
},
});
