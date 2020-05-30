import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    unique:true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

userSchema.methods = {
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

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
