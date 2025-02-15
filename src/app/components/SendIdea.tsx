"use client";

import { useState } from "react";

function SendIdea() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "frontend"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/ideas/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || "Error al crear la idea");
      }

      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        category: "frontend"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la idea");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl font-bold">Título de la idea</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Título"
          className="bg-[#10162F] rounded-md p-3"
          required
          minLength={3}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-bold">Descripción</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="bg-[#10162F] rounded-md p-3"
          required
          minLength={10}
        />
      </div>
      <div className="flex items-center gap-2">
        <select 
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-[#10162F] rounded-md p-3 font-bold"
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#10162F] rounded-md p-3 w-[10rem] ml-auto text-center font-bold transition-colors hover:bg-[#1c2854] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mt-2">¡Idea creada exitosamente!</p>
      )}
    </form>
  );
}

export default SendIdea;
