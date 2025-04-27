// src/emails/templates/account-verification-remind.tsx

import { Html, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface VerificationEmailProps {
    name?: string;
    loginUrl?: string;
}

export function RemideUnverifiedUser({
    name = "usuário",
    loginUrl = "#",
}: VerificationEmailProps) {
    return (
        <Html lang='pt'>
            <Tailwind>
                <div className='bg-white rounded-xl shadow-xl max-w-lg mx-auto py-6 px-8'>
                    <h1 className='text-2xl font-bold text-black mb-4'>
                        Olá, {name}! 👋
                    </h1>
                    <Text className='text-gray-700 text-base mb-4'>
                        Seja muito bem-vindo(a) à Toline! Estamos animados por
                        ter você conosco.
                    </Text>
                    <Text className='text-gray-700 text-base mb-4'>
                        Notamos que sua conta ainda não está completamente
                        verificada. Para aproveitar todos os recursos da
                        plataforma, complete as seguintes etapas:
                    </Text>

                    <div className='bg-gray-50 rounded-lg p-4 my-4'>
                        <ol className='list-decimal pl-5 space-y-2'>
                            <li className='text-gray-700'>
                                Enviar seu bilhete de identidade
                            </li>
                            <li className='text-gray-700'>
                                Adicionar suas coordenadas bancárias
                            </li>
                            <li className='text-gray-700'>
                                Completar sua biografia
                            </li>
                            <li className='text-gray-700'>
                                Adicionar uma foto de perfil
                            </li>
                        </ol>
                    </div>

                    <Text className='text-gray-700 text-base mb-4'>
                        Essas informações são necessárias para garantir a
                        segurança da nossa plataforma e proporcionar a melhor
                        experiência possível.
                    </Text>

                    <div className='my-6 text-center'>
                        <a
                            href={loginUrl}
                            className='bg-blue-600 text-white font-medium py-2 px-6 rounded-lg no-underline'
                        >
                            Acessar Minha Conta
                        </a>
                    </div>

                    <Text className='text-gray-700 text-base mb-4'>
                        Contas não verificadas têm acesso limitado às
                        funcionalidades da plataforma.
                    </Text>

                    <div className='text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200'>
                        <p>
                            Este é um e-mail automático. Por favor, não
                            responda.
                        </p>
                        <p className='mt-2'>
                            © 2025 Toline. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </Tailwind>
        </Html>
    );
}
