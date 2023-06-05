import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //!auto generated incremental id
  const id = await generateUserId()
  user.id = id //we have to set the id into the user object

  //!default password. because, once the id was generated from the admin for a student there will be a default password!
  if (!user.password) {
    user.password = config.default_user_pass as string //we have to set the password into the user object
  }
  const createdUser = await User.create(user)

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!') //using the custom error ApiError Class
  }
  return createdUser
}

export default {
  createUser,
}
