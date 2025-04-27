import { argon2id, hash } from 'argon2'
import { prisma } from '../../config/prisma'
import { isOutdated } from '../../utils/is-outdated.js'

export async function resetPasswordService(
  userEmail: string,
  data: { password: string; code: string }
) {
  const { code } = data
  const codeIsValid = await prisma.verificationCode.findUnique({
    where: {
      userEmail_code: {
        userEmail,
        code,
      },
    },
  })

  if (!codeIsValid) {
    return {
      status: 'error',
      message: 'Codigo inválido',
    }
  }

  const codeHasExpired = isOutdated(codeIsValid.expires)

  if (codeHasExpired) {
    await prisma.verificationCode.delete({
      where: {
        id: codeIsValid.id,
      },
    })

    return {
      status: 'error',
      message: 'Codigo Expirado',
    }
  }

  await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      password: await hash(data.password, { type: argon2id }),
    },
  })

  await prisma.verificationCode.delete({
    where: {
      id: codeIsValid.id,
    },
  })

  return {
    status: 'success',
    message: 'Password resetado com sucesso. Vá para a pagina de login',
  }
}
