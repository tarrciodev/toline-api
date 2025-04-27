import { prisma } from "../../config/prisma";

export async function getUserConversationsService(userId: string) {
    const conversations = await prisma.conversation.findMany({
        where: {
            members: {
                some: {
                    id: userId,
                },
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
                    tolinerId: true,
                    username: true,
                },
            },
            messages: {
                select: {
                    id: true,
                    content: true,
                    senderId: true,
                    saw: true,
                    createdAt: true,
                    hasFile: true,
                    fileInfo: true,
                },
                orderBy: {
                    createdAt: "desc", // Order by newest message
                },
            },
        },
    });
    const paresedConversations = conversations.map(
        (conversation: (typeof conversations)[0]) => ({
            ...conversation,
            members: conversation.members.map((member) => ({
                id: member.id,
                tag: member.tag,
                email: member.email,
                avatarUrl: member.avatarUrl,
                userId: member.tolinerId,
                username: member.username,
            })),
            lastMessage: conversation.messages[0],
        })
    );
    return paresedConversations;
}
