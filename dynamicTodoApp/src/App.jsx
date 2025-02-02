import { useState, useEffect, useCallback } from 'react';
import FilterButtons from './components/FilterButton';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [nameInput, setNameInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setTodos(prev => [...prev, {
      id: Date.now(),
      name: nameInput.trim(),
      description: descInput.trim(),
      completed: false
    }]);
    setNameInput('');
    setDescInput('');
  }, [nameInput, descInput]);

  const deleteTodo = useCallback(id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleComplete = useCallback(id => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  }, []);

  const startEdit = useCallback((id, name, desc) => {
    setEditId(id);
    setEditName(name);
    setEditDesc(desc);
  }, []);

  const updateTodo = useCallback(e => {
    e.preventDefault();
    if (!editName.trim()) return;
    setTodos(prev => prev.map(todo => 
      todo.id === editId ? {...todo, 
        name: editName.trim(),
        description: editDesc.trim()
      } : todo
    ));
    setEditId(null);
  }, [editName, editDesc, editId]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Todo List
      </h1>
      
      <TodoForm 
        nameInput={nameInput}
        descInput={descInput}
        setNameInput={setNameInput}
        setDescInput={setDescInput}
        onSubmit={addTodo}
      />
      
      <FilterButtons filter={filter} setFilter={setFilter} />
      
      <div className="space-y-3">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editId === todo.id}
            editName={editName}
            editDesc={editDesc}
            setEditName={setEditName}
            setEditDesc={setEditDesc}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
            onStartEdit={startEdit}
            onUpdate={updateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;