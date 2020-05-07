import mongoose, { Schema } from 'mongoose'

const soujSchema = new Schema({
  phoneNumber: {
    type: String
  },
  generalInformation:{
    name: {
    type: String
  },
  info}: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

soujSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      phoneNumber: this.phoneNumber,
      generalInformation:{name: this.generalInformation:{name,
      info}: this.info},
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Souj', soujSchema)

export const schema = model.schema
export default model
