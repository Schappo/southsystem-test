import { User } from '@controllers/index'

const testT = () => {
  const user = new User()
  console.log(user.name)
}

testT()
