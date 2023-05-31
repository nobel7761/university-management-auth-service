import dotenv from 'dotenv'
import path from 'path'

//here we are joining the environment variable and this configure file. As this is not in the same directory. That is why we need to do this.
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
}
