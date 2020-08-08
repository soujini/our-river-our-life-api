import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { FloodAlert } from '.'

const app = () => express(apiRoot, routes)

let floodAlert

beforeEach(async () => {
  floodAlert = await FloodAlert.create({})
})

test('POST /flood-alert 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ location: 'test', latitude: 'test', longitude: 'test', date: 'test', time: 'test', images: 'test', experience: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.location).toEqual('test')
  expect(body.latitude).toEqual('test')
  expect(body.longitude).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.images).toEqual('test')
  expect(body.experience).toEqual('test')
})

test('GET /flood-alert 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /flood-alert/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${floodAlert.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(floodAlert.id)
})

test('GET /flood-alert/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /flood-alert/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${floodAlert.id}`)
    .send({ location: 'test', latitude: 'test', longitude: 'test', date: 'test', time: 'test', images: 'test', experience: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(floodAlert.id)
  expect(body.location).toEqual('test')
  expect(body.latitude).toEqual('test')
  expect(body.longitude).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.images).toEqual('test')
  expect(body.experience).toEqual('test')
})

test('PUT /flood-alert/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ location: 'test', latitude: 'test', longitude: 'test', date: 'test', time: 'test', images: 'test', experience: 'test' })
  expect(status).toBe(404)
})

test('DELETE /flood-alert/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${floodAlert.id}`)
  expect(status).toBe(204)
})

test('DELETE /flood-alert/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
