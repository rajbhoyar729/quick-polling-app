'use client';

import { useState } from 'react';

export default function CreatePollForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']); // Start with two empty options

  // Add a new option field
  const addOption = () => {
    setOptions((prev) => [...prev, '']);
  };

  // Remove an option field
  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle changes in the options fields
  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  // Submit the form to create a new poll
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!question.trim() || options.some((option) => !option.trim())) {
      alert('Please fill out the question and all options.');
      return;
    }

    // Send the data to the API
    const res = await fetch('/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, options }),
    });

    if (res.ok) {
      alert('Poll created successfully!');
      setQuestion('');
      setOptions(['', '']); // Reset the form
    } else {
      alert('Failed to create poll. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create a New Poll</h1>
      <form onSubmit={handleSubmit}>
        {/* Question Input */}
        <div>
          <label htmlFor="question">Poll Question:</label>
          <input
            type="text"
            id="question"
            placeholder="Enter your poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Options Inputs */}
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              {options.length > 2 && (
                <button type="button" onClick={() => removeOption(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Option Button */}
        <button type="button" onClick={addOption}>
          Add Option
        </button>

        {/* Submit Button */}
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}