import { generateControllers } from 'modules'
import { User } from 'resources/user'

const userControllers: any = generateControllers(User)

export default userControllers
