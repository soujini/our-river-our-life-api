import mongoose, { Schema } from 'mongoose'

const floraFaunaImagesUploadSchema = new Schema({
  flora: {
    type: String
  },
  fauna: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

floraFaunaImagesUploadSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      flora: this.flora,
      fauna: this.fauna,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('FloraFaunaImagesUpload', floraFaunaImagesUploadSchema)

export const schema = model.schema
export default model
