import { prisma } from "../../../config/prisma";

interface Filters {
    page?: number;
    limit?: number;
    status: string | null;
    search?: string;
}
export async function getPaymentsAdminService(query: Filters) {
    const { page = 1, limit = 10, status, search } = query;
    if (status !== "null") {
        const payments = await prisma.payment.findMany({
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
                freelancer: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    },
                },
            },
        });

        return payments.map((payment) => {
            return {
                ...payment,
                createdAt: payment.createdAt.toLocaleString(),
            };
        });
    }
    const payments = await prisma.payment.findMany({
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
            freelancer: {
                select: {
                    name: true,
                    email: true,
                },
            },
            project: {
                select: {
                    id: true,
                    name: true,
                    status: true,
                },
            },
        },
    });

    return payments.map((payment) => {
        return {
            ...payment,
            createdAt: payment.createdAt.toLocaleString(),
        };
    });
}
