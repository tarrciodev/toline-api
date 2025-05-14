import { prisma } from "../../../config/prisma";

interface Filters {
    page?: number;
    limit?: number;
    status: string | null;
    search?: string;
}
export async function getChargesAdminService(query: Filters) {
    const { page = 1, limit = 10, status, search } = query;

    if (status !== "null") {
        const charges = await prisma.charge.findMany({
            where: {
                status: status as "pending" | "resolved" | "rejected",
            },
            select: {
                id: true,
                ammount: true,
                status: true,
                createdAt: true,
                toliner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return charges;
    }
    const charges = await prisma.charge.findMany({
        select: {
            id: true,
            ammount: true,
            status: true,
            createdAt: true,
            toliner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return charges;
}
