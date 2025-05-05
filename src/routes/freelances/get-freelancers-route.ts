import z from 'zod'
import { getFreelancersService } from '../../services/freelancers/get-freelancers-service'
import type { FastifyTypedInstance } from '../../types'

export async function getFreelancersRoute(app: FastifyTypedInstance) {
  app.get(
    '/freelancers',
    {
      schema: {
        tags: ['Freelancers'],
        description: 'Get freelancers',
        querystring: z.object({
          specialization: z
            .string()
            .optional()
            .nullable()
            .transform(val =>
              val === 'undefined' || !val?.trim() ? undefined : val
            ),
          skills: z
            .string()
            .optional()
            .nullable()
            .transform(val =>
              val === 'undefined' || !val?.trim() ? undefined : val
            ),
          search: z
            .string()
            .optional()
            .nullable()
            .transform(val =>
              val === 'undefined' || !val?.trim() ? undefined : val
            ),
          page: z.number().optional(),
          limit: z.number().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { specialization, skills, search, page, limit } = request.query

      const parsedSkills = skills
        ? skills
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill && skill !== 'undefined')
        : undefined

      const query = {
        ...(specialization && { specialization }),
        ...(parsedSkills &&
          parsedSkills.length > 0 && { skills: parsedSkills }),
        ...(search && { search }),
        page,
        limit,
      }

      const freelancers = await getFreelancersService({ query })

      return reply.status(200).send(freelancers)
    }
  )
}
