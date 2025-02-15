import React, { useState } from 'react';

interface IdeaProps {
  id: string;
  name: string;
  description: string;
  category: string;
  votes: number;
  hasVoted: boolean;
  onVote: (ideaId: string, currentVotes: number, isUpvote: boolean) => void;
}

function Idea({ id, name, description, category, votes, hasVoted, onVote }: IdeaProps) {
  const [loadingVote, setLoadingVote] = useState<'up' | 'down' | null>(null);

  const handleVote = async (isUpvote: boolean) => {
    if (hasVoted) return;
    
    setLoadingVote(isUpvote ? 'up' : 'down');
    await onVote(id, votes, isUpvote);
    setLoadingVote(null);
  };

  return (
    <section className="flex items-center justify-between p-5 text-white bg-[#10162F] rounded-lg">
      <div className="flex flex-col gap-2 w-10/12">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm">{description}</p>
        <div className="mt-5">
          <article className="text-md bg-[#363E5F] p-2 rounded-lg w-[10rem] text-center font-semibold">
            {category}
          </article>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 bg-white rounded-lg p-2">
        <button 
          className={`bg-[#363E5F] p-2 rounded-md ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a5375]'} relative w-8 h-8 flex items-center justify-center`}
          onClick={() => !hasVoted && handleVote(true)}
          disabled={hasVoted || loadingVote !== null}
        >
          {loadingVote === 'up' ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <img src="/plus.svg" alt="arrow-up" className="w-4 h-4" />
          )}
        </button>
        <span className="text-black font-bold text-2xl">{votes}</span>
        <button 
          className={`bg-[#363E5F] p-2 rounded-md ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a5375]'} relative w-8 h-8 flex items-center justify-center`}
          onClick={() => !hasVoted && handleVote(false)}
          disabled={hasVoted || loadingVote !== null}
        >
          {loadingVote === 'down' ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <img src="/minus.svg" alt="arrow-down" className="w-4 h-4" />
          )}
        </button>
      </div>
    </section>
  );
}

export default Idea;
