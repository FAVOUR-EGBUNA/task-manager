export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "Work" | "Personal" | "Urgent";
  completed: boolean;
}
