import z from 'zod'
import { registerUserService } from '../../services/users/register-user-service'
import type { FastifyTypedInstance } from '../../types'

export async function registerUserRoute(app: FastifyTypedInstance) {
  app.post(
    '/register',
    {
      schema: {
        tags: ['Registration'],
        description: 'Register with credentials',
        body: z.object({
          email: z.string().email(),
          name: z.string(),
          avatarUrl: z.string().optional(),
          password: z.string().optional(),
          type: z.enum(['client', 'freelancer']),
          code: z.string().optional(),
        }),
      },
    },
    async (request, replay) => {
      const { email, name, avatarUrl, type, password, code } = request.body
      const data = {
        email,
        name,
        avatarUrl,
        type,
        password,
        code,
      }

      const user = await registerUserService(data)

      return replay.status(200).send(user)
    }
  )
}
