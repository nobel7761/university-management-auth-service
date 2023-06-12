import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    //req-validation
    //body --> object
    //data --> object

    const createUSerZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'Role is required!!!',
        }),
        password: z.string().optional(),
      }),
    })

    await createUSerZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
