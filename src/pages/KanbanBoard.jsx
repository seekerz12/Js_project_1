import { useState } from 'react';
import { format } from 'date-fns';
import TaskModal from '../components/TaskModal';

export default function KanbanBoard({ tasks, setTasks, categories, setCategories }) {
  const columns = ['TO DO', 'DOING', 'DONE'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const completeDate = newStatus === 'DONE' ? new Date().toISOString() : null;
        return { ...task, status: newStatus, completeDate };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => setTasks(tasks.filter(t => t.id !== taskId));

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => (t.id === taskData.id ? taskData : t)));
    } else {
      setTasks([...tasks, taskData]);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <button onClick={openCreateModal} className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(45,212,191,0.3)]">
          + Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(status => (
          <div key={status} className="bg-glass border border-glassBorder rounded-2xl p-4 backdrop-blur-sm min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-slate-200">
              {status}
              <span className="text-sm bg-slate-800/80 px-3 py-1 rounded-full text-slate-300">
                {tasks.filter(t => t.status === status).length}
              </span>
            </h2>
            
            <div className="flex flex-col gap-4">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all shadow-lg group relative">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-violet-500/20 text-violet-300">
                      {task.category}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button onClick={() => openEditModal(task)} className="text-teal-400 text-sm hover:text-teal-300">Edit</button>
                      <button onClick={() => deleteTask(task.id)} className="text-red-400 text-sm hover:text-red-300">Delete</button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 text-slate-100">{task.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{task.description}</p>
                  
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                    <span>Due: {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No Date'}</span>
                  </div>
                  
                  <div className="flex gap-2 text-xs">
                    {status !== 'TO DO' && (
                      <button onClick={() => moveTask(task.id, 'TO DO')} className="flex-1 bg-slate-800/80 hover:bg-slate-700 py-1.5 rounded transition-colors text-slate-300">To Do</button>
                    )}
                    {status !== 'DOING' && (
                      <button onClick={() => moveTask(task.id, 'DOING')} className="flex-1 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 py-1.5 rounded transition-colors border border-teal-500/20">Doing</button>
                    )}
                    {status !== 'DONE' && (
                      <button onClick={() => moveTask(task.id, 'DONE')} className="flex-1 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 py-1.5 rounded transition-colors border border-violet-500/20">Done</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
        categories={categories}
        setCategories={setCategories}
        editingTask={editingTask}
      />
    </>
  );
}