import { Login } from '.'

let login

beforeEach(async () => {
  login = await Login.create({ phoneNumber: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = login.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(login.id)
    expect(view.phoneNumber).toBe(login.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = login.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(login.id)
    expect(view.phoneNumber).toBe(login.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
