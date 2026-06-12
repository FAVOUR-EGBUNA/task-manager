import { useState } from "react";
import type { Task } from "../types/task";
import EditTaskModal from "./EditTaskModal";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string, updated: Partial<Task>) => void;
}

const categoryStyles: Record<string, string> = {
  Work: "bg-blue-900 text-blue-300",
  Personal: "bg-purple-900 text-purple-300",
  Urgent: "bg-red-900 text-red-300",
};

const TaskCard = ({ task, onDelete, onToggle, onEdit }: Props) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div
        className={`bg-zinc-900 border rounded-2xl p-5 transition ${task.completed ? "border-lime-400 opacity-50" : "border-zinc-700"}`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3
            className={`font-bold text-lg ${task.completed ? "line-through text-zinc-500" : "text-white"}`}
          >
            {task.title}
          </h3>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${categoryStyles[task.category]}`}
          >
            {task.category}
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-2">{task.description}</p>
        <p className="text-xs text-zinc-500 mb-4">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task._id, !task.completed)}
            className="w-4 h-4 accent-lime-400 cursor-pointer"
          />
          <label className="text-sm text-zinc-400">
            {task.completed ? "Completed" : "Mark Complete"}
          </label>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setShowEdit(true)}
              className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 text-xs px-4 py-1.5 rounded-lg transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-600 hover:bg-red-500 text-white text-xs px-4 py-1.5 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEdit(false)}
          onSave={onEdit}
        />
      )}
    </>
  );
};

export default TaskCard;
