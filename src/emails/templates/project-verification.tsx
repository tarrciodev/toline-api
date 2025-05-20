import { Html, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import type { ProjectCreatedEmailProps } from "../functions/project-verification-function";

// Make props optional
export function ProjectCreatedEmail({
    user,
    project,
}: ProjectCreatedEmailProps) {
    return (
        <Html lang='pt'>
            <Tailwind>
                <div className='bg-white rounded-xl shadow-xl max-w-lg mx-auto py-4 px-6'>
                    <h1 className='text-2xl font-bold text-black mb-4'>
                        Olá, {user.name}👋
                    </h1>

                    <Text className='text-base mb-4'>
                        Seu projeto <em>{project.name}</em> foi criado e está
                        atualmente em análise pela nossa equipe administrativa.
                        Este processo pode levar de 24 a 48 horas, dependendo do
                        volume de projetos que estão em análise. e tem como
                        objetivo garantir que todos os projetos em nossa
                        plataforma estejam alinhados com nossas diretrizes.
                    </Text>

                    <Text className='text-base mb-4'>
                        Assim que a análise for concluída, você receberá uma
                        notificação e seu projeto será publicado na plataforma,
                        tornando-se visível para todos os freelancers.
                    </Text>

                    <div className='text-sm text-gray-500'>
                        Obrigado pela confiança na nossa plataforma. Com a mais
                        alta consideração.
                        <em>Tooline Work</em>
                    </div>
                </div>
            </Tailwind>
        </Html>
    );
}
