import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  drillTitle: {
    color: "deepskyblue",
    fontWeight: "bold",
    marginVertical: 10,
  },
  drillNoteContainer: {
    backgroundColor: "gray",
    padding: 5,
  },
  drillNoteText: {
    color: "black",
  },
  exerciseFormShelfContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  exerciseFormShelfSetContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  exerciseFormHeaderText: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
  },
  exerciseFormTextContainer: {
    marginRight: 15,
    textAlign: "center",
    width: 75,
  },
  shelfFormInputsContainer: {
    flexDirection: "row"
  },
});