import { useState } from "react";
import type { Task } from "../types/task";

interface Props {
  onTaskCreated: (task: Omit<Task, "_id">) => void;
}

const TaskForm = ({ onTaskCreated }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<"Work" | "Personal" | "Urgent">(
    "Work",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dueDate);

    if (!title || !description || !dueDate) {
      alert("All fields are required");
      return;
    }

    if (selected < today) {
      alert("Due date cannot be in the past");
      return;
    }

    onTaskCreated({ title, description, dueDate, category, completed: false });
    setTitle("");
    setDescription("");
    setDueDate("");
    setCategory("Work");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-gray-700">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[80px]"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as "Work" | "Personal" | "Urgent")
        }
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Urgent">Urgent</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
