import { Heading, Html, Link, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { env } from "../../env";

interface WelcomeEmailProps {
    name?: string;
    id: string;
}

export function UserWellcomeEmailTemplate({ name, id }: WelcomeEmailProps) {
    return (
        <Html lang='pt'>
            <Tailwind>
                <div className='bg-white rounded-xl shadow-xl max-w-lg mx-auto py-4 px-6'>
                    <h1 className='text-2xl font-bold text-black mb-4'>
                        Olá, {name}👋
                    </h1>

                    <Text className='text-base mb-4 text-gray-800'>
                        Estamos muito felizes em ter você na nossa comunidade de
                        talentos! Seu registro foi recebido com sucesso e seu
                        perfil está atualmente em processo de verificação.
                    </Text>

                    <Text className='text-base mb-4 text-gray-800'>
                        Para completar a verificação da sua conta e começar a
                        trabalhar em projetos incríveis, precisamos que você
                        conclua os seguintes passos:
                    </Text>

                    <Section className='mb-6 p-5 rounded-lg bg-indigo-50'>
                        <Heading className='text-lg font-medium mb-4 text-indigo-600'>
                            📋 Lista de verificação:
                        </Heading>

                        <div className='mb-3 pb-3 border-b border-indigo-100'>
                            <Text className='text-base font-medium mb-1 text-gray-800'>
                                1. Atualize sua biografia
                            </Text>
                            <Text className='text-sm text-gray-500'>
                                Conte-nos sobre suas habilidades, experiência e
                                áreas de especialização.
                            </Text>
                        </div>

                        <div className='mb-3 pb-3 border-b border-indigo-100'>
                            <Text className='text-base font-medium mb-1 text-gray-800'>
                                2. Faça upload de uma foto de perfil
                            </Text>
                            <Text className='text-sm text-gray-500'>
                                Uma foto profissional aumenta sua credibilidade
                                e chances de ser selecionado.
                            </Text>
                        </div>

                        <div className='mb-3 pb-3 border-b border-indigo-100'>
                            <Text className='text-base font-medium mb-1 text-gray-800'>
                                3. Escolha suas áreas de interesse
                            </Text>
                            <Text className='text-sm text-gray-500'>
                                Selecione as categorias de projetos com as quais
                                gostaria de trabalhar.
                            </Text>
                        </div>

                        <div className='mb-1'>
                            <Text className='text-base font-medium mb-1 text-gray-800'>
                                4. Faça upload do seu BI (Bilhete de Identidade)
                            </Text>
                            <Text className='text-sm text-gray-500'>
                                Este documento é necessário para verificar sua
                                identidade e garantir a segurança da plataforma.
                            </Text>
                        </div>
                    </Section>

                    <Section className='mb-6 p-4 rounded-md bg-amber-50 border-l-4 border-amber-500'>
                        <Text className='text-sm text-amber-800'>
                            <strong>Importante:</strong> Seu perfil permanecerá
                            em modo de verificação até que todos os passos acima
                            sejam concluídos. Perfis incompletos podem ser
                            removidos após uma semana.
                        </Text>
                    </Section>

                    {/* Call to action */}
                    <Section className='mb-8 text-center'>
                        <Link
                            href={`/${env.WEB_URL}/dash/profile/${id}`}
                            className='inline-block px-6 py-3 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700'
                        >
                            Completar Meu Perfil Agora
                        </Link>
                    </Section>

                    <Section className='mb-6 border rounded-md border-gray-200 p-4'>
                        <Heading className='text-lg font-medium mb-3 text-indigo-600'>
                            Por que completar seu perfil?
                        </Heading>
                        <ul className='list-disc pl-5'>
                            <li className='text-sm mb-2 text-gray-800'>
                                <strong>Mais visibilidade:</strong> Perfis
                                completos aparecem com mais frequência nas
                                pesquisas
                            </li>
                            <li className='text-sm mb-2 text-gray-800'>
                                <strong>Maior confiança:</strong> Clientes
                                preferem contratar freelancers verificados
                            </li>
                            <li className='text-sm mb-2 text-gray-800'>
                                <strong>Melhores projetos:</strong> Acesso a
                                projetos exclusivos para membros verificados
                            </li>
                            <li className='text-sm text-gray-800'>
                                <strong>Pagamentos seguros:</strong> Verificação
                                completa desbloqueia todas as opções de
                                pagamento
                            </li>
                        </ul>
                    </Section>

                    <Section className='border-t border-gray-200 pt-6 text-center'>
                        <Text className='text-sm mb-2 text-gray-500'>
                            Estamos ansiosos para ver seus talentos na nossa
                            plataforma!
                        </Text>
                        <Text className='text-xs mb-4 text-gray-500'>
                            Se precisar de ajuda, entre em contato com nossa
                            equipe de suporte em{" "}
                            <Link
                                href='mailto:suporte@freelancerconnect.com.br'
                                className='text-indigo-600'
                            >
                                suporte@freelancerconnect.com.br
                            </Link>
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
