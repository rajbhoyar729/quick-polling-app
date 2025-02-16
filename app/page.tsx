'use client';

import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, options }),
    });
    if (res.ok) alert('Poll created successfully!');
  };

  return (
    <div>
      <h1>Create a Poll</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) =>
              setOptions((prev) => {
                const newOptions = [...prev];
                newOptions[index] = e.target.value;
                return newOptions;
              })
            }
          />
        ))}
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}