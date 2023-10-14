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
import { styles } from "../../styles/style";
import { CircuitForm } from "./CircuitForm/CircuitForm";
import { ExerciseForm } from "./ExerciseForm/ExerciseForm";
import { WorkoutValues } from "./common";

interface WorkoutFormProps {
  workoutTemplate: WorkoutTemplate;
  onBack: () => void;
}

export function WorkoutForm({ workoutTemplate, onBack }: WorkoutFormProps) {
  const [workoutHistory, setWorkoutHistory] = useState(null);
  const [workoutValues, setWorkoutValues] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        startTime,
        elapsedTime
      );
      await WORKOUT_HISTORY_PROVIDER.addRecordToWorkoutHistory(
        workoutTemplate.key,
        workoutRecord
      );
    } catch (error) {
      Alert.alert(`Error saving workout: ${error.message}`);
      console.error(`${JSON.stringify(error)}`);
      return;
    }
  }

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} testID="back-action" />
        <Appbar.Content
          title={workoutTemplate.displayName}
          titleStyle={{ fontWeight: "bold" }}
        />
      </Appbar.Header>
      <View style={styles.center}>
        <StatusBar style="auto" />
        {workoutTemplate.note && (
          <Text variant="bodyLarge">{workoutTemplate.note}</Text>
        )}
        <Text variant="bodyMedium" style={{ marginBottom: 15 }}>
          {getFormattedTime(elapsedTime)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Button
            buttonColor="lightgreen"
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
              height: 40,
              width: "25%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSaving ? "Saving" : "Finish"}
          </Button>
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
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

function getFormattedTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  return `${padTimePart(minutes)}:${padTimePart(seconds % 60)}`;
}

function padTimePart(num: number) {
  return num < 10 ? `0${num}` : num;
}

async function getWorkoutHistory(workoutTemplate: WorkoutTemplate) {
  return WORKOUT_HISTORY_PROVIDER.getWorkoutHistory(workoutTemplate);
}

function convertWorkoutValuesToRecord(
  workoutTemplate: WorkoutTemplate,
  workoutValues: WorkoutValues,
  workoutStartTime: Date,
  workoutElapsedTime: number
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

          exercises.push({
            key,
            value,
          });
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
    startTimestamp: workoutStartTime,
    elapsedTime: workoutElapsedTime,
    exercises,
  };
}
