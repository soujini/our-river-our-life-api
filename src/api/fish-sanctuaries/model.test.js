import { FishSanctuaries } from '.'

let fishSanctuaries

beforeEach(async () => {
  fishSanctuaries = await FishSanctuaries.create({ locationDetails: 'test', habitatCharacteristics: 'test', managementActions: 'test', fishInformation: 'test', culturalHistoricalSignificance: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = fishSanctuaries.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(fishSanctuaries.id)
    expect(view.locationDetails).toBe(fishSanctuaries.locationDetails)
    expect(view.habitatCharacteristics).toBe(fishSanctuaries.habitatCharacteristics)
    expect(view.managementActions).toBe(fishSanctuaries.managementActions)
    expect(view.fishInformation).toBe(fishSanctuaries.fishInformation)
    expect(view.culturalHistoricalSignificance).toBe(fishSanctuaries.culturalHistoricalSignificance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = fishSanctuaries.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(fishSanctuaries.id)
    expect(view.locationDetails).toBe(fishSanctuaries.locationDetails)
    expect(view.habitatCharacteristics).toBe(fishSanctuaries.habitatCharacteristics)
    expect(view.managementActions).toBe(fishSanctuaries.managementActions)
    expect(view.fishInformation).toBe(fishSanctuaries.fishInformation)
    expect(view.culturalHistoricalSignificance).toBe(fishSanctuaries.culturalHistoricalSignificance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
