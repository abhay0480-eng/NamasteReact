import React from 'react';

const TodoItem = React.memo(({
  todo,
  isEditing,
  editName,
  editDesc,
  setEditName,
  setEditDesc,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onUpdate
}) => {
  return (
    <div className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {isEditing ? (
        <form onSubmit={onUpdate} className="space-y-3">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => onUpdate({ preventDefault: () => {} })}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              className="mt-1 h-4 w-4 text-blue-500 focus:ring-blue-400 rounded border-gray-300"
            />
            <div className="flex-1">
              <h3 className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.name}
              </h3>
              {todo.description && (
                <p className={`text-gray-600 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}
            </div>
          </div>
          <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onStartEdit(todo.id, todo.name, todo.description)}
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default TodoItem;