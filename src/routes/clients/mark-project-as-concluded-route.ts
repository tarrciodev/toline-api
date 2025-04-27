import z from "zod";
import { markProjectAsConcludedService } from "../../services/clients/mark-project-as-concluded-service";
import { FastifyTypedInstance } from "../../types";

export async function markProjectAsConcludedRoute(app: FastifyTypedInstance) {
    app.put(
        "/client/:evaluatorId/project/:projectId/conclude",
        {
            schema: {
                tags: ["Clients"],
                description: "Avaluate freelancer",
                params: z.object({
                    projectId: z.string().uuid(),
                    evaluatorId: z.string().uuid(),
                }),
                body: z.object({
                    freelancerId: z.string().uuid(),
                    rate: z.string(),
                    comment: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const { evaluatorId, projectId } = request.params;
            const data = request.body;

            const dependencies = {
                evaluatorId,
                projectId,
            };

            const project = await markProjectAsConcludedService({
                data,
                dependencies,
            });

            return reply.status(200).send(project);
        }
    );
}
