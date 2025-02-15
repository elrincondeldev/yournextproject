import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// interface CreateIdeaRequest {
//   name: string;
//   description: string;
//   category: "frontend" | "backend" | "fullstack";
//   type?: boolean;
//   votes?: number;
// }

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar campos requeridos
    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        {
          error: "Faltan campos requeridos",
          details: "Se requieren los campos: name, description y category",
        },
        { status: 400 }
      );
    }

    // Validar categoría
    if (
      !["frontend", "backend", "fullstack"].includes(
        body.category.toLowerCase()
      )
    ) {
      return NextResponse.json(
        {
          error: "Categoría inválida",
          details: "La categoría debe ser 'frontend', 'backend' o 'fullstack'",
        },
        { status: 400 }
      );
    }

    // Validar longitud mínima del nombre y descripción
    if (body.name.length < 3) {
      return NextResponse.json(
        {
          error: "Nombre demasiado corto",
          details: "El nombre debe tener al menos 3 caracteres",
        },
        { status: 400 }
      );
    }

    if (body.description.length < 10) {
      return NextResponse.json(
        {
          error: "Descripción demasiado corta",
          details: "La descripción debe tener al menos 10 caracteres",
        },
        { status: 400 }
      );
    }

    // Verificar si ya existe una idea con el mismo nombre
    const existingIdea = await prisma.projectIdea.findFirst({
      where: {
        name: {
          equals: body.name,
          mode: "insensitive",
        },
      },
    });

    if (existingIdea) {
      return NextResponse.json(
        {
          error: "Idea duplicada",
          details: "Ya existe una idea con este nombre",
        },
        { status: 409 }
      );
    }

    // Crear la nueva idea
    const newIdea = await prisma.projectIdea.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category.toLowerCase(),
        type: body.type ?? true,
        votes: body.votes ?? 0,
        created_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Idea creada exitosamente",
        idea: newIdea,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al crear la idea de proyecto",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
