import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProjectIdea {
  name: string;
  description: string;
  votes: number;
  category: "frontend" | "backend" | "fullstack";
  type: boolean;
  created_at: string;
}

interface OpenAIResponse {
  projects: ProjectIdea[];
}

interface ExistingProject {
  name: string;
  description: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function checkDuplicateIdeas(ideas: ProjectIdea[]) {
  const existingProjects = await prisma.projectIdea.findMany({
    select: { name: true, description: true },
  });

  return ideas.filter((idea) => {
    return !existingProjects.some(
      (existing: ExistingProject) =>
        existing.name.toLowerCase() === idea.name.toLowerCase() ||
        existing.description.toLowerCase() === idea.description.toLowerCase()
    );
  });
}

async function generateAndSaveIdeas() {
  const prompt = `Genera 10 ideas de proyectos de programación y devuélvelas en el siguiente formato JSON exacto:

{
  "projects": [
    {
      "name": "nombre del proyecto",
      "description": "descripción del proyecto",
      "votes": 0,
      "category": "frontend|backend|fullstack",
      "type": true,
      "created_at": ""
    }
  ]
}

Requisitos:
1. El nombre y descripción deben estar en español
2. La categoría SOLO puede ser "frontend", "backend" o "fullstack"
3. Asegúrate de generar exactamente 10 proyectos
4. La descripción debe ser clara y concisa
5. El campo votes siempre debe ser 0
6. El campo type siempre debe ser true
7. Deja el campo created_at vacío, se llenará después

Responde SOLO con el JSON, sin texto adicional.`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Eres un experto en generar ideas de proyectos de programación innovadoras y útiles. Respondes exclusivamente en formato JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    response_format: { type: "json_object" },
  });

  const responseContent = completion.choices[0].message.content;
  if (!responseContent) {
    throw new Error("No se recibió respuesta de OpenAI");
  }

  const ideas = JSON.parse(responseContent) as OpenAIResponse;

  if (
    !ideas.projects ||
    !Array.isArray(ideas.projects) ||
    ideas.projects.length !== 10
  ) {
    throw new Error("Formato de respuesta inválido de OpenAI");
  }

  const uniqueIdeas = await checkDuplicateIdeas(ideas.projects);

  if (uniqueIdeas.length === 0) {
    throw new Error("Todas las ideas generadas ya existen en la base de datos");
  }

  const savedIdeas = await Promise.all(
    uniqueIdeas.map(async (idea) => {
      return prisma.projectIdea.create({
        data: {
          name: idea.name,
          description: idea.description,
          votes: idea.votes,
          category: idea.category,
          type: idea.type,
          created_at: new Date(),
        },
      });
    })
  );

  return savedIdeas;
}

export async function GET() {
  try {
    const ideas = await generateAndSaveIdeas();
    return NextResponse.json({
      ideas,
      message: `Se generaron y guardaron ${ideas.length} ideas nuevas`,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al generar las ideas de proyecto",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
