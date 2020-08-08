import { FloodAlert } from '.'

let floodAlert

beforeEach(async () => {
  floodAlert = await FloodAlert.create({ location: 'test', latitude: 'test', longitude: 'test', date: 'test', time: 'test', images: 'test', experience: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = floodAlert.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(floodAlert.id)
    expect(view.location).toBe(floodAlert.location)
    expect(view.latitude).toBe(floodAlert.latitude)
    expect(view.longitude).toBe(floodAlert.longitude)
    expect(view.date).toBe(floodAlert.date)
    expect(view.time).toBe(floodAlert.time)
    expect(view.images).toBe(floodAlert.images)
    expect(view.experience).toBe(floodAlert.experience)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = floodAlert.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(floodAlert.id)
    expect(view.location).toBe(floodAlert.location)
    expect(view.latitude).toBe(floodAlert.latitude)
    expect(view.longitude).toBe(floodAlert.longitude)
    expect(view.date).toBe(floodAlert.date)
    expect(view.time).toBe(floodAlert.time)
    expect(view.images).toBe(floodAlert.images)
    expect(view.experience).toBe(floodAlert.experience)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
