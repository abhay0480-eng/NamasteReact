import React, { useState, useEffect, useReducer } from 'react';

// Reducer for events
const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, action.payload];
    case 'UPDATE_EVENT':
      return state.map(event => 
        event.id === action.payload.id ? action.payload : event
      );
    case 'DELETE_EVENT':
      return state.filter(event => event.id !== action.payload);
    default:
      return state;
  }
};

// Generate time slots for a day (8 AM - 8 PM)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 20; hour++) {
    slots.push(`${hour}:00 - ${hour + 1}:00`);
  }
  return slots;
};

const CalendarScheduler = () => {
  const [events, dispatch] = useReducer(eventReducer, [], () => {
    const saved = localStorage.getItem('calendarEvents');
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEvent, setCurrentEvent] = useState(null);
  const [dragEvent, setDragEvent] = useState(null);

  // Persist events
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Check for overlapping events
  const hasTimeConflict = (newEvent) => {
    return events.some(event => 
      event.id !== newEvent.id &&
      event.date === newEvent.date &&
      (
        (newEvent.startTime < event.endTime && newEvent.endTime > event.startTime)
      )
    );
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const event = {
      id: currentEvent?.id || Date.now(),
      title: formData.get('title'),
      date: formData.get('date'),
      startTime: formData.get('startTime'),
      endTime: formData.get('endTime'),
    };

    if (hasTimeConflict(event)) {
      alert('Time conflict detected!');
      return;
    }

    dispatch({
      type: currentEvent ? 'UPDATE_EVENT' : 'ADD_EVENT',
      payload: event,
    });
    setIsModalOpen(false);
  };

  // Drag-and-drop handlers
  const handleDragStart = (e, event) => {
    setDragEvent(event);
  };

  const handleDrop = (e, date, timeSlot) => {
    if (!dragEvent) return;
    
    const [startHour] = timeSlot.split(':').map(Number);
    const updatedEvent = {
      ...dragEvent,
      date,
      startTime: startHour,
      endTime: startHour + 1,
    };

    if (!hasTimeConflict(updatedEvent)) {
      dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent });
    }
    setDragEvent(null);
  };

  return (
    <div className="calendar">
      {/* Calendar Header */}
      <div className="header">
        <button onClick={() => setSelectedDate(new Date())}>Today</button>
        <h2>{selectedDate.toLocaleDateString()}</h2>
        <button onClick={() => setIsModalOpen(true)}>Add Event</button>
      </div>

      {/* Calendar Grid */}
      <div className="grid">
        {generateTimeSlots().map((timeSlot) => (
          <div 
            key={timeSlot} 
            className="time-slot"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, selectedDate.toISOString().split('T')[0], timeSlot)}
          >
            <span>{timeSlot}</span>
            {events
              .filter(event => 
                event.date === selectedDate.toISOString().split('T')[0] &&
                event.startTime === parseInt(timeSlot.split(':')[0])
              )
              .map(event => (
                <div
                  key={event.id}
                  className="event"
                  draggable
                  onDragStart={(e) => handleDragStart(e, event)}
                >
                  {event.title}
                  <button onClick={() => dispatch({ type: 'DELETE_EVENT', payload: event.id })}>
                    ✕
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <h3>{currentEvent ? 'Edit Event' : 'New Event'}</h3>
            <input
              name="title"
              placeholder="Event Title"
              defaultValue={currentEvent?.title}
              required
            />
            <input
              type="date"
              name="date"
              defaultValue={currentEvent?.date || selectedDate.toISOString().split('T')[0]}
              required
            />
            <input
              type="number"
              name="startTime"
              placeholder="Start Hour (8-20)"
              min="8"
              max="20"
              defaultValue={currentEvent?.startTime}
              required
            />
            <input
              type="number"
              name="endTime"
              placeholder="End Hour (9-21)"
              min="9"
              max="21"
              defaultValue={currentEvent?.endTime}
              required
            />
            <div>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CalendarScheduler;