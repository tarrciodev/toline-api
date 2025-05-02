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
          especialization: z.string().optional(),
          skills: z.string().nullable(),
          search: z.string().optional(),
          page: z.number().optional(),
          limit: z.number().optional(),
        }),
      },
    },
    async (request, replay) => {
      const { especialization, skills, search, page, limit } = request.query

      const parsedSkills = skills
        ? skills
            .split(',')
            .map(skill => skill.trim())
            .filter(Boolean)
        : undefined

      const query = {
        ...(especialization && { especialization }),
        ...(parsedSkills && { skills: parsedSkills }),
        ...(search && { search }),
        page,
        limit,
      }

      console.log({ query })

      const freelancers = await getFreelancersService({ query })

      return replay.status(200).send(freelancers)
    }
  )
}
