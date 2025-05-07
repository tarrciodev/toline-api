import { prisma } from '../../../config/prisma'

export async function verifyPaymentAdminService({
  id,
  status,
}: { id: string; status: string }) {
  const payment = await prisma.payment.update({
    where: {
      id,
    },
    data: {
      status: status as 'rejected' | 'resolved',
    },
  })

  return payment
}
