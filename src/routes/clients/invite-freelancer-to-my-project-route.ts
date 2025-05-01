import z from "zod";
import { inviteFreelancerToMyProjectService } from "../../services/clients/invite-freelancer-to-my-project-service";
import type { FastifyTypedInstance } from "../../types";

export async function inviteFreelancerToMyProjectRoute(
    app: FastifyTypedInstance
) {
    app.put(
        "/client/:clientId/invite-freelancer/:freelancerId/project/:projectId",
        {
            schema: {
                tags: ["Projects"],
                description: "Invite freelancer to project",
                params: z.object({
                    projectId: z.string().uuid(),
                    clientId: z.string().uuid(),
                    freelancerId: z.string().uuid(),
                }),
            },
        },
        async (request, replay) => {
            const project = await inviteFreelancerToMyProjectService(
                request.params
            );
            return replay.status(200).send(project);
        }
    );
}
