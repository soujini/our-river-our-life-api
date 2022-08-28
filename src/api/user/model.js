import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    // unique:true,
    sparse: true
  },
  email: {
    type: String,
    // unique:true,
    sparse: true
  },
  firstName: {
    type: String,
    // unique:true,
    sparse: true
  },
  lastName: {
    type: String,
    // unique:true,
    sparse: true
  },
  avatarURL: {
    type: Array,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

userSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      phoneNumber: this.phoneNumber,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarURL: this.avatarURL,
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
