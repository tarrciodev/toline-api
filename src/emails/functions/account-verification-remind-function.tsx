import { renderToString } from "react-dom/server";
import { resend } from "../../config/resend";
import { RemideUnverifiedUser } from "../templates/account-verification-remind";

interface EmailVerificationProps {
    name?: string;
    loginUrl: string;
    email: string; // Made optional?: string; // Made optional
}
export const accountVerificationRemind = async ({
    name,
    loginUrl,
    email,
}: EmailVerificationProps) => {
    try {
        const html = renderToString(
            <RemideUnverifiedUser name={name} loginUrl={loginUrl} />
        );
        const data = await resend.emails.send({
            from: "Toline <support@toline-angola.com>",
            to: [`${email}`],
            subject: "Verify your Informations",
            html,
        });

        return data;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        throw new Error(error);
    }
};
