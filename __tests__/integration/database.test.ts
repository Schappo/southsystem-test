import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config({
  path: '.env.test'
})

const {
  DB_PORT,
  DB_NAME
} = process.env
const DB_URI = `mongodb://localhost:${DB_PORT}/${DB_NAME}?authSource=admin`
console.log(DB_URI)

describe('insert', () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true
    })
    db = await connection.db(DB_NAME)
  })

  afterAll(async () => {
    await db.dropDatabase()
    await connection.close()
    await db.close()
  })

  it('should insert a doc into collection', async () => {
    const users = db.collection('users')

    const mockUser = { _id: 'some-user-id', name: 'John' }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ _id: 'some-user-id' })
    expect(insertedUser).toEqual(mockUser)
  })
})
