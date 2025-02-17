"use client";

import IdeasView from "./components/IdeasView";
import SendIdea from "./components/SendIdea";
import Categories from "./components/Categories";
import { useState } from "react";

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  return (
    <main className="flex w-screen h-screen gap-5 items-center justify-between p-5">
      <section className="w-3/12 rounded-lg h-full">
        <div className="pt-5 rounded-lg">
          <Categories
            onCategoryChange={setCurrentCategory}
            currentCategory={currentCategory}
          />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-8/14 h-full">
        <div className="bg-indigo-950/50 backdrop-blur-sm p-5 rounded-2xl border border-indigo-500/10">
          <SendIdea />
        </div>
        <div className="bg-indigo-950/50 backdrop-blur-sm p-5 rounded-2xl border border-indigo-500/10">
          <IdeasView currentCategory={currentCategory} />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-3/12 rounded-lg h-full">
        <div className="flex flex-col gap-5 bg-indigo-950/50 backdrop-blur-sm p-5 rounded-2xl border border-indigo-500/10">
          <div className="bg-gradient-to-br from-indigo-950 to-violet-900 h-60 rounded-xl border border-indigo-500/10"></div>
          <div className="bg-gradient-to-br from-indigo-950 to-violet-900 h-60 rounded-xl border border-indigo-500/10"></div>
        </div>
      </section>
    </main>
  );
}
