import { NextResponse } from 'next/server'
import prisma from "@/utils/prisma";

export async function GET() {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(campaigns)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Erro ao buscar campanhas' }, { status: 500 })
    }
}
