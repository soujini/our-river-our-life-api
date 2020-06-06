import mongoose, { Schema } from 'mongoose'

const imagesSchema = new Schema({
  flora: {
    type: String
  },
  fauna: {
    type: String
  },
  artwork: {
    type: String
  },
  groupPicture: {
    type: String
  },
  activity: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

imagesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      flora: this.flora,
      fauna: this.fauna,
      artwork: this.artwork,
      groupPicture: this.groupPicture,
      activity: this.activity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Images', imagesSchema)

export const schema = model.schema
export default model
