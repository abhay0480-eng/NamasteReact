import React, { useReducer, useRef, useCallback } from 'react';
import { useState } from 'react';

// Reducer for uploads
const uploadReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FILE':
      return [...state, { ...action.payload, progress: 0, error: null }];
    case 'UPDATE_PROGRESS':
      return state.map(file =>
        file.id === action.payload.id ? { ...file, progress: action.progress } : file
      );
    case 'COMPLETE_UPLOAD':
      return state.map(file =>
        file.id === action.payload ? { ...file, progress: 100, error: null } : file
      );
    case 'FAIL_UPLOAD':
      return state.map(file =>
        file.id === action.payload.id ? { ...file, error: action.error } : file
      );
    case 'CANCEL_UPLOAD':
      return state.filter(file => file.id !== action.payload);
    default:
      return state;
  }
};

// Mock API upload (simulate progress)
const mockUpload = (file, onProgress, onSuccess, onError) => {
  const interval = setInterval(() => {
    onProgress(Math.min(100, onProgress() + 10)); // Simulate 10% increments
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    Math.random() > 0.2 ? onSuccess() : onError('Upload failed');
  }, 5000);
};

const FileUploader = () => {
  const [files, dispatch] = useReducer(uploadReducer, []);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  // Validate file type/size
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!validTypes.includes(file.type)) return 'Invalid file type';
    if (file.size > maxSize) return 'File too large';
    return null;
  };

  // Handle file selection
  const handleFiles = (newFiles) => {
    Array.from(newFiles).forEach(file => {
      const error = validateFile(file);
      if (error) {
        dispatch({ type: 'ADD_FILE', payload: { id: Date.now(), file, error } });
      } else {
        const upload = { id: Date.now(), file };
        dispatch({ type: 'ADD_FILE', payload: upload });

        mockUpload(
          upload.file,
          (progress) => {
            dispatch({ type: 'UPDATE_PROGRESS', payload: upload, progress });
          },
          () => dispatch({ type: 'COMPLETE_UPLOAD', payload: upload.id }),
          (error) => dispatch({ type: 'FAIL_UPLOAD', payload: upload, error })
        );
      }
    });
  };

  // Drag-and-drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    setIsDragging(e.type === 'dragenter');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Cancel upload
  const cancelUpload = (id) => {
    dispatch({ type: 'CANCEL_UPLOAD', payload: id });
  };

  return (
    <div className="uploader">
      {/* Drop Zone */}
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        Drag files here or click to upload
        <input
          type="file"
          ref={inputRef}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          hidden
          accept="image/png, image/jpeg"
        />
      </div>

      {/* Upload List */}
      <div className="upload-list">
        {files.map(({ id, file, progress, error }) => (
          <div key={id} className={`upload-item ${error ? 'error' : ''}`}>
            <div className="info">
              <span>{file.name}</span>
              {error ? (
                <span className="error">{error}</span>
              ) : (
                <span>{progress === 100 ? 'Done' : `${progress}%`}</span>
              )}
            </div>
            {progress < 100 && !error && (
              <button onClick={() => cancelUpload(id)}>Cancel</button>
            )}
            {error && <button onClick={() => handleFiles([file])}>Retry</button>}
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;