"use client";

import IdeasView from "./components/IdeasView";
import SendIdea from "./components/SendIdea";
import Categories from "./components/Categories";
import { useState } from "react";

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  return (
    <main className="flex w-screen h-screen gap-5 items-center justify-between p-5">
      <section className="w-2/12 bg-[#060708] p-5 rounded-lg h-full">
        <Categories
          onCategoryChange={setCurrentCategory}
          currentCategory={currentCategory}
        />
      </section>
      <section className="flex flex-col gap-5 w-8/12 h-full">
        <div className=" bg-[#060708] p-5 rounded-lg">
          <SendIdea />
        </div>
        <div className="bg-[#060708] p-5 rounded-lg">
          <IdeasView currentCategory={currentCategory} />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-2/12 bg-[#060708] p-5 rounded-lg h-full">
        <div className="bg-[#10162F] h-60 rounded-lg"></div>
        <div className="bg-[#10162F] h-60 rounded-lg"></div>
      </section>
    </main>
  );
}
