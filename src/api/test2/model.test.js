import { Test2 } from '.'

let test2

beforeEach(async () => {
  test2 = await Test2.create({ phoneNumber: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = test2.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test2.id)
    expect(view.phoneNumber).toBe(test2.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = test2.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test2.id)
    expect(view.phoneNumber).toBe(test2.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
