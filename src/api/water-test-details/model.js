import mongoose, { Schema } from 'mongoose'

const waterTestDetailsSchema = new Schema({
  userId: {
    type: String
  },
  contributorName: {
    type: String
  },
  generalInformation: {
    activityDate: {
      type: String
    },
    activityTime: {
      type: String
    },
    testerName: {
      type: String
    },
    location: {
      type: String
    },
    latitude: {
      type: String
    },
    longitude: {
      type: String,
      default: ''
    }
  },
  waterLevelAndWeather: {
    airTemperature: {
      type: String,
      default: ''
    },

    waterLevel: {
      type: String
    },
    weather: {
      type: String
    }
  },
  waterTesting: {
    waterTemperature: {
      type: String,
      default: ''
    },
    pH: {
      type: String,
      default: ''
    },
    dissolvedOxygen: {
      type: String,
      default: ''
    },
    hardness: {
      type: String,
      default: ''
    },
    nitrate: {
      type: String,
      default: ''
    },
    nitrite: {
      type: String,
      default: ''
    },
    chlorine: {
      type: String,
      default: ''
    },
    alkalinity: {
      type: String,
      default: ''
    },
    iron: {
      type: String,
      default: ''
    },
    bacteria: {
      type: String
    },
    turbidity: {
      type: String,
      default: ''
    },
    phosphate: {
      type: String,
      default: ''
    },
    ammonia: {
      type: String,
      default: ''
    },
    lead: {
      type: String,
      default: ''
    },
    totalDissolvedSolids: {
      type: String,
      default: ''
    },
    conductivity: {
      type: String,
      default: ''
    }
  },
  surroundings: {
    type: Array
  },
  floraPictures: [{
    imageURL: {
      type: String
    },
    description: {
      type: String
    }
  }],
  faunaPictures: [{
    imageURL: {
      type: String
    },
    description: {
      type: String
    }
  }],
  artworkPictures: [{
    imageURL: {
      type: String
    },
    description: {
      type: String
    }
  }],
  groupPictures: [{
    imageURL: {
      type: String
    },
    description: {
      type: String
    }
  }],
  activityPictures: [{
    imageURL: {
      type: String
    },
    description: {
      type: String
    }
  }],
  riverPictures: [{
    imageURL: {
      type: String
    },
    description: {
      type: String
    }
  }],
  surroundingPictures: [{
    imageURL: {
      type: String
    },
    description: {
      type: String
    }
  }],
  floraFiles: {
    type: Array
  },
  faunaFiles: {
    type: Array
  },
  artworkFiles: {
    type: Array
  },
  groupFiles: {
    type: Array
  },
  activityFiles: {
    type: Array
  },
  riverFiles: {
    type: Array
  },
  surroundingFiles: {
    type: Array
  },
  certificateURL: {
    type: String
  }

}, {
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
      userId: this.userId,
      contributorName: this.contributorName,
      generalInformation: {
        activityDate: this.generalInformation.activityDate,
        activityTime: this.generalInformation.activityTime,
        testerName: this.generalInformation.testerName,
        location: this.generalInformation.location,
        latitude: this.generalInformation.latitude,
        longitude: this.generalInformation.longitude
      },
      waterLevelAndWeather: {
        airTemperature: this.waterLevelAndWeather.airTemperature,
        waterLevel: this.waterLevelAndWeather.waterLevel,
        weather: this.waterLevelAndWeather.weather
      },
      surroundings: this.surroundings,
      waterTesting: {
        waterTemperature: this.waterTesting.waterTemperature,
        pH: this.waterTesting.pH,
        dissolvedOxygen: this.waterTesting.dissolvedOxygen,
        hardness: this.waterTesting.hardness,
        nitrate: this.waterTesting.nitrate,
        nitrite: this.waterTesting.nitrite,
        chlorine: this.waterTesting.chlorine,
        alkalinity: this.waterTesting.alkalinity,
        iron: this.waterTesting.iron,
        bacteria: this.waterTesting.bacteria,
        turbidity: this.waterTesting.turbidity,
        phosphate: this.waterTesting.phosphate,
        ammonia: this.waterTesting.ammonia,
        lead: this.waterTesting.lead,
        totalDissolvedSolids: this.waterTesting.totalDissolvedSolids,
        conductivity: this.waterTesting.conductivity
      },
      floraPictures: this.floraPictures,
      faunaPictures: this.faunaPictures,
      artworkPictures: this.artworkPictures,
      groupPictures: this.groupPictures,
      activityPictures: this.activityPictures,
      riverPictures: this.riverPictures,
      surroundingPictures: this.surroundingPictures,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      certificateURL: this.certificateURL
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
