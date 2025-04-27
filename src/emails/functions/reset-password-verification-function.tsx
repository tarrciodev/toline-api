import { renderToString } from "react-dom/server";
import { resend } from "../../config/resend";
import { ResetPasswordVerificationCode } from "../templates/reset-password-verification-code";

interface EmailVerificationProps {
    name: string; // Made optional
    code: string;
    email: string;
    siteUrl: string; // Made optional
}
export async function restePasswordEmailFunction({
    email,
    name,
    code,
    siteUrl,
}: EmailVerificationProps) {
    try {
        // Pass props if provided, otherwise let defaults handle it
        const html = renderToString(
            <ResetPasswordVerificationCode
                name={name}
                code={code}
                siteUrl={siteUrl}
                email={email}
            />
        );
        const data = await resend.emails.send({
            from: "Toline <support@toline-angola.com>",
            to: [`${email}`], // Replace with the actual recipient email
            subject: "Reset Password",
            html,
        });

        console.log("Email enviado com sucesso!", data);
        return data;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
        throw new Error(error);
    }
}
