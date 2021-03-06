const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const listHelper = require('./utils/list_helper')
const Blog = require('../models/blog')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(listHelper.initialBlogs[0])
  await  blogObject.save()
  blogObject = new Blog(listHelper.initialBlogs[1])
  await blogObject.save()
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('blog list tests', () => {


  test('returns correct amount of blog posts in JSON', async () => {
    const response = await api.get('/api/blogs').expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(listHelper.initialBlogs.length)
    expect(response.body[0].title).toBe('React patterns')
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'jeremiah',
      url: 'google.com',
      likes: 4
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const allInitialBlogs = await listHelper.blogsInDb()
      const blogToDelete = allInitialBlogs[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await listHelper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        allInitialBlogs.length - 1
      )
  
      const titles = blogsAtEnd.map(r => r.title)
  
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  test('a valid blog can be updated', async () => {
    const initialBlogsStart = await listHelper.blogsInDb()
    const blogToUpdate = initialBlogsStart[0]
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({likes: 55})
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await listHelper.blogsInDb()
  
    const resultBlog = blogsAtEnd[0]
  
    expect(blogsAtEnd).toHaveLength(initialBlogsStart.length)
    expect(resultBlog.likes).toBe(55)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('suspass', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'austinle',
      name: 'Austin Leung',
      password: 'chetmvp',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'dup user',
      password: 'badboy',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})


afterAll(() => {
  mongoose.connection.close()
})