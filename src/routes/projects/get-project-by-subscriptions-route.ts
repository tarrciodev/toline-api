import z from "zod";
import { getProjectsBySubscriptionsService } from "../../services/projects/get-projects-by-subscriptions-service";
import { FastifyTypedInstance } from "../../types";

export async function getProjectsBySubscriptionsRoute(
    app: FastifyTypedInstance
) {
    app.post(
        "/projects/by-subscriptions",
        {
            schema: {
                tags: ["Projects"],
                description: "Get projects by subscriptions",
                body: z.object({
                    subscriptions: z.array(z.string().uuid()),
                }),
            },
        },
        async (request, replay) => {
            const { subscriptions } = request.body;
            const projects = await getProjectsBySubscriptionsService({
                subscriptions,
            });
            return replay.status(200).send(projects);
        }
    );
}
