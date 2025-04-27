import { prisma } from "../../config/prisma";

export async function getSkillsService() {
    const skills = await prisma.skill.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return skills;
}
