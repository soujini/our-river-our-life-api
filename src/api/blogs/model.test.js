import { Blogs } from '.'

let blogs

beforeEach(async () => {
  blogs = await Blogs.create({ templateType: 'test', userId: 'test', featuredTitle: 'test', featuredDescription: 'test', featuredPhoto: 'test', featuredAdditionalPhotos: 'test', featuredVideo: 'test', featuredAdditionalVideos: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = blogs.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(blogs.id)
    expect(view.templateType).toBe(blogs.templateType)
    expect(view.userId).toBe(blogs.userId)
    expect(view.featuredTitle).toBe(blogs.featuredTitle)
    expect(view.featuredDescription).toBe(blogs.featuredDescription)
    expect(view.featuredPhoto).toBe(blogs.featuredPhoto)
    expect(view.featuredAdditionalPhotos).toBe(blogs.featuredAdditionalPhotos)
    expect(view.featuredVideo).toBe(blogs.featuredVideo)
    expect(view.featuredAdditionalVideos).toBe(blogs.featuredAdditionalVideos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = blogs.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(blogs.id)
    expect(view.templateType).toBe(blogs.templateType)
    expect(view.userId).toBe(blogs.userId)
    expect(view.featuredTitle).toBe(blogs.featuredTitle)
    expect(view.featuredDescription).toBe(blogs.featuredDescription)
    expect(view.featuredPhoto).toBe(blogs.featuredPhoto)
    expect(view.featuredAdditionalPhotos).toBe(blogs.featuredAdditionalPhotos)
    expect(view.featuredVideo).toBe(blogs.featuredVideo)
    expect(view.featuredAdditionalVideos).toBe(blogs.featuredAdditionalVideos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
