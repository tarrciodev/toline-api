import { renderToString } from "react-dom/server";
import { resend } from "../../config/resend";
import { ProjectCreatedEmail } from "../templates/project-verification";

export interface ProjectCreatedEmailProps {
    user: {
        name: string;
        id: string;
        email: string;
    };
    project: {
        id: string;
        name: string;
    };
}

export const ProjectVerificationEmail = async ({
    user,
    project,
}: ProjectCreatedEmailProps) => {
    try {
        const html = renderToString(
            <ProjectCreatedEmail user={user} project={project} />
        );
        const data = await resend.emails.send({
            from: "Toline <geral@toline-angola.com>",
            to: [`${user.email}`],
            subject: "Verificação de projeto",
            html,
        });
        return data;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        throw new Error(error);
    }
};
