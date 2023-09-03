import mongoose, { Schema } from 'mongoose'

const floraFaunaSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  // username: {
  //   type: String
  // },
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
  location: {
    type: String,
    required: true
  },
  flora: {
    type: Array,
    timestamps: true
  },
  fauna: {
    type: Array,
    timestamps: true
  },
  commonName: {
    type: String,
    required: true
  },
  localName: {
    type: String,
    required: true
  },
  scientificName: {
    type: String,
    required: true
  },
  contributorName: {
    type: String
  }

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

floraFaunaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId,
      // username:this.username,
      latitude: this.latitude,
      longitude: this.longitude,
      location: this.location,
      flora: this.flora,
      fauna: this.fauna,
      commonName: this.commonName,
      localName: this.localName,
      scientificName: this.scientificName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      contributorName: this.contributorName
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('FloraFauna', floraFaunaSchema)

export const schema = model.schema
export default model
