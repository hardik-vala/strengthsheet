import { format as formatDate, parse as parseDate } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  Appbar,
  Button,
  Divider,
  Text
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DrillSet,
  Exercise,
  SetType,
  WorkoutValueKey
} from "../../models/Workout/Core";
import {
  ExerciseHistoryRecord,
  WorkoutHistory,
  WorkoutHistoryRecord,
} from "../../models/Workout/WorkoutHistory";
import {
  ExerciseTemplate,
  WorkoutTemplate,
} from "../../models/Workout/WorkoutTemplate";
import { WORKOUT_HISTORY_PROVIDER } from "../../server/WorkoutHistoryProvider";
import { styles } from "../../styles/style";
import { DateTimePicker } from "../DateTimePicker/DateTimePicker";
import { MeasureFormInput } from "./MeasureFormInput/MeasureFormInput";
import { ExerciseMeasureHistoryRecord, WorkoutValues } from "./common";

const NUM_RECENT_WORKOUT_HISTORY_RECORDS = 3;

interface WorkoutFormProps {
  workoutTemplate: WorkoutTemplate;
  onBack: () => void;
}

export function WorkoutForm({ workoutTemplate, onBack }: WorkoutFormProps) {
  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [workoutStartTime, setWorkoutStartTime] = useState(new Date());
  const [workoutHistory, setWorkoutHistory] = useState(null);
  const [workoutValues, setWorkoutValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getWorkoutHistoryWrapper() {
      try {
        setWorkoutHistory(getWorkoutHistory(workoutTemplate.key));
      } catch (error) {
        Alert.alert("Error fetching workout history.");
      }
    }

    getWorkoutHistoryWrapper();
  }, []);

  async function saveWorkout() {
    try {
      
      setTimeout(() => {
        convertWorkoutValuesToRecord(
          workoutTemplate,
          workoutValues,
          workoutDate,
          workoutStartTime
        );
      }, 5000);
    } catch (error) {
      Alert.alert("Error saving workout.");
      console.error(error);
      return;
    }
  }

  return (
    <SafeAreaProvider>
      <View style={styles.center}>
        <Appbar.Header>
          <Appbar.BackAction onPress={onBack} testID="back-action" />
        </Appbar.Header>
        <StatusBar style="auto" />
        <Text variant="headlineMedium">{workoutTemplate.displayName}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <DateTimePicker
            label="Date"
            testID="datePicker"
            value={workoutDate}
            isDate={true}
            onChange={(_, d) => {
              setWorkoutDate(d);
            }}
          />
          <DateTimePicker
            label="Start time"
            testID="timePicker"
            value={workoutStartTime}
            isDate={false}
            onChange={(_, t) => setWorkoutStartTime(t)}
          />
        </View>
        {workoutTemplate.drills.map((drill) => {
          if ("exercise" in drill) {
            return (
              <ExerciseForm
                key={drill.exercise.key}
                exerciseTemplate={drill}
                workoutHistory={workoutHistory}
                workoutValues={workoutValues}
                onUpdateWorkoutValues={(updatedWorkoutValues) =>
                  setWorkoutValues({ ...updatedWorkoutValues })
                }
              />
            );
          }
        })}
        <Divider />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            buttonColor="blue"
            compact={true}
            loading={isSaving}
            mode="contained"
            onPress={async () => {
              setIsSaving(true);
              await saveWorkout();
              setIsSaving(false);
            }}
            contentStyle={{
              flexDirection: "row",
            }}
            style={{
              marginTop: 25,
              height: 40,
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSaving ? "Saving" : "Finish"}
          </Button>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

interface ExerciseFormProps {
  exerciseTemplate: ExerciseTemplate;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

function ExerciseForm({
  exerciseTemplate,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: ExerciseFormProps) {
  return (
    <>
      <Text variant="titleMedium">{exerciseTemplate.displayName}</Text>
      {exerciseTemplate.sets.map((s) => {
        return (
          <SetForm
            key={`${s.setType.toString()} : ${s.index}`}
            exercise={exerciseTemplate.exercise}
            set={s}
            workoutHistory={workoutHistory}
            workoutValues={workoutValues}
            onUpdateWorkoutValues={onUpdateWorkoutValues}
          />
        );
      })}
    </>
  );
}

interface SetFormProps {
  exercise: Exercise;
  set: DrillSet;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

function SetForm({
  exercise,
  set,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: SetFormProps) {
  return (
    <View style={{ width: "100%" }}>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text variant="bodyLarge">
            {set.setType === SetType.Warmup ? "W" : `Set ${set.index}`}
          </Text>
        </View>
        {exercise.measures.map((measure) => {
          return (
            <MeasureFormInput
              key={measure.key}
              exercise={exercise}
              set={set}
              measure={measure}
              measureHistory={
                workoutHistory
                  ? projectWorkoutHistory(
                      workoutHistory.records,
                      measure.key,
                      set.setType,
                      NUM_RECENT_WORKOUT_HISTORY_RECORDS
                    )
                  : []
              }
              workoutValues={workoutValues}
              onUpdateWorkoutValues={onUpdateWorkoutValues}
            />
          );
        })}
      </View>
    </View>
  );
}

function getWorkoutHistory(workoutKey: string) {
  return WORKOUT_HISTORY_PROVIDER.getWorkoutHistory(workoutKey);
}

function projectWorkoutHistory(
  records: WorkoutHistoryRecord[],
  measureKey: string,
  setType: SetType,
  n: number
): ExerciseMeasureHistoryRecord[] {
  return selectWorkoutHistory(
    filterRecentWorkoutHistory(records, n),
    measureKey,
    setType
  );
}

function filterRecentWorkoutHistory(
  records: WorkoutHistoryRecord[],
  n: number
): WorkoutHistoryRecord[] {
  const sortedRecords = [...records];
  sortedRecords.sort(
    (r1, r2) => r2.startTimestamp.getTime() - r1.startTimestamp.getTime()
  );
  return sortedRecords.slice(0, n);
}

function selectWorkoutHistory(
  records: WorkoutHistoryRecord[],
  measureKey: string,
  setType: SetType
): ExerciseMeasureHistoryRecord[] {
  return records.flatMap((r) => {
    return r.exercises
      .filter(
        (e) => e.key.measureKey === measureKey && e.key.setType === setType
      )
      .map((e) => ({
        timestamp: r.startTimestamp,
        measureKey: e.key,
        value: e.value,
      }));
  });
}

function convertWorkoutValuesToRecord(
  workoutTemplate: WorkoutTemplate,
  workoutValues: WorkoutValues,
  workoutDate: Date,
  workoutStartTime: Date
): WorkoutHistoryRecord {
  const exercises: ExerciseHistoryRecord[] = [];

  workoutTemplate.drills.forEach((drill) => {
    if ("exercise" in drill) {
      drill.sets.forEach((set) => {
        drill.exercise.measures.forEach((measure) => {
          const key = WorkoutValueKey.create(
            drill.exercise.key,
            set.index,
            set.setType,
            measure.key
          );

          const value = workoutValues[key.toString()];

          if (value) {
            exercises.push({
              key,
              value,
            });
          }
        });
      });
    }
  });

  return {
    startTimestamp: getStartTimestamp(workoutDate, workoutStartTime),
    exercises,
  };
}

function getStartTimestamp(startDate: Date, startTime: Date) {
  const dateStr = formatDate(startDate, "MM/dd/yyyy");
  const timeStr = formatDate(startTime, "HH:mm");
  return parseDate(`${dateStr} ${timeStr}`, "MM/dd/yyyy HH:mm", new Date());
}
