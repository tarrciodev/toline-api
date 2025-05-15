import { prisma } from "../../../config/prisma";

export async function verifyChargeAdminService({
    id,
    status,
}: {
    id: string;
    status: string;
}) {
    const charge = await prisma.charge.update({
        where: {
            id,
        },
        data: {
            status: status as "rejected" | "resolved",
        },
        select: {
            id: true,
            ammount: true,
            toliner: {
                select: {
                    id: true,
                    balance: true,
                },
            },
        },
    });

    if (status === "resolved") {
        await prisma.toliner.update({
            where: {
                id: charge?.toliner?.id,
            },
            data: {
                balance: charge?.toliner?.balance
                    ? {
                          update: {
                              ammount:
                                  charge?.toliner?.balance.ammount +
                                  charge.ammount,
                          },
                      }
                    : {
                          create: {
                              ammount: charge.ammount,
                          },
                      },
            },
        });
    }

    return charge;
}
