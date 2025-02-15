import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          error: "ID requerido",
          details: "Se requiere el ID del proyecto",
        },
        { status: 400 }
      );
    }

    const updatedIdea = await prisma.projectIdea.update({
      where: { id },
      data: {
        votes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      message: "Voto positivo registrado exitosamente",
      idea: updatedIdea,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        {
          error: "Proyecto no encontrado",
          details: "No se encontró un proyecto con el ID proporcionado",
        },
        { status: 404 }
      );
    }

    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al registrar el voto",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
} 