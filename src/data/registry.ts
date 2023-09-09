import { WorkoutTemplate } from "../models/WorkoutTemplate";

const DISTANCE_REGEX = /^\d+(\.\d+)?\s*(mi|km|m|ft|yd|cm|mm|in)$/;
const TIMER_MINUTES_SECONDS_REGEX = /^[0-5][0-9]:[0-5][0-9]$/;
const TIMER_HOURS_MINUTES_SECONDS_REGEX = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;

export const WORKOUT_TEMPLATE_REGISTRY: { [k: string]: WorkoutTemplate } = {
  rowing: {
    key: "rowing",
    displayTitle: "Rowing",
    category: "cardio",
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