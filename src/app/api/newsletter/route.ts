import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          error: "Email requerido",
          details: "Se requiere una dirección de correo electrónico",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Email inválido",
          details: "El formato del correo electrónico no es válido",
        },
        { status: 400 }
      );
    }

    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      if (!existingSubscription.subscribed) {
        const updatedSubscription = await prisma.newsletter.update({
          where: { email },
          data: {
            subscribed: true,
            updated_at: new Date(),
          },
        });

        return NextResponse.json({
          message: "Suscripción reactivada exitosamente",
          subscription: updatedSubscription,
        });
      }

      return NextResponse.json(
        {
          error: "Email ya registrado",
          details: "Este correo electrónico ya está suscrito al newsletter",
        },
        { status: 409 }
      );
    }

    const newSubscription = await prisma.newsletter.create({
      data: {
        email,
        subscribed: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Suscripción creada exitosamente",
        subscription: newSubscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al procesar la suscripción",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          error: "Email requerido",
          details: "Se requiere una dirección de correo electrónico",
        },
        { status: 400 }
      );
    }

    const subscription = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscription) {
      return NextResponse.json(
        {
          error: "Suscripción no encontrada",
          details: "No se encontró una suscripción con este email",
        },
        { status: 404 }
      );
    }

    const updatedSubscription = await prisma.newsletter.update({
      where: { email },
      data: {
        subscribed: false,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      message: "Suscripción cancelada exitosamente",
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al cancelar la suscripción",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          error: "Email requerido",
          details: "Se requiere una dirección de correo electrónico",
        },
        { status: 400 }
      );
    }

    const subscription = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscription) {
      return NextResponse.json(
        {
          error: "Suscripción no encontrada",
          details: "No se encontró una suscripción con este email",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      subscription,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Error al verificar la suscripción",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
