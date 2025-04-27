import { renderToString } from "react-dom/server";
import { resend } from "../../config/resend";
import { EmailVerification } from "../templates/email-verification"; // Corrected path

interface EmailVerificationProps {
    name: string; // Made optional
    code: string;
    email: string; // Made optional
}
export const verificationEmailFunction = async ({
    name,
    code,
    email,
}: EmailVerificationProps) => {
    try {
        const html = renderToString(
            <EmailVerification name={name} code={code} />
        );
        const data = await resend.emails.send({
            from: "Toline <support@toline-angola.com>",
            to: [`${email}`],
            subject: "Verify your Email",
            html,
        });

        console.log({ data });

        return data;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        throw new Error(error);
    }
};
