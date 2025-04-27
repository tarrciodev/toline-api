import { argon2id, hash, verify } from 'argon2'
import { prisma } from '../../config/prisma'

export async function alterUserPasswordService({
  userId,
  password,
  oldPassword,
}: {
  userId: string
  password: string
  oldPassword: string
}) {
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!userExists) {
    return {
      status: 'error',
      message: 'Usuário não encontrado',
    }
  }

  const passwordMatches = await verify(
    userExists.password as string,
    oldPassword
  )

  if (passwordMatches === false) {
    return {
      status: 'error',
      message: 'A Senha atual está incorreta',
    }
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await hash(password, { type: argon2id }),
    },
  })

  return {
    status: 'success',
    message: 'Senha alterada com sucesso',
  }
}
