import { prisma } from "../../config/prisma";

export async function searchUserForConversationService(
    search: string,
    tag: string
) {
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    tag: {
                        startsWith: search,
                    },
                },
                {
                    email: {
                        startsWith: search,
                    },
                },
            ],
        },
        select: {
            id: true,
            tag: true,
            email: true,
            username: true,
            avatarUrl: true,
        },
    });

    const filteredUsers = users.filter((user) => user.tag !== tag);

    return filteredUsers;
}
