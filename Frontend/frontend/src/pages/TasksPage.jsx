import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const API_URL = "http://localhost:3400/api/tasks";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data.data || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      await axios.post(API_URL, task);
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task");
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">📋 Task Manager</h1>
        <TaskForm onAdd={addTask} />
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
        )}
      </div>
    </div>
  );
}
