import z from 'zod'
import type { FastifyTypedInstance } from '../../../types'
import { createSubcategoryService } from '../../services/subcategories/create-subcategory'

export async function createSubcategoryRoute(app: FastifyTypedInstance) {
  app.post(
    '/adm/subcategory',
    {
      schema: {
        body: z.object({
          name: z.string(),
          description: z.string().optional(),
          skills: z.array(z.string()).optional(),
          categoryId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { skills, ...subcategory } = request.body
      console.log(request.body)
      const result = await createSubcategoryService({
        subcategory,
        skills: skills ?? [],
      })

      return reply.status(201).send(result)
    }
  )
}
