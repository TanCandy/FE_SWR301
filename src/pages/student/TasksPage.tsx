import { useState } from 'react';
import { CheckSquare, Plus, MoreVertical, Clock, User } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Design dashboard UI', description: 'Create wireframes and mockups', assignee: 'Taylor Kim', status: 'done', priority: 'high', dueDate: '2024-03-15' },
  { id: '2', title: 'Implement API endpoints', description: 'REST API for user management', assignee: 'Jamie Rodriguez', status: 'done', priority: 'high', dueDate: '2024-03-16' },
  { id: '3', title: 'Create ML model', description: 'Build predictive model', assignee: 'Jordan Patel', status: 'doing', priority: 'medium', dueDate: '2024-03-20' },
  { id: '4', title: 'Write documentation', description: 'API documentation', assignee: 'Chris Lee', status: 'doing', priority: 'low', dueDate: '2024-03-22' },
  { id: '5', title: 'Deploy to staging', description: 'Deploy application', assignee: 'Alex Johnson', status: 'todo', priority: 'high', dueDate: '2024-03-25' },
  { id: '6', title: 'Unit testing', description: 'Write unit tests', assignee: 'Jamie Rodriguez', status: 'todo', priority: 'medium', dueDate: '2024-03-26' },
];

const columns = [
  { id: 'todo', title: 'To Do', color: 'gray', tasks: mockTasks.filter((t) => t.status === 'todo') },
  { id: 'doing', title: 'In Progress', color: 'blue', tasks: mockTasks.filter((t) => t.status === 'doing') },
  { id: 'done', title: 'Done', color: 'green', tasks: mockTasks.filter((t) => t.status === 'done') },
];

export default function StudentTasksPage() {
  const [tasks] = useState<Task[]>(mockTasks);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'low': return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <SharedLayout
      title="Tasks"
      subtitle="Manage your team tasks"
      breadcrumbs={[{ label: 'Tasks' }]}
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-3xl font-bold text-gray-400">{tasks.filter((t) => t.status === 'todo').length}</p>
          <p className="text-sm text-gray-500">To Do</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-3xl font-bold text-blue-600">{tasks.filter((t) => t.status === 'doing').length}</p>
          <p className="text-sm text-gray-500">In Progress</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-3xl font-bold text-green-600">{tasks.filter((t) => t.status === 'done').length}</p>
          <p className="text-sm text-gray-500">Done</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${column.color}-500`} />
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="text-sm text-gray-400">({column.tasks.length})</span>
              </div>
            </div>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div key={task.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {task.dueDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{task.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SharedLayout>
  );
}
