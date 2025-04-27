import { FastifyTypedInstance } from "../../types";
import { inviteFreelancerToMyProjectRoute } from "./invite-freelancer-to-my-project-route";
import { markProjectAsConcludedRoute } from "./mark-project-as-concluded-route";

export async function clientRoutes(app: FastifyTypedInstance) {
    app.register(inviteFreelancerToMyProjectRoute);
    app.register(markProjectAsConcludedRoute);
}
