import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert("Please fill all fields");
      return;
    }
    onAdd({ ...form, completed: false }); // المهام تبدأ مش مكتملة
    setForm({ title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
      <input
        type="text"
        name="title"
        value={form.title}
        placeholder="Task Title"
        onChange={handleChange}
        className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
      />
      <textarea
        name="description"
        value={form.description}
        placeholder="Task Description"
        onChange={handleChange}
        className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
      >
        ➕ Add Task
      </button>
    </form>
  );
}
