import { argon2id, hash } from 'argon2'
import { prisma } from '../../config/prisma'
import { userWellcomeEmail } from '../../emails/functions/user-wellcome-function'
import { ClientError } from '../../errors/client-errors'
import { generateTagFromEmail } from '../../utils/generate-tag-from-email'
import { isOutdated } from '../../utils/is-outdated'

interface RegisterWithCredentialsProps {
  email: string
  name: string
  avatarUrl?: string
  type: 'client' | 'freelancer'
  password?: string
  code?: string
}
export async function registerUserService(data: RegisterWithCredentialsProps) {
  if (data.code) {
    const verificationCode = await prisma.verificationCode.findUnique({
      where: {
        userEmail_code: {
          userEmail: data.email,
          code: data?.code,
        },
      },
    })

    if (!verificationCode) {
      throw new ClientError('Código de verificação inválido')
    }

    if (isOutdated(verificationCode.expires)) {
      throw new ClientError('Código de verificação expirado')
    }
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    })
  }
  const userExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })
  if (userExists) {
    throw new ClientError('Email already exists')
  }

  const password = data.password
    ? await hash(data.password, { type: argon2id })
    : null

  const toliner = await prisma.toliner.create({
    data: {
      name: data.name,
      email: data.email,
      user: {
        create: {
          email: data.email,
          username: data.name,
          avatarUrl: data.avatarUrl,
          type: data.type,
          tag: generateTagFromEmail(data.email),
          password,
        },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      user: {
        select: {
          type: true,
        },
      },
    },
  })

  if (data.type === 'freelancer') {
    userWellcomeEmail({ name: data.name, id: toliner.id, email: data.email })
  }

  // tasks.trigger<typeof remindUnverifiedUser>('remind-unverified-user', {
  //   email: data.email,
  // })

  const { user, ...rest } = toliner

  return {
    ...rest,
    type: user?.type,
  }
}
