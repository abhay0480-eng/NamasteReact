import React from 'react';

const TodoForm = ({ 
  nameInput, 
  descInput, 
  setNameInput, 
  setDescInput, 
  onSubmit 
}) => (
  <form onSubmit={onSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
    <input
      type="text"
      placeholder="Task name"
      value={nameInput}
      onChange={(e) => setNameInput(e.target.value)}
      className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
    />
    <input
      type="text"
      placeholder="Description (optional)"
      value={descInput}
      onChange={(e) => setDescInput(e.target.value)}
      className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
    />
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
    >
      Add Task
    </button>
  </form>
);

export default React.memo(TodoForm);