'use client';

import { useState } from 'react';

export default function VotingInterface({ pollId }: { pollId: string }) {
  const [voted, setVoted] = useState(false);

  const handleVote = async (option: string) => {
    await fetch(`/api/polls/${pollId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option }),
    });
    setVoted(true);
  };

  return (
    <div>
      <h2>Vote Now</h2>
      {!voted ? (
        <div>
          <button onClick={() => handleVote('Option 1')}>Option 1</button>
          <button onClick={() => handleVote('Option 2')}>Option 2</button>
        </div>
      ) : (
        <p>Thank you for voting!</p>
      )}
    </div>
  );
}