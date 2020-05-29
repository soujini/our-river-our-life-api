import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Login } from '.'

const app = () => express(apiRoot, routes)

let login

beforeEach(async () => {
  login = await Login.create({})
})

test('POST /login 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ phoneNumber: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.phoneNumber).toEqual('test')
})

test('GET /login 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /login/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${login.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(login.id)
})

test('GET /login/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /login/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${login.id}`)
    .send({ phoneNumber: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(login.id)
  expect(body.phoneNumber).toEqual('test')
})

test('PUT /login/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ phoneNumber: 'test' })
  expect(status).toBe(404)
})

test('DELETE /login/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${login.id}`)
  expect(status).toBe(204)
})

test('DELETE /login/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
