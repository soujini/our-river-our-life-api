import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Images } from '.'

const app = () => express(apiRoot, routes)

let images

beforeEach(async () => {
  images = await Images.create({})
})

test('POST /images 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ flora: 'test', fauna: 'test', artwork: 'test', groupPicture: 'test', activity: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.flora).toEqual('test')
  expect(body.fauna).toEqual('test')
  expect(body.artwork).toEqual('test')
  expect(body.groupPicture).toEqual('test')
  expect(body.activity).toEqual('test')
})

test('GET /images 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /images/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${images.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(images.id)
})

test('GET /images/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /images/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${images.id}`)
    .send({ flora: 'test', fauna: 'test', artwork: 'test', groupPicture: 'test', activity: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(images.id)
  expect(body.flora).toEqual('test')
  expect(body.fauna).toEqual('test')
  expect(body.artwork).toEqual('test')
  expect(body.groupPicture).toEqual('test')
  expect(body.activity).toEqual('test')
})

test('PUT /images/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ flora: 'test', fauna: 'test', artwork: 'test', groupPicture: 'test', activity: 'test' })
  expect(status).toBe(404)
})

test('DELETE /images/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${images.id}`)
  expect(status).toBe(204)
})

test('DELETE /images/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
