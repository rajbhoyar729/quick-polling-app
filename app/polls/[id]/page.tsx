import LiveResults from '../../components/LiveResults';
import VotingInterface from '../../components/VotingInterface';

export default function PollDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Poll Details</h1>
      <VotingInterface pollId={params.id} />
      <LiveResults pollId={params.id} />
    </div>
  );
}