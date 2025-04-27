import { prisma } from '../../config/prisma'
import { verificationEmailFunction } from '../../emails/functions/email-verification-function'
import { ClientError } from '../../errors/client-errors'
import { generateVerificationCode } from '../../utils/generate-verification-code'
import { isOutdated } from '../../utils/is-outdated'

export async function verificationCodeService(
  userEmail: string,
  type: string,
  name: string
) {
  const userExists = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (userExists) {
    throw new ClientError('Esse email já está cadastrado.')
  }

  const codeAlreadyRequested = await prisma.verificationCode.findFirst({
    where: {
      userEmail,
      type,
    },
  })

  if (codeAlreadyRequested) {
    if (!isOutdated(codeAlreadyRequested?.expires as Date)) {
      throw new ClientError(
        'Você já solicitou um código de verificação. Aguarde 10 minutos para fazer o proximo solicitação.'
      )
    }

    await prisma.verificationCode.delete({
      where: {
        id: codeAlreadyRequested.id,
      },
    })
  }

  const code = generateVerificationCode()
  await verificationEmailFunction({ name, code, email: userEmail })

  await prisma.verificationCode.create({
    data: {
      userEmail,
      code,
      expires: new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
      type,
    },
  })

  return code
}
