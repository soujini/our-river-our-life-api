import mongoose, { Schema } from 'mongoose'

const waterTestDetailsSchema = new Schema({
  phoneNumber: {
    type: String
  },
  generalInformation:{
    activityDate: {
      type: String
    },
    testerName: {
      type: String
    },
    location: {
      type: String
    },
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  waterLevelAndWeather:{
    airTemperature: {
      type: Number
    },
    waterLevel: {
      type: String
    },
    weather: {
      type: String
    },
  },
  surroundings:{[]},
  waterTesting:{
    waterTemperature: {
      type: String
    },
    pH: {
      type: String
    },
    dissolvedOxygen: {
      type: String
    },
    hardness: {
      type: String
    },
    nitrate: {
      type: String
    },
    nitrite: {
      type: String
    },
    chlorine: {
      type: String
    },
    alkalinity: {
      type: String
    },
    iron: {
      type: String
    },
    bacteria: {
      type: String
    },
    turbidity: {
      type: String
    },
  },
  {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

waterTestDetailsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      phoneNumber: this.phoneNumber,
      generalInformation:this.generalInformation,
      waterLevelAndWeather:this.waterLevelAndWeather,
      waterTesting:this.waterTesting,
      surroundings:this.surroundings,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('WaterTestDetails', waterTestDetailsSchema)

export const schema = model.schema
export default model
