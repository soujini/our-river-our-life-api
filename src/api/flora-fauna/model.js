import mongoose, { Schema } from 'mongoose'

const floraFaunaSchema = new Schema({
  userId: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  location: {
    type: String
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
    type: String
  },
  localName: {
    type: String
  },
  scientificName: {
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
      userId:this.userId,
      latitude: this.latitude,
      longitude: this.longitude,
      location: this.location,
      flora: this.flora,
      fauna: this.fauna,
      commonName: this.commonName,
      localName: this.localName,
      scientificName: this.scientificName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
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
