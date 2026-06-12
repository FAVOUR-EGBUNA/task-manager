import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

const categoryStyles: Record<string, string> = {
  Work: "bg-blue-100 text-blue-600",
  Personal: "bg-green-100 text-green-600",
  Urgent: "bg-red-100 text-red-600",
};

const TaskCard = ({ task, onDelete, onToggle }: Props) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow p-5 border-l-4 ${task.completed ? "border-green-400 opacity-60" : "border-blue-400"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3
          className={`font-bold text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}
        >
          {task.title}
        </h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${categoryStyles[task.category]}`}
        >
          {task.category}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-2">{task.description}</p>
      <p className="text-xs text-gray-400 mb-4">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id, !task.completed)}
          className="w-4 h-4 accent-blue-500 cursor-pointer"
        />
        <label className="text-sm text-gray-500">
          {task.completed ? "Completed" : "Mark Complete"}
        </label>
        <button
          onClick={() => onDelete(task._id)}
          className="ml-auto bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1.5 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
