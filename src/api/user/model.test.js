import { User } from '.'

let user

beforeEach(async () => {
  user = await User.create({ phoneNumber: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = user.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.phoneNumber).toBe(user.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = user.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.phoneNumber).toBe(user.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
