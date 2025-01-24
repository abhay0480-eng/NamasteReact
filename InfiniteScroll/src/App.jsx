import React, { useState, useEffect, useRef, useCallback } from 'react';

// Mock API (simulate paginated data)
const fetchMockData = async (page) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  const itemsPerPage = 10;
  return Array.from({ length: itemsPerPage }, (_, i) => ({
    id: page * itemsPerPage + i,
    text: `Item ${page * itemsPerPage + i}`,
  }));
};

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  // Ref for the loader element
  const loaderRef = useRef(null);

  // Fetch data when page changes
  const loadData = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const newItems = await fetchMockData(page);
      setItems(prev => [...prev, ...newItems]);
      // Assume the API returns empty data when no more items exist
      if (newItems.length === 0) setHasMore(false);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  // Initialize Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
          setPage(prev => prev + 1); // Trigger page increment
        }
      },
      { threshold: 1.0 } // Load when loader is fully visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loadData]);

  // Load data when page updates
  useEffect(() => {
    loadData();
  }, [page]);

  // Reset on unmount (cleanup)
  useEffect(() => {
    return () => {
      setItems([]);
      setPage(0);
    };
  }, []);

  return (
    <div className="infinite-scroll-container">
      <div className="list">
        {items.map(item => (
          <div key={item.id} className="list-item">{item.text}</div>
        ))}
      </div>

      {/* Loader or error message */}
      <div ref={loaderRef} className="loader">
        {isLoading && <div>Loading more items...</div>}
        {error && <div className="error">{error}</div>}
        {!hasMore && <div>No more items to load.</div>}
      </div>
    </div>
  );
};

export default InfiniteScrollList;