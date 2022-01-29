import Jimp from 'jimp'
import fs from 'fs/promises'
import path from 'path'

import { User } from '../../model/users.js'

const storagePath = path.resolve('public/avatars')

export const updateAvatar = async (req, res) => {
  const { id } = req.user
  const file = req.file

  try {
    // image resize
    const resizedImg = (await Jimp.read(file.path)).resize(250, 250)
    resizedImg.write(file.path)
    //

    const avatarPath = `${storagePath}/${id}.jpg`
    await fs.rename(file.path, avatarPath)

    await User.findByIdAndUpdate(id, { avatarURL: avatarPath })
    res.status(200).json({ message: 'success', avatarURL: avatarPath })
  } catch (error) {
    fs.unlink(file.path)
    throw error
  }
}
