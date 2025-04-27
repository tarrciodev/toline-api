import { Html, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

// Make props optional
interface WelcomeEmailProps {
    name?: string;
    code?: string;
}

export function EmailVerification({ name, code }: WelcomeEmailProps) {
    return (
        <Html lang='pt'>
            <Tailwind>
                <div className='bg-white rounded-xl shadow-xl max-w-lg mx-auto py-4 px-6'>
                    <h1 className='text-2xl font-bold text-black mb-4'>
                        Olá, {name}👋
                    </h1>
                    {code && (
                        <Text className='text-gray-700 text-base'>
                            Seu código de verificação é: {code}
                        </Text>
                    )}
                    <Text className='text-gray-700 text-base'>
                        Seja muito bem-vindo a Toline! Esperamos que você
                        aproveite sua jornada com a gente.
                    </Text>
                    <div className='my-3 text-base text-gray-700'>
                        Se não está criando uma nova conta, pode simplesmente
                        ignorar
                    </div>
                    <div className='text-sm text-gray-500'>
                        Este é um email automático. Por favor, não responda.
                    </div>
                </div>
            </Tailwind>
        </Html>
    );
}
