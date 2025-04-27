import { prisma } from "../../config/prisma";

export async function updateFreelancerSkillsService(
    skills: string[],
    freelancerId: string,
    action: "add" | "remove"
) {
    const freelancerExists = await prisma.freelancer.findUnique({
        where: {
            id: freelancerId,
        },
    });

    if (!freelancerExists) throw new Error("Nenhum Usuario foi encontrado");
    const operation =
        action === "add"
            ? {
                  connect: skills.map((skill) => ({ id: skill })),
              }
            : {
                  disconnect: skills.map((skill) => ({ id: skill })),
              };

    const freelancer = await prisma.freelancer.update({
        where: {
            id: freelancerId,
        },
        data: {
            skills: operation,
        },
        select: {
            id: true,
        },
    });

    return freelancer;
}
