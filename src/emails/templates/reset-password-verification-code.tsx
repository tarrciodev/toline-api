import { Html, Link, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

// Make props optional
interface WelcomeEmailProps {
    name?: string;
    code?: string;
    siteUrl: string;
    email: string;
}

export function ResetPasswordVerificationCode({
    name,
    code,
    siteUrl,
    email,
}: WelcomeEmailProps) {
    return (
        <Html lang='pt'>
            <Tailwind>
                <div className='bg-white rounded-xl shadow-xl max-w-lg mx-auto py-4 px-6'>
                    <h1 className='text-2xl font-bold text-black mb-4'>
                        Olá, {name}👋
                    </h1>
                    {code && (
                        <Text className='text-gray-700 text-base'>
                            O seu pedido foi processado, para alterar a sua
                            senha clique no link:{" "}
                            <Link
                                href={`${siteUrl}/reset-password?code=${code}&email=${email}`}
                                className='text-blue-500 underline'
                            >
                                reset password
                            </Link>
                        </Text>
                    )}
                    <div className='my-3 text-base text-gray-500'>
                        Se não está tentanto mudar a sua senha, pode
                        simplesmente ignorar
                    </div>
                    <div className='text-sm text-gray-500'>
                        Este é um email automático. Por favor, não responda.
                    </div>
                </div>
            </Tailwind>
        </Html>
    );
}
