import type { FastifyTypedInstance } from "../../../types";
import { getProjectsAdminRoute } from "./get-projects-admin-route";

export async function projectsAdminRoutes(app: FastifyTypedInstance) {
    app.register(getProjectsAdminRoute);
}
