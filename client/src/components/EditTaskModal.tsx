import { useState } from "react";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onClose: () => void;
  onSave: (id: string, updated: Partial<Task>) => void;
}

const EditTaskModal = ({ task, onClose, onSave }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate.slice(0, 10));
  const [category, setCategory] = useState(task.category);

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

    onSave(task._id, { title, description, dueDate, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-bold text-lime-400 mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none min-h-[80px]"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-zinc-800 border border-zinc-600 text-zinc-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "Work" | "Personal" | "Urgent")
            }
            className="bg-zinc-800 border border-zinc-600 text-zinc-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-semibold py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-lime-400 hover:bg-lime-300 text-zinc-900 font-bold py-2 rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
