'use client';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: Date;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: ''
  });

  const addTask = async () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      createdAt: new Date()
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  const toggleTask = async (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = async (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff3b30';
      case 'medium': return '#ff9500';
      case 'low': return '#34c759';
      default: return '#8e8e93';
    }
  };

  return (
    <div>
      {/* Add New Task Form */}
      <div style={{
        backgroundColor: 'var(--dark-secondary)',
        padding: '2rem',
        borderRadius: 'var(--border-radius)',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          Add New Task
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          />
          
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          />
          
          <button
            onClick={addTask}
            className="cta-button"
            style={{ margin: 0, width: '100%' }}
          >
            Add Task
          </button>
        </div>
        
        <textarea
          placeholder="Task description (optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            minHeight: '80px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
          rows={3}
        />
      </div>

      {/* Tasks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.length === 0 ? (
          <div style={{
            backgroundColor: 'var(--dark-secondary)',
            padding: '3rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <p>No tasks yet. Add your first task above!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={{
              backgroundColor: 'var(--dark-secondary)',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease',
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{
                  width: '18px',
                  height: '18px',
                  marginTop: '2px',
                  accentColor: 'var(--purple-primary)'
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.6 : 1
                }}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    marginBottom: '0.75rem',
                    lineHeight: 1.5
                  }}>
                    {task.description}
                  </p>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{
                    backgroundColor: getPriorityColor(task.priority),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {task.priority}
                  </span>
                  
                  {task.dueDate && (
                    <span style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem'
                    }}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff3b30',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
        