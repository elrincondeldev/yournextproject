import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const category = searchParams.get("category");
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectIdeaWhereInput = category
      ? {
          category: {
            equals: category,
            mode: "insensitive" as Prisma.QueryMode,
          },
        }
      : {};

    // Obtener ideas con paginación y filtro de categoría
    const ideas = await prisma.projectIdea.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        {
          votes: "desc",
        },
        {
          created_at: "desc",
        },
      ],
    });

    // Obtener el total de ideas para la paginación
    const total = await prisma.projectIdea.count({ where });

    return NextResponse.json({
      ideas,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + ideas.length < total,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al obtener las ideas de proyecto",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Se requiere un ID" }, { status: 400 });
    }

    const idea = await prisma.projectIdea.findUnique({
      where: { id },
    });

    if (!idea) {
      return NextResponse.json(
        { error: "Idea no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ idea });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al obtener la idea de proyecto",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
