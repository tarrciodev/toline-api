import cookie from '@fastify/cookie'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import websocket from '@fastify/websocket'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'
import { AIRoutes } from './routes/AI'
import { categoriesRoutes } from './routes/categories'
import { certificationTestRoutes } from './routes/certification-test'
import { clientRoutes } from './routes/clients'
import { converastionsRoutes } from './routes/conversations'
import { freelancerRoutes } from './routes/freelances'
import { messagesRoute } from './routes/messages'
import { projectRoutes } from './routes/projects'
import { skillsRoutes } from './routes/skills'
import { tolinerRoutes } from './routes/toliner'
import { userRoutes } from './routes/user'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setErrorHandler(errorHandler)

app.register(cookie, {
  secret: 'toline-api',
  hook: 'onRequest',
  parseOptions: {},
})

app.register(fastifyCors, { origin: '*' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Toline API',
      description: 'Toline API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})
app.register(websocket)
app.register(messagesRoute)
app.register(converastionsRoutes)
app.register(userRoutes)
app.register(projectRoutes)
app.register(tolinerRoutes)
app.register(clientRoutes)
app.register(freelancerRoutes)
app.register(skillsRoutes)
app.register(categoriesRoutes)
app.register(certificationTestRoutes)
app.register(AIRoutes)

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`✅ Server is running on port ${env.PORT}`)
  })
  .catch(err => {
    console.error('❌ Error starting server:', err)
    process.exit(1)
  })
