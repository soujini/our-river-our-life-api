import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { WaterTestDetails } from '.'

const app = () => express(apiRoot, routes)

let waterTestDetails

beforeEach(async () => {
  waterTestDetails = await WaterTestDetails.create({})
})

test('POST /water-test-details 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ userId: 'test', generalInformation:{name: 'test', test}: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.generalInformation:{name).toEqual('test')
  expect(body.test}).toEqual('test')
})

test('GET /water-test-details 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /water-test-details/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${waterTestDetails.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(waterTestDetails.id)
})

test('GET /water-test-details/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /water-test-details/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${waterTestDetails.id}`)
    .send({ userId: 'test', generalInformation:{name: 'test', test}: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(waterTestDetails.id)
  expect(body.userId).toEqual('test')
  expect(body.generalInformation:{name).toEqual('test')
  expect(body.test}).toEqual('test')
})

test('PUT /water-test-details/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ userId: 'test', generalInformation:{name: 'test', test}: 'test' })
  expect(status).toBe(404)
})

test('DELETE /water-test-details/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${waterTestDetails.id}`)
  expect(status).toBe(204)
})

test('DELETE /water-test-details/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
