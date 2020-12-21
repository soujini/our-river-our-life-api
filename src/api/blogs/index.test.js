import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Blogs } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, blogs

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  blogs = await Blogs.create({})
})

test('POST /blogs 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, templateType: 'test', userId: 'test', featuredTitle: 'test', featuredDescription: 'test', featuredPhoto: 'test', featuredAdditionalPhotos: 'test', featuredVideo: 'test', featuredAdditionalVideos: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.templateType).toEqual('test')
  expect(body.userId).toEqual('test')
  expect(body.featuredTitle).toEqual('test')
  expect(body.featuredDescription).toEqual('test')
  expect(body.featuredPhoto).toEqual('test')
  expect(body.featuredAdditionalPhotos).toEqual('test')
  expect(body.featuredVideo).toEqual('test')
  expect(body.featuredAdditionalVideos).toEqual('test')
})

test('POST /blogs 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /blogs 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /blogs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /blogs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${blogs.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(blogs.id)
})

test('GET /blogs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /blogs/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${blogs.id}`)
    .send({ access_token: adminSession, templateType: 'test', userId: 'test', featuredTitle: 'test', featuredDescription: 'test', featuredPhoto: 'test', featuredAdditionalPhotos: 'test', featuredVideo: 'test', featuredAdditionalVideos: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(blogs.id)
  expect(body.templateType).toEqual('test')
  expect(body.userId).toEqual('test')
  expect(body.featuredTitle).toEqual('test')
  expect(body.featuredDescription).toEqual('test')
  expect(body.featuredPhoto).toEqual('test')
  expect(body.featuredAdditionalPhotos).toEqual('test')
  expect(body.featuredVideo).toEqual('test')
  expect(body.featuredAdditionalVideos).toEqual('test')
})

test('PUT /blogs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${blogs.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /blogs/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${blogs.id}`)
  expect(status).toBe(401)
})

test('PUT /blogs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, templateType: 'test', userId: 'test', featuredTitle: 'test', featuredDescription: 'test', featuredPhoto: 'test', featuredAdditionalPhotos: 'test', featuredVideo: 'test', featuredAdditionalVideos: 'test' })
  expect(status).toBe(404)
})

test('DELETE /blogs/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${blogs.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /blogs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${blogs.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /blogs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${blogs.id}`)
  expect(status).toBe(401)
})

test('DELETE /blogs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
