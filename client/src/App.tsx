import { useState, useEffect } from 'react';
import type { Task } from './types/task';
import { getTasks, createTask, deleteTask, updateTask } from './api/task';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreate = async (task: Omit<Task, '_id'>) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleToggle = async (id: string, completed: boolean) => {
    const updated = await updateTask(id, { completed });
    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch = categoryFilter === 'All' || task.category === categoryFilter;
    const statusMatch =
      statusFilter === 'All' ||
      (statusFilter === 'Completed' && task.completed) ||
      (statusFilter === 'Pending' && !task.completed);
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Task <span className="text-lime-400">Manager</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">Stay organised. Get things done.</p>
        </div>

        <TaskForm onTaskCreated={handleCreate} />

        <div className="flex gap-4 mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-zinc-500 mt-10 text-lg">No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;