import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.ADMIN_SECRET_TOKEN;

    if (!expectedToken) {
      return NextResponse.json(
        {
          error: "Error de configuración",
          details: "No se ha configurado el token de administrador",
        },
        { status: 500 }
      );
    }

    if (!authHeader) {
      return NextResponse.json(
        {
          error: "No autorizado",
          details: "Se requiere un token de autorización",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    if (!token || token !== expectedToken) {
      return NextResponse.json(
        {
          error: "No autorizado",
          details: "Token inválido",
        },
        { status: 401 }
      );
    }

    const currentCount = await prisma.projectIdea.count();

    if (currentCount === 0) {
      return NextResponse.json({
        message: "No hay ideas para eliminar",
        deletedCount: 0,
      });
    }

    await prisma.projectIdea.deleteMany();

    return NextResponse.json({
      message: "Ideas eliminadas exitosamente",
      deletedCount: currentCount,
    });
  } catch (error) {
    console.error("Error al eliminar ideas:", error);
    return NextResponse.json(
      {
        error: "Error al eliminar las ideas",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 