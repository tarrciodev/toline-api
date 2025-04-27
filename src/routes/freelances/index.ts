import { FastifyTypedInstance } from "../../types";
import { addPortfolioRoute } from "./add-portifolio-route";
import { getFreelancersByIdRoute } from "./get-freelancers-by-id-route";
import { getFreelancersRoute } from "./get-freelancers-route";
import { updateFreelancerSkillsRoute } from "./update-freelancer-skills-route";

export async function freelancerRoutes(app: FastifyTypedInstance) {
    app.register(addPortfolioRoute);
    app.register(updateFreelancerSkillsRoute);
    app.register(getFreelancersRoute);
    app.register(getFreelancersByIdRoute);
}
