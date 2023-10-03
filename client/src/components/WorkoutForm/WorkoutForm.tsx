import { format as formatDate, parse as parseDate } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Appbar, Button, Divider, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WorkoutValueKey } from "../../models/Workout/Core";
import {
  ExerciseHistoryRecord,
  WorkoutHistoryRecord,
} from "../../models/Workout/WorkoutHistory";
import { WorkoutTemplate } from "../../models/Workout/WorkoutTemplate";
import { WORKOUT_HISTORY_PROVIDER } from "../../providers/WorkoutHistoryProvider";
import { storeWorkout } from "../../services/backendService";
import { styles } from "../../styles/style";
import { DateTimePicker } from "../DateTimePicker/DateTimePicker";
import { CircuitForm } from "./CircuitForm/CircuitForm";
import { ExerciseForm } from "./ExerciseForm/ExerciseForm";
import { WorkoutValues } from "./common";

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
        const ret = await getWorkoutHistory(workoutTemplate);
        setWorkoutHistory(ret);
      } catch (error) {
        console.error(
          `Failed to get workout history: ${JSON.stringify(error)}`
        );
      }
    }

    getWorkoutHistoryWrapper();
  }, []);

  async function saveWorkout() {
    try {
      const workoutRecord = convertWorkoutValuesToRecord(
        workoutTemplate,
        workoutValues,
        workoutDate,
        workoutStartTime
      );
      await storeWorkout(workoutTemplate.key, workoutRecord);
    } catch (error) {
      Alert.alert(`Error saving workout: ${error.message}`);
      console.error(`${JSON.stringify(error)}`);
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
        <ScrollView style={{ width: "100%" }}>
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
            } else if ("circuit" in drill) {
              return (
                <CircuitForm
                  key={drill.circuit.key}
                  circuitTemplate={drill}
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
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

async function getWorkoutHistory(workoutTemplate: WorkoutTemplate) {
  return WORKOUT_HISTORY_PROVIDER.getWorkoutHistory(workoutTemplate);
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
          const key = WorkoutValueKey.createFromExercise(
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
    } else if ("circuit" in drill) {
      drill.sets.forEach((set) => {
        drill.circuit.exercises.forEach((wrappedExercise) => {
          wrappedExercise.exercise.measures.forEach((measure) => {
            const key = WorkoutValueKey.createFromCircuit(
              drill.circuit.key,
              wrappedExercise.exercise.key,
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
