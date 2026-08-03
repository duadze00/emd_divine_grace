// Event Handling
// ​React handles browser events through synthetic events (a cross-browser wrapper around the browser's native event object).
// ​1. Click Events & Passing Arguments

function ActionButtons() {
  // 1. Basic event handler with SyntheticEvent object
  const handleClick = (e) => {
    console.log('Button clicked!', e.target);
  };

  // 2. Event handler expecting parameters
  const handleDelete = (id, itemName) => {
    console.log(`Deleting item ${id}: ${itemName}`);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {/* Direct reference: React passes the event object automatically */}
      <button onClick={handleClick}>Click Me</button>

      {/* Arrow function wrapper: Allows passing custom arguments */}
      <button onClick={() => handleDelete(101, 'Task Item')}>
        Delete Item
      </button>
    </div>
  );
}

// Form Inputs (Controlled Components)
// ​In React, "Controlled Components" tie form inputs directly to React state, making state the single source of truth.

import { useState } from 'react';

function ControlledInputExample() {
  const [formData, setFormData] = useState({
    username: '',
    agreedToTerms: false
  });

  // Universal Handler for multiple form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    // Stop browser from reloading the page
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
          />
          I accept terms and conditions
        </label>
      </div>

      <button type="submit">Submit Form</button>
    </form>
  );
}
