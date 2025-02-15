"use client";

interface CategoriesProps {
  onCategoryChange: (category: string | null) => void;
  currentCategory: string | null;
}

function Categories({ onCategoryChange, currentCategory }: CategoriesProps) {
  const categories = [
    { id: null, name: "Todas", color: "bg-[#1c2854]" },
    { id: "frontend", name: "Frontend", color: "bg-[#1c2854]" },
    { id: "backend", name: "Backend", color: "bg-[#1c2854]" },
    { id: "fullstack", name: "Fullstack", color: "bg-[#1c2854]" },
  ];

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Categorías</h2>
      {categories.map((category) => (
        <button
          key={category.id ?? "all"}
          onClick={() => onCategoryChange(category.id)}
          className={`bg-[#10162F] p-3 rounded-md text-start font-bold transition-all
            ${
              currentCategory === category.id
                ? `${category.color}`
                : "hover:bg-[#1c2854]"
            }`}
        >
          {category.name}
        </button>
      ))}
    </section>
  );
}

export default Categories;
