import { useState } from "react";

export default function TaskList({ tasks = [], onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const startEdit = (t) => {
    setEditingId(t._id);
    setEditForm({ title: t.title, description: t.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", description: "" });
  };

  const saveEdit = () => {
    onUpdate(editingId, editForm);
    cancelEdit();
  };

  const toggleComplete = (t) => {
    onUpdate(t._id, { ...t, completed: !t.completed });
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">No tasks found.</p>
      ) : (
        tasks.map((t) => (
          <div
            key={t._id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border p-3 rounded-xl ${
              t.completed ? "bg-green-50" : ""
            }`}
          >
            {editingId === t._id ? (
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  className="border rounded-lg p-2"
                  value={editForm.title}
                  onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Title"
                />
                <input
                  className="border rounded-lg p-2"
                  value={editForm.description}
                  onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Description"
                />
              </div>
            ) : (
              <div
                className={`flex-1 cursor-pointer ${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => toggleComplete(t)}
              >
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-600">{t.description}</p>
              </div>
            )}

            <div className="flex gap-2">
              {editingId === t._id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(t)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(t._id)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
