// src/pages/Dashboard.jsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { isAfter, isBefore, isEqual, parseISO, startOfDay } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard({ tasks }) {
  // Summary Calculations
  const total = tasks.length;
  const todo = tasks.filter(t => t.status === 'TO DO').length;
  const doing = tasks.filter(t => t.status === 'DOING').length;
  const done = tasks.filter(t => t.status === 'DONE').length;
  
  const today = startOfDay(new Date());
  const overdue = tasks.filter(t => t.status !== 'DONE' && isAfter(today, parseISO(t.dueDate))).length;

  // Chart 1: Status (Pie)
  const statusData = {
    labels: ['TO DO', 'DOING', 'DONE'],
    datasets: [{
      data: [todo, doing, done],
      backgroundColor: ['#475569', '#14b8a6', '#8b5cf6'],
      borderColor: 'rgba(255,255,255,0.1)',
    }]
  };

  // Chart 2: Category (Bar) - calculating dynamic categories
  const categoriesMap = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});
  
  const categoryData = {
    labels: Object.keys(categoriesMap),
    datasets: [{
      label: 'Tasks per Category',
      data: Object.values(categoriesMap),
      backgroundColor: '#3b82f6',
    }]
  };

  // Chart 3: Performance (Early, On Time, Late)
  let early = 0, onTime = 0, late = 0;
  tasks.filter(t => t.status === 'DONE').forEach(task => {
    if (!task.completeDate) return;
    const complete = startOfDay(parseISO(task.completeDate));
    const due = startOfDay(parseISO(task.dueDate));
    
    if (isBefore(complete, due)) early++;
    else if (isEqual(complete, due)) onTime++;
    else late++;
  });

  const performanceData = {
    labels: ['Early', 'On Time', 'Late'],
    datasets: [{
      data: [early, onTime, late],
      backgroundColor: ['#10b981', '#3b82f6', '#ef4444'],
      borderColor: 'rgba(255,255,255,0.1)',
    }]
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Tasks', value: total, color: 'text-white' },
          { label: 'To Do', value: todo, color: 'text-slate-400' },
          { label: 'Doing', value: doing, color: 'text-teal-400' },
          { label: 'Done', value: done, color: 'text-violet-400' },
          { label: 'Overdue', value: overdue, color: 'text-red-400' },
        ].map(card => (
          <div key={card.label} className="bg-glass border border-glassBorder rounded-xl p-6 text-center backdrop-blur-md">
            <h3 className="text-slate-400 text-sm font-medium mb-2">{card.label}</h3>
            <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-glass border border-glassBorder p-6 rounded-xl">
          <h3 className="text-center mb-4 font-semibold text-slate-300">Task Status</h3>
          <Pie data={statusData} />
        </div>
        <div className="bg-glass border border-glassBorder p-6 rounded-xl">
          <h3 className="text-center mb-4 font-semibold text-slate-300">Task Categories</h3>
          <Bar data={categoryData} options={{ scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } } } }} />
        </div>
        <div className="bg-glass border border-glassBorder p-6 rounded-xl">
          <h3 className="text-center mb-4 font-semibold text-slate-300">Completion Performance</h3>
          <Doughnut data={performanceData} />
        </div>
      </div>
    </div>
  );
}