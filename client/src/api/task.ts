import axios from "axios";
import type { Task } from "../types/task";

const BASE_URL = "http://localhost:5000/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createTask = async (task: Omit<Task, "_id">): Promise<Task> => {
  const res = await axios.post(BASE_URL, task);
  return res.data;
};

export const updateTask = async (
  id: string,
  task: Partial<Task>,
): Promise<Task> => {
  const res = await axios.put(`${BASE_URL}/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
