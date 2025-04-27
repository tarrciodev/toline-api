import z from "zod";
import { getFreelancersService } from "../../services/freelancers/get-freelancers-service";
import { FastifyTypedInstance } from "../../types";

export async function getFreelancersRoute(app: FastifyTypedInstance) {
    app.get(
        "/freelancers",
        {
            schema: {
                tags: ["Freelancers"],
                description: "Get freelancers",
                querystring: z.object({
                    especialization: z.string().optional(),
                    skills: z.string().nullable(),
                    search: z.string().optional(),
                    page: z.number().optional(),
                    limit: z.number().optional(),
                }),
            },
        },
        async (request, replay) => {
            const { especialization, skills, search, page, limit } =
                request.query;

            let query = {};

            if (
                especialization?.includes("undefined") &&
                skills?.includes("undefined")
            ) {
                query = {
                    search,
                    page,
                    limit,
                };

                const freelancers = await getFreelancersService({ query });
                return replay.status(200).send(freelancers);
            }

            if (!skills?.includes("undefined")) {
                const parsedSkills =
                    skills && skills.includes(",")
                        ? skills.split(",")
                        : [skills];

                query = {
                    especialization,
                    search,
                    page,
                    limit,
                    skills: parsedSkills,
                };
            } else {
                query = {
                    especialization,
                    search,
                    page,
                    limit,
                };
            }

            const freelancers = await getFreelancersService({ query });

            return replay.status(200).send(freelancers);
        }
    );
}
