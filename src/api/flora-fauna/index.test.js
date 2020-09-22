import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { FloraFauna } from '.'

const app = () => express(apiRoot, routes)

let floraFauna

beforeEach(async () => {
  floraFauna = await FloraFauna.create({})
})

test('POST /flora-fauna 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, latitude: 'test', longitude: 'test', location: 'test', flora: 'test', fauna: 'test', commonName: 'test', localName: 'test', scientificName: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.latitude).toEqual('test')
  expect(body.longitude).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.flora).toEqual('test')
  expect(body.fauna).toEqual('test')
  expect(body.commonName).toEqual('test')
  expect(body.localName).toEqual('test')
  expect(body.scientificName).toEqual('test')
})

test('POST /flora-fauna 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /flora-fauna 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /flora-fauna 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /flora-fauna/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${floraFauna.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(floraFauna.id)
})

test('GET /flora-fauna/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${floraFauna.id}`)
  expect(status).toBe(401)
})

test('GET /flora-fauna/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /flora-fauna/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${floraFauna.id}`)
    .send({ access_token: masterKey, latitude: 'test', longitude: 'test', location: 'test', flora: 'test', fauna: 'test', commonName: 'test', localName: 'test', scientificName: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(floraFauna.id)
  expect(body.latitude).toEqual('test')
  expect(body.longitude).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.flora).toEqual('test')
  expect(body.fauna).toEqual('test')
  expect(body.commonName).toEqual('test')
  expect(body.localName).toEqual('test')
  expect(body.scientificName).toEqual('test')
})

test('PUT /flora-fauna/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${floraFauna.id}`)
  expect(status).toBe(401)
})

test('PUT /flora-fauna/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, latitude: 'test', longitude: 'test', location: 'test', flora: 'test', fauna: 'test', commonName: 'test', localName: 'test', scientificName: 'test' })
  expect(status).toBe(404)
})

test('DELETE /flora-fauna/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${floraFauna.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /flora-fauna/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${floraFauna.id}`)
  expect(status).toBe(401)
})

test('DELETE /flora-fauna/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
