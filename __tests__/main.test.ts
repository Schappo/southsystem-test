import request from 'supertest'
import app from '@/server'

describe('Application', () => {
  it('should ruinnig on port 8080', async () => {
    const response = await request(app).get('/').send()
    expect(response.status).toBe(200)
    expect(response.text).toBe('OK')
  })
})
