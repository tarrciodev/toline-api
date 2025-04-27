import { FastifyReply, FastifyRequest } from "fastify";

export function assignCookie(
    replay: FastifyReply,
    request: FastifyRequest,
    generator: { key: string; value: string }
) {
    const cookieFound = request.cookies[generator.key];
    if (!cookieFound) {
        replay.setCookie(generator.key, generator.value, {
            httpOnly: true,
            path: "/",
            signed: true,
            maxAge: 60 * 60 * 24 * 30,
        });
    }
}
