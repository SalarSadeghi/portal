// PriorityOption DTO
export interface PriorityOption {
  value: number; // ID
  label: string; // Display text
}

// Options array
export const priorityOptions: PriorityOption[] = [
  { value: 539, label: "الویت کم" },
  { value: 540, label: "الویت زیاد" },
  { value: 541, label: "وضعیت بحرانی" },
  { value: 542, label: "نقطه قوت" },
];
