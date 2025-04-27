import { prisma } from "../../config/prisma";
import { ClientError } from "../../errors/client-errors";

export async function userSocialAuthSevice(email: string) {
    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            email: true,
            username: true,
            type: true,
        },
    });

    if (userExists == null) throw new ClientError("Email or password Invalid");

    return userExists;
}
