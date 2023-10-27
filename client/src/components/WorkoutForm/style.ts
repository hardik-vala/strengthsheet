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
    paddingVertical: 5,
    width: "100%",
  },
  exerciseFormShelfLeftGroupContainer: {
    flex: 2,
    flexDirection: "row",
    width: 50,
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
  measureFormInput: {
    height: 30
  },
  measureFormInputContent: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  measureFormInputOutline: {
    borderRadius: 5
  },
  shelfFormInputsContainer: {
    flexDirection: "row",
  },
});
