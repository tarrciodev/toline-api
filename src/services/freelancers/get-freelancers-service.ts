import { prisma } from "../../config/prisma";

interface IGetFreelancersProps {
    query: {
        especialization?: string | null;
        skills?: string[] | null;
        search?: string;
        page?: number;
        limit?: number;
    };
}

export async function getFreelancersService({ query }: IGetFreelancersProps) {
    const { especialization, skills, search, page, limit } = query;

    const whereClause: any = {};

    if (especialization) {
        whereClause.especialiazation = {
            some: {
                slug: especialization,
            },
        };
    }

    if (skills && skills.length > 0) {
        whereClause.skills = {
            some: {
                name: {
                    in: skills,
                    mode: "insensitive",
                },
            },
        };
    }

    const parseWhereClause =
        whereClause.especialiazation || whereClause.skills
            ? whereClause
            : undefined;

    const freelancers = await prisma.freelancer.findMany({
        where: parseWhereClause, // Retorna todos os freelancers se não houver filtro
        select: {
            id: true,
            name: true,
            isVerified: true,
            user: {
                select: {
                    avatarUrl: true,
                    bio: true,
                },
            },
            createdAt: true,
            projects: {
                select: {
                    id: true,
                },
            },
            skills: {
                select: {
                    id: true,
                    name: true,
                },
            },
            especialiazation: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    const parseFreelancers = freelancers.map(
        (freelancer: (typeof freelancers)[0]) => {
            const { user, ...rest } = freelancer;
            return {
                ...rest,
                bio: user?.bio as string,
                avatarUrl: user?.avatarUrl as string,
                createdAt: freelancer.createdAt.toLocaleDateString(),
            };
        }
    );

    return parseFreelancers;
}
