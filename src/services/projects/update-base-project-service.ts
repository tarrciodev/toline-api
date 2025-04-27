import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

interface CreateProjectProps {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    subcategoryId?: string;
    skills?: string[];
}
export async function updateBaseProjectService(
    data: CreateProjectProps,
    ownerId: string
) {
    const imTheOwner = await prisma.project.findUnique({
        where: {
            id: data.id,
            ownerId,
        },
    });

    if (!imTheOwner)
        throw new ClientError("You are not the owner of this project");

    if (data.skills && data.skills.length > 0) {
        const storedSkills = await prisma.skill.findMany({
            where: {
                id: {
                    in: data.skills,
                },
            },
        });

        if (!storedSkills) throw new ClientError("Skills not found");

        const skills = storedSkills.map((skill) => ({ id: skill.id }));
        const project = await prisma.project.update({
            where: { id: data.id },
            data: {
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                subcategoryId: data.subcategoryId,
                skills: {
                    set: skills,
                },
            },
            select: {
                id: true,
            },
        });

        return project;
    }

    const project = await prisma.project.update({
        where: { id: data.id },
        data: {
            name: data.name,
            description: data.description,
            categoryId: data.categoryId,
            subcategoryId: data.subcategoryId,
        },
        select: {
            id: true,
        },
    });

    return project;
}
