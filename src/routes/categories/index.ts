import { FastifyTypedInstance } from "../../types";
import { getCategoriesRoutes } from "./get-categories";

export async function categoriesRoutes(app: FastifyTypedInstance) {
    app.register(getCategoriesRoutes);
}
