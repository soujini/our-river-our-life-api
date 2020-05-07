import mongoose, { Schema } from 'mongoose'

const souj2Schema = new Schema({
  generalInformation:
  name: {
    type: String
  },
  info: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

souj2Schema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      generalInformation:name: this.generalInformation:name,
      info: this.info,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Souj2', souj2Schema)

export const schema = model.schema
export default model
