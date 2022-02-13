import mongoose, { Schema } from 'mongoose'

const fishSanctuariesSchema = new Schema({
  userId: {
    type: String
  },
  contributorName: {
    type: String
  },
  locationDetails: {
    name: {
      type: String
    },
    riverName: {
      type: String
    },
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
    extent: {
      type: String
    },
    sanctuaryPictures: [{
      imageURL: {
        type: String
      },
      description: {
        type: String
      }
    }],
  },
  habitatCharacteristics: {
    physicalInfrastructure: [{
      id: {
        type: String
      },
      // name: {
      //   type: String
      // },
      description: {
        type: String
      }
    }],

    leftBankHabitat: {
      naturalVegetation: {
        type: Array
      },
      naturalPhysicalFeatures: {
        type: Array
      },
      manMadePhysicalFeatures: {
        type: Array
      },
      bankErosion: {
        type: Boolean
      }
    },
    rightBankHabitat: {
      naturalVegetation: {
        type: Array
      },
      naturalPhysicalFeatures: {
        type: Array
      },
      manMadePhysicalFeatures: {
        type: Array
      },
      bankErosion: {
        type: Boolean
      }
    }
  },
  managementActions: {
    foodProvisioning: {
      type: {
        type: Number
      },
      description: {
        type: String
      },
    },
    fishingAnglingAllowed: {
      type: Number
    },
    swimmingAllowed: {
      type: Number
    },
    patrollingAllowed: {
      type: {
        type: Number
      },
      description: {
        type: String
      },
    }
  },
  speciesPictures: [{
    imageURL: {
      type: String
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
  }],
  culturalHistoricalSignificance: {
    type: String
  },
  sanctuaryFiles: {
    type: Array
  },
  speciesFiles: {
    type: Array
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

fishSanctuariesSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId,
      contributorName: this.contributorName,
      locationDetails: {
        name: this.locationDetails.name,
        riverName: this.locationDetails.riverName,
        activityDate: this.locationDetails.activityDate,
        testerName: this.locationDetails.testerName,
        location: this.locationDetails.location,
        latitude: this.locationDetails.latitude,
        longitude: this.locationDetails.longitude,
        extent: this.locationDetails.extent,
        sanctuaryPictures: this.locationDetails.sanctuaryPictures
      },
      habitatCharacteristics: {
        physicalInfrastructure: this.habitatCharacteristics.physicalInfrastructure,
        leftBankHabitat: {
          naturalVegetation: this.habitatCharacteristics.leftBankHabitat.naturalVegetation,
          naturalPhysicalFeatures: this.habitatCharacteristics.leftBankHabitat.naturalPhysicalFeatures,
          manMadePhysicalFeatures: this.habitatCharacteristics.leftBankHabitat.manMadePhysicalFeatures,
          bankErosion: this.habitatCharacteristics.leftBankHabitat.bankErosion
        },
        rightBankHabitat: {
          naturalVegetation: this.habitatCharacteristics.rightBankHabitat.naturalVegetation,
          naturalPhysicalFeatures: this.habitatCharacteristics.rightBankHabitat.naturalPhysicalFeatures,
          manMadePhysicalFeatures: this.habitatCharacteristics.rightBankHabitat.manMadePhysicalFeatures,
          bankErosion: this.habitatCharacteristics.rightBankHabitat.bankErosion
        },
      },
      managementActions: {
        foodProvisioning: {
          type: this.managementActions.foodProvisioning.type,
          description: this.managementActions.foodProvisioning.description
        },
        fishingAnglingAllowed: this.managementActions.fishingAnglingAllowed,
        swimmingAllowed: this.managementActions.fishingAnglingAllowed,
        patrollingAllowed: {
          type: this.managementActions.patrollingAllowed.type,
          description: this.managementActions.patrollingAllowed.description
        }
      },
      speciesPictures: this.speciesPictures,
      culturalHistoricalSignificance: this.culturalHistoricalSignificance,
      sanctuaryFiles: this.sanctuaryFiles,
      speciesFiles: this.speciesFiles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('FishSanctuaries', fishSanctuariesSchema)

export const schema = model.schema
export default model
