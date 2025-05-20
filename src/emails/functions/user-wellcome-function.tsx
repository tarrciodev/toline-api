import { renderToString } from "react-dom/server";
import { resend } from "../../config/resend";
import { UserWellcomeEmailTemplate } from "../templates/user-wellcome"; // Corrected path

interface EmailVerificationProps {
    name: string;
    id: string;
    email: string;
}
export const userWellcomeEmail = async ({
    name,
    id,
    email,
}: EmailVerificationProps) => {
    try {
        const html = renderToString(
            <UserWellcomeEmailTemplate name={name} id={id} />
        );
        const data = await resend.emails.send({
            from: "Toline <support@toline-angola.com>",
            to: [`${email}`],
            subject: "Bem vindo a Toline",
            html,
        });
        console.log({ data });
        return data;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        throw new Error(error);
    }
};
