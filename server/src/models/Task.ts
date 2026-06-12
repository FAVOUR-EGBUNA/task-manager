import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  category: "Work" | "Personal" | "Urgent";
  completed: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    category: {
      type: String,
      enum: ["Work", "Personal", "Urgent"],
      required: [true, "Category is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>("Task", taskSchema);
