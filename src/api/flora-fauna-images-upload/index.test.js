import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { FloraFaunaImagesUpload } from '.'

const app = () => express(apiRoot, routes)

let floraFaunaImagesUpload

beforeEach(async () => {
  floraFaunaImagesUpload = await FloraFaunaImagesUpload.create({})
})

test('POST /flora-fauna-images-upload 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ flora: 'test', fauna: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.flora).toEqual('test')
  expect(body.fauna).toEqual('test')
})

test('GET /flora-fauna-images-upload 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /flora-fauna-images-upload/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${floraFaunaImagesUpload.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(floraFaunaImagesUpload.id)
})

test('GET /flora-fauna-images-upload/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /flora-fauna-images-upload/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${floraFaunaImagesUpload.id}`)
    .send({ flora: 'test', fauna: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(floraFaunaImagesUpload.id)
  expect(body.flora).toEqual('test')
  expect(body.fauna).toEqual('test')
})

test('PUT /flora-fauna-images-upload/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ flora: 'test', fauna: 'test' })
  expect(status).toBe(404)
})

test('DELETE /flora-fauna-images-upload/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${floraFaunaImagesUpload.id}`)
  expect(status).toBe(204)
})

test('DELETE /flora-fauna-images-upload/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
