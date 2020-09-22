import { FloraFauna } from '.'

let floraFauna

beforeEach(async () => {
  floraFauna = await FloraFauna.create({ latitude: 'test', longitude: 'test', location: 'test', flora: 'test', fauna: 'test', commonName: 'test', localName: 'test', scientificName: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = floraFauna.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(floraFauna.id)
    expect(view.latitude).toBe(floraFauna.latitude)
    expect(view.longitude).toBe(floraFauna.longitude)
    expect(view.location).toBe(floraFauna.location)
    expect(view.flora).toBe(floraFauna.flora)
    expect(view.fauna).toBe(floraFauna.fauna)
    expect(view.commonName).toBe(floraFauna.commonName)
    expect(view.localName).toBe(floraFauna.localName)
    expect(view.scientificName).toBe(floraFauna.scientificName)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = floraFauna.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(floraFauna.id)
    expect(view.latitude).toBe(floraFauna.latitude)
    expect(view.longitude).toBe(floraFauna.longitude)
    expect(view.location).toBe(floraFauna.location)
    expect(view.flora).toBe(floraFauna.flora)
    expect(view.fauna).toBe(floraFauna.fauna)
    expect(view.commonName).toBe(floraFauna.commonName)
    expect(view.localName).toBe(floraFauna.localName)
    expect(view.scientificName).toBe(floraFauna.scientificName)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
