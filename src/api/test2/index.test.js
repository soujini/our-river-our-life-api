import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Test2 } from '.'

const app = () => express(apiRoot, routes)

let test2

beforeEach(async () => {
  test2 = await Test2.create({})
})

test('POST /test2 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ phoneNumber: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.phoneNumber).toEqual('test')
})

test('GET /test2 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /test2/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${test2.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(test2.id)
})

test('GET /test2/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /test2/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${test2.id}`)
    .send({ phoneNumber: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(test2.id)
  expect(body.phoneNumber).toEqual('test')
})

test('PUT /test2/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ phoneNumber: 'test' })
  expect(status).toBe(404)
})

test('DELETE /test2/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${test2.id}`)
  expect(status).toBe(204)
})

test('DELETE /test2/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
