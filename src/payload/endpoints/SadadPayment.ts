import type { PayloadHandler } from 'payload/config'

export const SadadPayment: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req
  payload.logger.info(user)
  payload.logger.info(req.headers)
  if (req.headers.origin != 'https://sadadqa.com') {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  if (
    req.body.transaction_status == '3' &&
    req.body.STATUS == 'TXN_SUCCESS' &&
    req.body.RESPCODE == '1'
  ) {
    let order = await payload.findByID({
      collection: 'orders',
      id: req.body.ORDERID,
    })
    payload.logger.info(order)
    if (order) {
      await payload
        .update({
          collection: 'orders',
          id: req.body.ORDERID,
          data: {
            status: 'paid',
          },
        })
        .then(() => {
          res.redirect(
            302,
            `${process.env.NEXT_PUBLIC_SERVER_URL}/account?success=PaymentSuccessful`,
          )
        })
    }
  } else {
    res.status(401).json({ error: 'Payment failed' })
  }
}
