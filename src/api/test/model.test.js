import { Test } from '.'

let test

beforeEach(async () => {
  test = await Test.create({ name: 'test', phone: 'test', email: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = test.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test.id)
    expect(view.name).toBe(test.name)
    expect(view.phone).toBe(test.phone)
    expect(view.email).toBe(test.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = test.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(test.id)
    expect(view.name).toBe(test.name)
    expect(view.phone).toBe(test.phone)
    expect(view.email).toBe(test.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
