import React, { useReducer, useState } from 'react';

// Initial state
const initialState = {
  step: 1,
  name: '',
  email: '',
  age: '',
  gender: '',
  errors: {}
};

// Reducer to handle state changes
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value, errors: {} };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 };
    default:
      return state;
  }
};

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step validation rules
  const validateStep = () => {
    const errors = {};
    switch (state.step) {
      case 1:
        if (!state.name.trim()) errors.name = 'Name is required';
        if (!/^\S+@\S+\.\S+$/.test(state.email)) errors.email = 'Invalid email';
        break;
      case 2:
        if (!state.age || state.age < 18) errors.age = 'Age must be ≥18';
        if (!state.gender) errors.gender = 'Gender is required';
        break;
    }
    return errors;
  };

  // Handle next step
  const handleNext = () => {
    const errors = validateStep();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
    } else {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(JSON.stringify(state, null, 2));
    setIsSubmitting(false);
  };

  // Progress bar
  const progress = (state.step / 3) * 100;

  return (
    <div className="form-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>

      {state.step === 1 && (
        <div className="step">
          <h2>Step 1: User Details</h2>
          <input
            placeholder="Name"
            value={state.name}
            onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
          />
          {state.errors.name && <span className="error">{state.errors.name}</span>}

          <input
            placeholder="Email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })}
          />
          {state.errors.email && <span className="error">{state.errors.email}</span>}
        </div>
      )}

      {state.step === 2 && (
        <div className="step">
          <h2>Step 2: Profile Details</h2>
          <input
            type="number"
            placeholder="Age"
            value={state.age}
            onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'age', value: e.target.value })}
          />
          {state.errors.age && <span className="error">{state.errors.age}</span>}

          <select
            value={state.gender}
            onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'gender', value: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {state.errors.gender && <span className="error">{state.errors.gender}</span>}
        </div>
      )}

      {state.step === 3 && (
        <div className="step">
          <h2>Step 3: Confirmation</h2>
          <p>Name: {state.name}</p>
          <p>Email: {state.email}</p>
          <p>Age: {state.age}</p>
          <p>Gender: {state.gender}</p>
        </div>
      )}

      <div className="navigation">
        {state.step > 1 && (
          <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
        )}
        
        {state.step < 3 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;