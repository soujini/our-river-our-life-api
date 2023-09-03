import mongoose, { Schema } from 'mongoose'

const floodAlertSchema = new Schema({
  location: {
    type: String
  },
  latitude: {
    type: String,
    required: true,
    validate: /^[-+]?[0-9]{1,7}(\.[0-9]+)?$/
  },
  longitude: {
    type: String,
    required: true,
    validate: /^[-+]?[0-9]{1,7}(\.[0-9]+)?$/
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  photos: {
    type: Array
  },
  experience: {
    type: String,
    required: false,
    maxlength: 400
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

floodAlertSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude,
      date: this.date,
      time: this.time,
      photos: this.photos,
      experience: this.experience,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('FloodAlert', floodAlertSchema)

export const schema = model.schema
export default model
