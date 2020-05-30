import mongoose, { Schema } from 'mongoose'

const test2Schema = new Schema({
  phoneNumber: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

test2Schema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Test2', test2Schema)

export const schema = model.schema
export default model
