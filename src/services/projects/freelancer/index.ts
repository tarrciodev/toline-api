import { prisma } from "../../../config/prisma";
import { ClientError } from "../../../errors/client-errors";
import { assignProjectToFreealancer } from "./assign-project-to-freelancer";
import { unassignProjectToFreealancer } from "./unassign-project-to-freelancer";

interface IDependenciesProps {
    projectId: string;
    ownerId: string;
    freelancerId: string;
    action: "assign" | "unassign";
}
export async function projectToFreelancerService(
    dependencies: IDependenciesProps
) {
    const action = dependencies.action;
    const imTheOwner = await prisma.project.findFirst({
        where: {
            ownerId: dependencies.ownerId,
            id: dependencies.projectId,
        },
    });

    if (!imTheOwner) throw new ClientError("Permissões Insuficientes");

    const actionDependencies = {
        projectId: dependencies.projectId,
        freelancerId: dependencies.freelancerId,
    };

    if (action === "assign") {
        return await assignProjectToFreealancer(actionDependencies);
    }

    return await unassignProjectToFreealancer(actionDependencies);
}
