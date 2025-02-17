"use client";

interface CategoriesProps {
  onCategoryChange: (category: string | null) => void;
  currentCategory: string | null;
}

function Categories({ onCategoryChange, currentCategory }: CategoriesProps) {
  const categories = ["frontend", "backend", "fullstack"];

  return (
    <nav className="flex flex-col gap-3 justify-center mb-10 px-4 sm:px-6">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
          currentCategory === null
            ? "bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 text-indigo-950 shadow-lg shadow-fuchsia-500/20"
            : "bg-fuchsia-400/10 text-fuchsia-300 hover:bg-fuchsia-400/20 border border-fuchsia-500/20"
        }`}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            currentCategory === category
              ? "bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 text-indigo-950 shadow-lg shadow-fuchsia-500/20"
              : "bg-fuchsia-400/10 text-fuchsia-300 hover:bg-fuchsia-400/20 border border-fuchsia-500/20"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </nav>
  );
}

export default Categories;
