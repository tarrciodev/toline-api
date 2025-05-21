import { Html, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WelcomeEmailProps {
    name?: string;
}

export function AccountVerifiedTemplate({ name }: WelcomeEmailProps) {
    return (
        <Html lang='pt'>
            <Tailwind>
                <div className='bg-white rounded-xl shadow-xl max-w-lg mx-auto py-4 px-6'>
                    <h1 className='text-2xl font-bold text-black mb-4'>
                        Olá, {name}👋
                    </h1>

                    <Text className='text-lg text-gray-700 mb-6 leading-relaxed'>
                        Estamos <strong>muito felizes</strong> em ter você na
                        nossa comunidade de talentos! Após uma análise
                        cuidadosa, seu perfil foi aprovado e você já pode
                        começar a explorar todas as oportunidades incríveis que
                        temos para você.
                    </Text>
                    <Section className='bg-gray-50 rounded-xl p-6 mb-8'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4 text-center'>
                            O que você pode fazer agora:
                        </h2>
                        <div className='space-y-3'>
                            <div className='flex items-center'>
                                <span className='text-2xl mr-3'>🚀</span>
                                <Text className='text-gray-700'>
                                    Explorar projetos disponíveis na plataforma
                                </Text>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-2xl mr-3'>💼</span>
                                <Text className='text-gray-700'>
                                    Aplicar para oportunidades que combinam com
                                    seu perfil
                                </Text>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-2xl mr-3'>🌟</span>
                                <Text className='text-gray-700'>
                                    Showcasear seus talentos e construir sua
                                    reputação
                                </Text>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-2xl mr-3'>💰</span>
                                <Text className='text-gray-700'>
                                    Começar a ganhar dinheiro com seus skills
                                </Text>
                            </div>
                        </div>
                    </Section>

                    <Section className='border-t border-gray-200 pt-6 text-center'>
                        <Text className='text-sm mb-2 text-gray-500'>
                            Estamos ansiosos para ver seus talentos na nossa
                            plataforma!
                        </Text>

                        <Text className='text-xs text-gray-500'>
                            © 2025 Tooline, Todos os direitos reservados.
                        </Text>
                    </Section>
                </div>
            </Tailwind>
        </Html>
    );
}
