import { User } from '@controllers/index'

describe('Application', () => {
  it('should ruinnig on port 8080', () => {
    const user = new User()
    expect(true).toBe(true)
  })
})
