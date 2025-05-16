// lib/prisma.ts (ou onde você estiver criando o cliente)

import { PrismaClient } from "@/generated/prisma"
declare global {
    // Permite que o cliente seja compartilhado no modo dev (Next.js faz HMR e recria módulos várias vezes)
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

export default prisma;
