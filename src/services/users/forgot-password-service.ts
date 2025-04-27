import { prisma } from '../../config/prisma'
import { restePasswordEmailFunction } from '../../emails/functions/reset-password-verification-function'
import { generateVerificationCode } from '../../utils/generate-verification-code'

export async function forgotPasswordService(
  userEmail: string,
  siteUrl: string
) {
  const userExists = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (!userExists) {
    return {
      status: 'error',
      message: 'Esse email não está cadastrado.',
    }
  }

  const useHasAskedCode = await prisma.verificationCode.findUnique({
    where: {
      userEmail,
    },
  })

  if (useHasAskedCode) {
    await prisma.verificationCode.delete({
      where: {
        id: useHasAskedCode.id,
      },
    })
  }

  const code = generateVerificationCode()

  restePasswordEmailFunction({
    name: userExists.username.split(' ')[0],
    code,
    siteUrl,
    email: userExists.email,
  })

  await prisma.verificationCode.create({
    data: {
      userEmail,
      code,
      expires: new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
      type: 'reset-password',
    },
  })

  return {
    status: 'success',
    message: 'Código enviado com sucesso. Verifique seu email.',
  }
}
