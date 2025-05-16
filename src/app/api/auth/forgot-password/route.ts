// route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import crypto from "crypto";
import { sendResetEmail } from "@/utils/sendResetEmail";

export async function POST(req: Request) {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1h

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken: token,
            resetTokenExp: expires,
        },
    });

    await sendResetEmail(user.email, token);

    return NextResponse.json({ success: true });
}
