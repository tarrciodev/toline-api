import { generateText, tool } from "ai";
import z from "zod";
import { google } from "../../ai/google";
import { prisma } from "../../config/prisma";
import { FastifyTypedInstance } from "../../types";

export async function aiSearchRoute(app: FastifyTypedInstance) {
    app.post(
        "/api/search",
        {
            schema: {
                body: z.object({
                    message: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const message = request.body.message as string;

            const answer = await generateText({
                model: google,
                prompt: message,
                tools: {
                    postgress: tool({
                        description: `Realiza uma query no banco de dados para responder às perguntas dos usuários.`,
                        parameters: z.object({
                            table: z.string(),
                            fields: z.array(z.string()),
                            limit: z.number().optional(),
                        }),
                        execute: async ({ table, fields, limit = 5 }) => {
                            const result = await (
                                prisma[table as keyof typeof prisma] as any
                            ).findMany({
                                select: Object.fromEntries(
                                    fields.map((field) => [field, true])
                                ),
                                take: limit,
                            });
                            return result;
                        },
                    }),
                },
                system: `
                    Você é um assistente de IA para um site de freelancing.

                    Se o usuário perguntar sobre projetos, busque na tabela "project".
                    se perguntar sobre  conversas ou mensagens, podes consultar as tabelas "conversation", ou na tabela "Message" ou nas duas tabelas

                    Inclua na resposta SOMENTE o que o usuário pediu, sem texto adicional.
                    `.trim(),
                maxSteps: 5,
            });

            reply.status(200).send(answer.text);
        }
    );
}
