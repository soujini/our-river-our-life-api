import { WaterTestDetails } from '.'

let waterTestDetails

beforeEach(async () => {
  waterTestDetails = await WaterTestDetails.create({ phoneNumber: 'test', generalInformation:{name: 'test', test}: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = waterTestDetails.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(waterTestDetails.id)
    expect(view.phoneNumber).toBe(waterTestDetails.phoneNumber)
    expect(view.generalInformation:{name).toBe(waterTestDetails.generalInformation:{name)
    expect(view.test}).toBe(waterTestDetails.test})
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = waterTestDetails.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(waterTestDetails.id)
    expect(view.phoneNumber).toBe(waterTestDetails.phoneNumber)
    expect(view.generalInformation:{name).toBe(waterTestDetails.generalInformation:{name)
    expect(view.test}).toBe(waterTestDetails.test})
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
