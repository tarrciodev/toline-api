import type { FastifyTypedInstance } from '../../types'
import { alterUserPasswordRoute } from './alter-user-password-route'
import { authUserWithCredentialsRoute } from './auth-user-with-credentials-route'
import { forgotPasswordRoute } from './forgot-password-route'
import { getMeRoute } from './get-me-route'
import { registerUserRoute } from './register-user-route'
import { resetPasswordRoute } from './reset-password-route'
import { updateUserBankAccountRoute } from './update-user-bank-accont-route'
import { updateUserBioRoute } from './update-user-bio-route'
import { updateUserCardRoute } from './update-user-card-route'
import { updateUserIdentificationRoute } from './update-user-identification-route'
import { userSocialAuthRoute } from './user-social-auth-route'
import { verificationCodeRoute } from './verification-code-route'

export async function userRoutes(app: FastifyTypedInstance) {
  app.register(getMeRoute)
  app.register(authUserWithCredentialsRoute)
  app.register(userSocialAuthRoute)
  app.register(registerUserRoute)
  app.register(updateUserIdentificationRoute)
  app.register(updateUserBankAccountRoute)
  app.register(updateUserBioRoute)
  app.register(forgotPasswordRoute)
  app.register(verificationCodeRoute)
  app.register(resetPasswordRoute)
  app.register(updateUserCardRoute)
  app.register(alterUserPasswordRoute)
}
