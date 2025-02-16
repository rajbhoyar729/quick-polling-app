import { useEffect, useState } from 'react';

interface PollOption {
  text: string;
  votes: number;
}

export default function LiveResults({ pollId }: { pollId: string }) {
  const [results, setResults] = useState<PollOption[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/polls/${pollId}/results`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setResults(data);
    };

    return () => eventSource.close();
  }, [pollId]);

  return (
    <div>
      <h2>Live Results</h2>
      <ul>
        {results.map((option: PollOption, index: number) => (
          <li key={index}>
            {option.text}: {option.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
}