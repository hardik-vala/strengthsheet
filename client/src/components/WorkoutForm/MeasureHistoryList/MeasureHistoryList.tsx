import { format as formatDate } from "date-fns";
import { View } from "react-native";
import {
  List,
  Text
} from "react-native-paper";
import { ExerciseMeasureHistoryRecord } from "../common";

const HISTORY_RECORD_DATETIME_FORMAT = "MM/dd/yyyy HH:mm";

export interface MeasureHistoryListProps {
  measureHistory: ExerciseMeasureHistoryRecord[];
}

export function MeasureHistoryList({ measureHistory }: MeasureHistoryListProps) {
  return (
    <List.Accordion
      title="History"
      titleStyle={{ fontSize: 12, marginLeft: -5 }}
      style={{ marginLeft: 0, marginTop: -25, marginBottom: -10 }}
      left={(props) => <List.Icon {...props} icon="history" />}
    >
      {measureHistory.map((r) => (
        <View
          key={r.timestamp.getTime()}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 5,
            marginRight: 10,
          }}
        >
          <Text>{formatDate(r.timestamp, HISTORY_RECORD_DATETIME_FORMAT)}</Text>
          <Text>{r.value}</Text>
        </View>
      ))}
    </List.Accordion>
  );
}
