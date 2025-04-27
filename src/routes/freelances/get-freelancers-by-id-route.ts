import z from "zod";
import { getFreelancerByIdService } from "../../services/freelancers/get-freelancer-by-id-service";
import { FastifyTypedInstance } from "../../types";

export async function getFreelancersByIdRoute(app: FastifyTypedInstance) {
    app.get(
        "/freelancer/:freelancerId",
        {
            schema: {
                tags: ["Freelancers"],
                description: "Get freelancer by id",
                params: z.object({
                    freelancerId: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const { freelancerId } = request.params;
            const freelancer = await getFreelancerByIdService(freelancerId);

            return reply.status(200).send(freelancer);
        }
    );
}
