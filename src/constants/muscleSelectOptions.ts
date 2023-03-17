import { MuscleGroup } from '../API';

export const MUSCLE_SELECT_OPTIONS = [
  {
    label: 'Back',
    value: MuscleGroup.BACK,
  },
  {
    label: 'Biceps',
    value: MuscleGroup.BICEPS,
  },
  {
    label: 'Cardio',
    value: MuscleGroup.CARDIO,
  },
  {
    label: 'Chest',
    value: MuscleGroup.CHEST,
  },
  {
    label: 'Core',
    value: MuscleGroup.CORE,
  },
  {
    label: 'Forearms',
    value: MuscleGroup.FOREARMS,
  },
  {
    label: 'Full Body',
    value: MuscleGroup.FULLBODY,
  },
  {
    label: 'Legs',
    value: MuscleGroup.LEGS,
  },
  {
    label: 'Neck',
    value: MuscleGroup.NECK,
  },
  {
    label: 'Shoulders',
    value: MuscleGroup.SHOULDERS,
  },
  {
    label: 'Triceps',
    value: MuscleGroup.TRICEPS,
  },
  {
    label: 'Weightlifting',
    value: MuscleGroup.WEIGHTLIFTING,
  },
];

export const MUSCLE_VALUES_MAP = MUSCLE_SELECT_OPTIONS.reduce<
  Record<MuscleGroup, string>
>((acc, cur) => {
  acc[cur.value] = cur.label;
  return acc;
}, {} as Record<MuscleGroup, string>);
