import React from 'react';

const FilterButtons = React.memo(({ filter, setFilter }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="mb-4 flex gap-2">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`flex-1 py-2 px-4 rounded transition-colors ${
            filter === key 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
});

export default FilterButtons;