// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, KanbanSquare } from 'lucide-react';
import KanbanBoard from './pages/KanbanBoard';
import Dashboard from './pages/Dashboard';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage('kanban-tasks', []);
  const [categories, setCategories] = useLocalStorage('kanban-categories', ['Development', 'Design', 'Marketing']);

  return (
    <Router basename="/Js_project_1">
      <div className="min-h-screen p-6 font-sans">
        <nav className="flex justify-between items-center mb-8 p-4 bg-glass border border-glassBorder rounded-2xl backdrop-blur-md">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-violet-500 text-transparent bg-clip-text">
            Swan's Kanban
          </h1>
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-2 hover:text-teal-400 transition-colors">
              <KanbanSquare size={20} /> Kanban
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<KanbanBoard tasks={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} />} />
          <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;