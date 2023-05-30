import { Model, model, Schema } from 'mongoose'
import { IUser } from './users.interface'

type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, //for getting the createdAt, updatedAt from mongoose
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
