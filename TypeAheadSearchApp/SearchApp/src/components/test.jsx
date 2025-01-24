import React, { useState, useEffect, useRef, useCallback } from 'react';

// Mock API (replace with real API call)
const fetchSuggestions = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  const dummyData = {
    "app": ["apple", "application", "appetizer"],
    "ban": ["banana", "band", "banner"],
    "cat": ["cat", "caterpillar", "category"]
  };
  return dummyData[query] || [];
};

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const cache = useRef({});
  const wrapperRef = useRef(null);

  const debouncedQuery = useDebounce(query, 300);

  // Fetch suggestions
  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    // Check cache
    if (cache.current[debouncedQuery]) {
      setSuggestions(cache.current[debouncedQuery]);
      return;
    }

    setIsLoading(true);
    fetchSuggestions(debouncedQuery)
      .then(data => {
        cache.current[debouncedQuery] = data;
        setSuggestions(data);
        setError(null);
      })
      .catch(err => setError('Failed to fetch suggestions'))
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      setQuery(suggestions[activeIndex]);
      setSuggestions([]);
    }
  };

  // Highlight matching text
  const highlightMatch = (text) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  };

  return (
    <div ref={wrapperRef} className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={index === activeIndex ? 'bg-black text-white' : ''}
              onClick={() => {
                setQuery(suggestion);
                setSuggestions([]);
              }}
              dangerouslySetInnerHTML={{ __html: highlightMatch(suggestion) }}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;