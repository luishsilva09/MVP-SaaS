import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
    const { token, password } = await req.json();

    const tokenEntry = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExp: { gt: new Date() },
        },
    });

    if (!tokenEntry || !tokenEntry.resetTokenExp || tokenEntry.resetTokenExp < new Date()) {
        return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);


    await prisma.user.update({
        where: { id: tokenEntry.id },
        data: {
            password: await hash(hashedPassword, 10),
            resetToken: null,
            resetTokenExp: null,
        },
    });

    return NextResponse.json({ success: true });
}
