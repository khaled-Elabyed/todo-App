import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية لعرض المهام */}
        <Route path="/" element={<TasksPage />} />
        {/* أي مسار غلط يرجّع للصفحة الرئيسية */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
