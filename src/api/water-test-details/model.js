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
    },
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
   surroundings:[]
},{
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
      generalInformation:{
        activityDate:this.generalInformation.activityDate,
        testerName:this.generalInformation.testerName,
        location:this.generalInformation.location,
        latitude:this.generalInformation.latitude,
        longitude:this.generalInformation.longitude,
      },
      waterLevelAndWeather:{
        airTemperature:this.waterLevelAndWeather.airTemperature,
        waterLevel:this.waterLevelAndWeather.waterLevel,
        weather:this.waterLevelAndWeather.weather,
      },
      surroundings:this.surroundings,
      waterTesting:{
        waterTemperature:this.waterTesting.waterTemperature,
        pH:this.waterTesting.pH,
        dissolvedOxygen:this.waterTesting.dissolvedOxygen,
        hardness:this.waterTesting.hardness,
        nitrate:this.waterTesting.nitrate,
        nitrite:this.waterTesting.nitrite,
        chlorine:this.waterTesting.chlorine,
        alkalinity:this.waterTesting.alkalinity,
        iron:this.waterTesting.iron,
        bacteria:this.waterTesting.bacteria,
        turbidity:this.waterTesting.turbidity,
      },
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
