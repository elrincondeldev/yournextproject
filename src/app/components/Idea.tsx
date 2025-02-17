import React, { useState } from "react";

interface IdeaProps {
  id: string;
  name: string;
  description: string;
  category: string;
  votes: number;
  hasVoted: boolean;
  onVote: (ideaId: string, currentVotes: number, isUpvote: boolean) => void;
}

function Idea({
  id,
  name,
  description,
  category,
  votes,
  hasVoted,
  onVote,
}: IdeaProps) {
  const [loadingVote, setLoadingVote] = useState<"up" | "down" | null>(null);

  const handleVote = async (isUpvote: boolean) => {
    if (hasVoted) return;

    setLoadingVote(isUpvote ? "up" : "down");
    await onVote(id, votes, isUpvote);
    setLoadingVote(null);
  };

  return (
    <section className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-7 text-indigo-50 bg-gradient-to-br from-indigo-950 to-violet-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-500/20">
      <div className="flex flex-col gap-4 w-full md:w-10/12 mb-6 md:mb-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            {name}
          </h2>
          <article className="text-sm bg-fuchsia-400/10 border border-fuchsia-500/20 px-4 py-1.5 rounded-full w-fit text-center font-medium text-fuchsia-300">
            {category}
          </article>
        </div>
        
        <div className="text-sm space-y-5 text-indigo-200">
          {description.split('\n').map((section, index) => {
            const [title, content] = section.split(':').map(s => s.trim());
            if (!content) return <p key={index}>{title}</p>;
            
            return (
              <div key={index} className="space-y-2">
                <span className="block font-medium text-fuchsia-300 text-base tracking-wide">
                  {title}
                </span>
                <p className="leading-relaxed ml-1">
                  {content}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex md:flex-col items-center gap-4 md:gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 w-full md:w-auto border border-indigo-500/20">
        <button
          className={`flex-1 md:flex-none p-2 rounded-lg ${
            hasVoted 
              ? "bg-indigo-800/30 opacity-50 cursor-not-allowed" 
              : "bg-fuchsia-400/10 hover:bg-fuchsia-400/20 hover:scale-105 border border-fuchsia-500/20"
          } relative w-full md:w-11 h-11 flex items-center justify-center transition-all duration-200`}
          onClick={() => !hasVoted && handleVote(true)}
          disabled={hasVoted || loadingVote !== null}
        >
          {loadingVote === "up" ? (
            <div className="w-5 h-5 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <img src="/plus.svg" alt="arrow-up" className="w-5 h-5 opacity-80" />
          )}
        </button>
        <span className="font-bold text-xl md:text-2xl min-w-[2ch] text-center bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          {votes}
        </span>
        <button
          className={`flex-1 md:flex-none p-2 rounded-lg ${
            hasVoted 
              ? "bg-indigo-800/30 opacity-50 cursor-not-allowed" 
              : "bg-fuchsia-400/10 hover:bg-fuchsia-400/20 hover:scale-105 border border-fuchsia-500/20"
          } relative w-full md:w-11 h-11 flex items-center justify-center transition-all duration-200`}
          onClick={() => !hasVoted && handleVote(false)}
          disabled={hasVoted || loadingVote !== null}
        >
          {loadingVote === "down" ? (
            <div className="w-5 h-5 border-2 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <img src="/minus.svg" alt="arrow-down" className="w-5 h-5 opacity-80" />
          )}
        </button>
      </div>
    </section>
  );
}

export default Idea;
