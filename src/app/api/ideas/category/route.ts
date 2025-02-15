import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Se requiere especificar una categoría" },
        { status: 400 }
      );
    }

    if (
      !["frontend", "backend", "fullstack"].includes(category.toLowerCase())
    ) {
      return NextResponse.json(
        {
          error:
            "Categoría inválida. Debe ser 'frontend', 'backend' o 'fullstack'",
        },
        { status: 400 }
      );
    }

    const ideas = await prisma.projectIdea.findMany({
      where: {
        category: {
          equals: category.toLowerCase(),
          mode: "insensitive",
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      category,
      ideas,
      total: ideas.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al obtener las ideas de proyecto por categoría",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
