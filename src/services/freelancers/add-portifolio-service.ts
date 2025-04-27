import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

interface IPortfolioProps {
    data: {
        title: string;
        description: string;
        cover: string;
        assets: string[];
        skills: string[];
        completedAt: string;
    };
    dependencies: {
        freelancerId: string;
    };
}
export async function addPortfolioService({
    data,
    dependencies,
}: IPortfolioProps) {
    const imTheOwner = await prisma.freelancer.findFirst({
        where: {
            id: dependencies.freelancerId,
        },
        select: {
            portifolio: {
                select: {
                    title: true,
                },
            },
        },
    });

    if (!imTheOwner) throw new Error("Nenhum Usuario foi encontrado");

    if (
        imTheOwner?.portifolio.find(
            (portifolio) => portifolio.title === data.title
        )
    )
        throw new ClientError("Esse Titulo já existe nos seus portifolios");

    const portfolio = await prisma.portifolio.create({
        data: {
            title: data.title,
            description: data.description,
            cover: data.cover,
            completedAt: data.completedAt,
            skills: {
                connect: data.skills.map((skill) => ({ id: skill })),
            },
            assets: data.assets,
            freelancer: {
                connect: {
                    id: dependencies.freelancerId,
                },
            },
        },
    });

    return portfolio;
}
