import z from "zod";
import { addPortfolioService } from "../../services/freelancers/add-portifolio-service";
import { FastifyTypedInstance } from "../../types";

export async function addPortfolioRoute(app: FastifyTypedInstance) {
    app.put(
        "/freelancer/:freelancerId/add-portifolio",
        {
            schema: {
                tags: ["Freelancers"],
                description: "Get freelancer by id",
                params: z.object({
                    freelancerId: z.string().uuid(),
                }),
                body: z.object({
                    title: z.string(),
                    description: z.string(),
                    cover: z.string(),
                    assets: z.array(z.string()),
                    skills: z.array(z.string()),
                    completedAt: z.string(),
                }),
            },
        },
        async (request, replay) => {
            const portifolio = await addPortfolioService({
                data: request.body,
                dependencies: {
                    freelancerId: request.params.freelancerId,
                },
            });
            return replay.status(200).send(portifolio);
        }
    );
}
