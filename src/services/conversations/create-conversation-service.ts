import { prisma } from "../../config/prisma";

export async function createConversationService(members: string[]) {
    const conversation = await prisma.conversation.create({
        data: {
            members: {
                connect: members.map((member) => ({ id: member })),
            },
        },
        select: {
            id: true,
            projectId: true,
            members: {
                select: {
                    id: true,
                    tag: true,
                    email: true,
                    avatarUrl: true,
                    username: true,
                },
            },
        },
    });

    const paresedConversations = {
        ...conversation,
        message: null,
    };
    return paresedConversations;
}
