import { renderToString } from "react-dom/server";
import { resend } from "../../config/resend";
import { AccountVerifiedTemplate } from "../templates/account-verified-template"; // Corrected path

interface EmailProps {
    name: string;
    email: string;
}
export const accountVeriedEmail = async ({ name, email }: EmailProps) => {
    try {
        const html = renderToString(<AccountVerifiedTemplate name={name} />);
        const data = await resend.emails.send({
            from: "Toline <support@toline-angola.com>",
            to: [`${email}`],
            subject: " ✅ Perfil Verificado",
            html,
        });

        return data;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        throw new Error(error);
    }
};
