import error from 'http-errors'

import userDao from '../../dao/userDao.js'

const { BadRequest } = error
const template = ['starter', 'pro', 'business']

export const updateSubscription = async (req, res) => {
  const { subscription } = req.body
  const { id } = req.user

  if (!template.includes(subscription)) {
    throw new BadRequest(
      'subscription must be one of type: starter, pro, business ',
    )
  }

  const updatedContact = await userDao.findUserByIdAndUpdate(
    id,
    { subscription },
    {
      new: true,
      select: 'email subscription',
    },
  )

  res.status(200).json({ messaage: 'success', contact: updatedContact })
}
