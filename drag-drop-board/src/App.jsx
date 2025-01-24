import React, { useState, useEffect } from 'react';

// Initial board data
const initialColumns = [
  { id: 'todo', title: 'Todo', tasks: [{ id: 'task-1', text: 'Task 1' }] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

const DragDropGrid = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('board');
    return saved ? JSON.parse(saved) : initialColumns;
  });
  const [newTaskText, setNewTaskText] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(columns));
  }, [columns]);

  // Handle drag start
  const handleDragStart = (e, taskId, sourceColId) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, sourceColId }));
  };

  // Handle drag over (allow drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, targetColId) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { taskId, sourceColId } = data;

    // Find source and target columns
    const sourceCol = columns.find(col => col.id === sourceColId);
    const targetCol = columns.find(col => col.id === targetColId);
    const task = sourceCol.tasks.find(task => task.id === taskId);

    // Remove from source column
    const updatedSourceTasks = sourceCol.tasks.filter(t => t.id !== taskId);
    
    // Add to target column
    const updatedTargetTasks = [...targetCol.tasks, task];

    // Update columns state
    setColumns(prev =>
      prev.map(col => {
        if (col.id === sourceColId) return { ...col, tasks: updatedSourceTasks };
        if (col.id === targetColId) return { ...col, tasks: updatedTargetTasks };
        return col;
      })
    );
  };

  // Add new task to a column
  const addTask = (columnId) => {
    if (!newTaskText.trim()) return;
    const newTask = { id: `task-${Date.now()}`, text: newTaskText };
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
    setNewTaskText('');
  };

  return (
    <div className="board">
      {columns.map(column => (
        <div
          key={column.id}
          className="column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <h3>{column.title}</h3>
          <div className="tasks">
            {column.tasks.map(task => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id, column.id)}
              >
                {task.text}
              </div>
            ))}
          </div>
          <div className="add-task">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="New task"
            />
            <button onClick={() => addTask(column.id)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DragDropGrid;