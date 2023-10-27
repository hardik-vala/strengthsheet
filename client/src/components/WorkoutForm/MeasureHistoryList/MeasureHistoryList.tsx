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
    <List.Section
      title="History"
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
    </List.Section>
  );
}
