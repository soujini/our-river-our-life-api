import { Images } from '.'

let images

beforeEach(async () => {
  images = await Images.create({ flora: 'test', fauna: 'test', artwork: 'test', groupPicture: 'test', activity: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = images.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(images.id)
    expect(view.flora).toBe(images.flora)
    expect(view.fauna).toBe(images.fauna)
    expect(view.artwork).toBe(images.artwork)
    expect(view.groupPicture).toBe(images.groupPicture)
    expect(view.activity).toBe(images.activity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = images.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(images.id)
    expect(view.flora).toBe(images.flora)
    expect(view.fauna).toBe(images.fauna)
    expect(view.artwork).toBe(images.artwork)
    expect(view.groupPicture).toBe(images.groupPicture)
    expect(view.activity).toBe(images.activity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
