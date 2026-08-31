import { useState, useEffect } from 'react';

export default function TaskModal({ isOpen, onClose, onSave, categories, setCategories, editingTask }) {
  // Hardcoded responsible persons as per instructions
  const people = [
    { id: '1', name: 'Alex Chen' },
    { id: '2', name: 'Sam Taylor' },
    { id: '3', name: 'Jordan Lee' }
  ];

  const defaultState = {
    title: '', description: '', category: categories[0] || '',
    startDate: '', dueDate: '', responsiblePerson: people[0].id, status: 'TO DO'
  };

  const [formData, setFormData] = useState(defaultState);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (editingTask) setFormData(editingTask);
    else setFormData(defaultState);
  }, [editingTask, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: editingTask?.id || crypto.randomUUID(),
      // completeDate remains null until moved to DONE
      completeDate: editingTask?.completeDate || null 
    });
    onClose();
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  const inputClass = "w-full bg-slate-900/50 border border-glassBorder rounded p-2 text-white outline-none focus:border-teal-400 transition-colors";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-slate-950 border border-glassBorder rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-teal-400">
          {editingTask ? 'Edit Task' : 'Create Task'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Title</label>
            <input required type="text" className={inputClass} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Description</label>
            <textarea required className={inputClass} rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Category</label>
            {isAddingCategory ? (
              <div className="flex gap-2">
                <input type="text" className={inputClass} placeholder="New category..." value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                <button type="button" onClick={handleAddCategory} className="bg-teal-500/20 text-teal-300 px-4 rounded hover:bg-teal-500/40">Add</button>
                <button type="button" onClick={() => setIsAddingCategory(false)} className="bg-slate-800 px-4 rounded">Cancel</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select className={inputClass} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <button type="button" onClick={() => setIsAddingCategory(true)} className="bg-slate-800 px-4 rounded text-sm hover:bg-slate-700 whitespace-nowrap">
                  + New
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Start Date</label>
              <input required type="date" className={inputClass} value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Due Date</label>
              <input required type="date" className={inputClass} value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Responsible Person</label>
            <select className={inputClass} value={formData.responsiblePerson} onChange={e => setFormData({...formData, responsiblePerson: e.target.value})}>
              {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="flex gap-4 mt-6 pt-4 border-t border-glassBorder">
            <button type="button" onClick={onClose} className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2 rounded transition-colors">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}