import mongoose, { Schema } from 'mongoose'

const blogsSchema = new Schema({
  templateType: {
    type: Number
  },
  userId: {
    type: String
  },
  featuredTitle: {
    type: String
  },
  featuredDescription: {
    type: String
  },
  featuredPhoto: {
    imageURL:{
      type:String
    },
  },
  featuredAdditionalPhotos:[{
    imageURL:{
      type:String
    },
  }],
  featuredVideo: {
    type: String
  },
  featuredAdditionalVideos: {
    type: Array
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

blogsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      templateType: this.templateType,
      userId: this.userId,
      featuredTitle: this.featuredTitle,
      featuredDescription: this.featuredDescription,
      featuredPhoto: this.featuredPhoto,
      featuredAdditionalPhotos: this.featuredAdditionalPhotos,
      featuredVideo: this.featuredVideo,
      featuredAdditionalVideos: this.featuredAdditionalVideos,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Blogs', blogsSchema)

export const schema = model.schema
export default model
