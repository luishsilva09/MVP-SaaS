import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"
import { hash } from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Email e senha são obrigatórios." }, { status: 400 })
        }

        const userExists = await prisma.user.findUnique({ where: { email } })
        if (userExists) {
            return NextResponse.json({ error: "Usuário já existe." }, { status: 409 })
        }

        const hashedPassword = await hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                accounts: {
                    create: {
                        provider: 'credentials',
                        providerAccountId: email,
                        type: 'credentials'
                    },
                },
            },
        });

        return NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 })
    } catch (error) {
        console.error("Erro no registro:", error)
        return NextResponse.json({ error: "Erro interno" }, { status: 500 })
    }
}