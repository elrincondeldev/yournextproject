"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProjectIdea } from "@prisma/client";
import Idea from "./Idea";
import IdeaSkeleton from "./IdeaSkeleton";

interface IdeaWithVoteStatus extends ProjectIdea {
  hasVoted: boolean;
}

interface IdeasViewProps {
  currentCategory: string | null;
}

const ITEMS_PER_PAGE = 6;

export default function IdeasView({ currentCategory }: IdeasViewProps) {
  const [ideas, setIdeas] = useState<IdeaWithVoteStatus[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const getVotedIdeas = () => {
    if (typeof window !== "undefined") {
      const voted = localStorage.getItem("votedIdeas");
      return voted ? JSON.parse(voted) : [];
    }
    return [];
  };

  const saveVote = (ideaId: string) => {
    const votedIdeas = getVotedIdeas();
    localStorage.setItem("votedIdeas", JSON.stringify([...votedIdeas, ideaId]));
  };

  const hasVoted = (ideaId: string) => {
    const votedIdeas = getVotedIdeas();
    return votedIdeas.includes(ideaId);
  };

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const url = new URL("/api/ideas", window.location.origin);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", ITEMS_PER_PAGE.toString());
      if (currentCategory) {
        url.searchParams.append("category", currentCategory);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      const ideasWithVoteStatus = data.ideas.map((idea: ProjectIdea) => ({
        ...idea,
        hasVoted: hasVoted(idea.id),
      }));

      setIdeas((prev) =>
        page === 1 ? ideasWithVoteStatus : [...prev, ...ideasWithVoteStatus]
      );
      setHasMore(data.ideas.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleVote = async (ideaId: string, currentVotes: number, isUpvote: boolean) => {
    if (hasVoted(ideaId)) return;

    try {
      const response = await fetch(`/api/ideas/vote/${isUpvote ? "up" : "down"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ideaId }),
      });

      if (response.ok) {
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.id === ideaId
              ? {
                  ...idea,
                  votes: isUpvote ? currentVotes + 1 : currentVotes - 1,
                  hasVoted: true,
                }
              : idea
          )
        );
        saveVote(ideaId);
      } else {
        const errorData = await response.json();
        console.error("Error voting:", errorData.details);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setIdeas([]);
    setHasMore(true);
    setInitialLoading(true);
  }, [currentCategory]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading, hasMore]);

  useEffect(() => {
    fetchIdeas();
  }, [page, currentCategory]);

  if (initialLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
          <IdeaSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {ideas.map((idea) => (
        <Idea
          key={idea.id}
          id={idea.id}
          name={idea.name}
          description={idea.description}
          category={idea.category}
          votes={idea.votes}
          hasVoted={idea.hasVoted}
          onVote={handleVote}
        />
      ))}
      <div ref={ref} className="flex justify-center mt-8">
        {loading && !initialLoading && (
          <div className="grid grid-cols-1 gap-6 w-full">
            <IdeaSkeleton />
          </div>
        )}
      </div>
      {!hasMore && ideas.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          No hay más ideas para mostrar
        </p>
      )}
      {!loading && ideas.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No hay ideas en esta categoría
        </p>
      )}
    </div>
  );
}
