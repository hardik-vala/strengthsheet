import { WorkoutTemplate } from "../models/WorkoutTemplate";

const DISTANCE_REGEX = /^\d+(\.\d+)?\s*(mi|km|m|ft|yd|cm|mm|in)$/;
const TIMER_MINUTES_SECONDS_REGEX = /^[0-5][0-9]:[0-5][0-9]$/;
const TIMER_HOURS_MINUTES_SECONDS_REGEX = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;

export const WORKOUT_TEMPLATE_REGISTRY: { [k: string]: WorkoutTemplate } = {
  rowing: {
    key: "rowing",
    category: "cardio",
    displayTitle: "Rowing",
    description: "Rower, Cool Down",
    iconName: "rowing",
    inputs: [
      {
        key: "total-time",
        index: 0,
        displayTitle: "Total Time",
        sheetTitle: "Time",
        placeholder: "30:00",
        validator: isValidTimerInput,
      },
      {
        key: "distance",
        index: 1,
        displayTitle: "Total Distance",
        sheetTitle: "Distance",
        placeholder: "5000m",
        validator: isValidDistanceInput,
      },
    ],
  },
  push: {
    key: "push",
    category: "strength",
    displayTitle: "Push",
    description: "Flat Bench Press, Angled Bench Press",
    iconName: "weight-lifter",
    inputs: [],
  },
  pull: {
    key: "pull",
    category: "strength",
    displayTitle: "Pull",
    description: "Lat Pull-ups, Tricep Dips, Bent Over Rows",
    iconName: "weight-lifter",
    inputs: [],
  },
  legs: {
    key: "legs",
    category: "strength",
    displayTitle: "Legs",
    description: "Wide-stance Squats, Hip Thrusts, Bulgarian Split Squats",
    iconName: "weight-lifter",
    inputs: [],
  },
  ptRoutine: {
    key: "ptRoutine",
    category: "pt",
    displayTitle: "PT Routine",
    description: "Chicken Wings, Side-to-sides, Single-leg Bridges",
    iconName: "yoga",
    inputs: [],
  },
  stretching: {
    key: "stretching",
    category: "pt",
    displayTitle: "Stretching",
    description: "Standing Calf Stretch, Standing IT Band Stretch",
    iconName: "yoga",
    inputs: [],
  },
};

function isValidTimerInput(timer: string): boolean {
  if (timer === "") {
    return true;
  }

  return (
    TIMER_MINUTES_SECONDS_REGEX.test(timer) ||
    TIMER_HOURS_MINUTES_SECONDS_REGEX.test(timer)
  );
}

function isValidDistanceInput(distance: string): boolean {
  if (distance === "") {
    return true;
  }

  return DISTANCE_REGEX.test(distance);
}