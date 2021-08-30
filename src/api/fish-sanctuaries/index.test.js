import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { FishSanctuaries } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, fishSanctuaries

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  fishSanctuaries = await FishSanctuaries.create({})
})

test('POST /fish-sanctuaries 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, locationDetails: 'test', habitatCharacteristics: 'test', managementActions: 'test', fishInformation: 'test', culturalHistoricalSignificance: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.locationDetails).toEqual('test')
  expect(body.habitatCharacteristics).toEqual('test')
  expect(body.managementActions).toEqual('test')
  expect(body.fishInformation).toEqual('test')
  expect(body.culturalHistoricalSignificance).toEqual('test')
})

test('POST /fish-sanctuaries 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /fish-sanctuaries 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /fish-sanctuaries 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /fish-sanctuaries/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${fishSanctuaries.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(fishSanctuaries.id)
})

test('GET /fish-sanctuaries/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /fish-sanctuaries/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${fishSanctuaries.id}`)
    .send({ access_token: masterKey, locationDetails: 'test', habitatCharacteristics: 'test', managementActions: 'test', fishInformation: 'test', culturalHistoricalSignificance: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(fishSanctuaries.id)
  expect(body.locationDetails).toEqual('test')
  expect(body.habitatCharacteristics).toEqual('test')
  expect(body.managementActions).toEqual('test')
  expect(body.fishInformation).toEqual('test')
  expect(body.culturalHistoricalSignificance).toEqual('test')
})

test('PUT /fish-sanctuaries/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${fishSanctuaries.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /fish-sanctuaries/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${fishSanctuaries.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /fish-sanctuaries/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${fishSanctuaries.id}`)
  expect(status).toBe(401)
})

test('PUT /fish-sanctuaries/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, locationDetails: 'test', habitatCharacteristics: 'test', managementActions: 'test', fishInformation: 'test', culturalHistoricalSignificance: 'test' })
  expect(status).toBe(404)
})

test('DELETE /fish-sanctuaries/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fishSanctuaries.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /fish-sanctuaries/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fishSanctuaries.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /fish-sanctuaries/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fishSanctuaries.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /fish-sanctuaries/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fishSanctuaries.id}`)
  expect(status).toBe(401)
})

test('DELETE /fish-sanctuaries/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
