import { FastifyTypedInstance } from "../../types";
import { aiSearchRoute } from "./ai-search";

export async function AIRoutes(app: FastifyTypedInstance) {
    app.register(aiSearchRoute);
}
