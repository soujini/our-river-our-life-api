import { FloraFaunaImagesUpload } from '.'

let floraFaunaImagesUpload

beforeEach(async () => {
  floraFaunaImagesUpload = await FloraFaunaImagesUpload.create({ flora: 'test', fauna: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = floraFaunaImagesUpload.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(floraFaunaImagesUpload.id)
    expect(view.flora).toBe(floraFaunaImagesUpload.flora)
    expect(view.fauna).toBe(floraFaunaImagesUpload.fauna)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = floraFaunaImagesUpload.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(floraFaunaImagesUpload.id)
    expect(view.flora).toBe(floraFaunaImagesUpload.flora)
    expect(view.fauna).toBe(floraFaunaImagesUpload.fauna)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
