import mongoose, { Schema } from 'mongoose'

const fishSanctuariesSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  contributorName: {
    type: String,
    required: true
  },
  locationDetails: {
    name: {
      type: String,
      required: true
    },
    riverName: {
      type: String,
      required: true
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
      type: Number,
      validate: /^[-+]?[0-9]{1,7}(\.[0-9]+)?$/
    },
    longitude: {
      type: Number,
      validate: /^[-+]?[0-9]{1,7}(\.[0-9]+)?$/
    },
    extent: {
      type: String
    },
    sanctuaryPictures: [{
      imageURL: {
        type: String
      },
      description: {
        type: String,
        maxlength: 100
      }
    }]
  },
  habitatCharacteristics: {
    physicalInfrastructure: [{
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      }
    }],

    leftBankHabitat: {
      naturalVegetation: [{
        id: {
          type: String
        },
        name: {
          type: String
        },
        description: {
          type: String
        }
      }],
      naturalPhysicalFeatures: [{
        id: {
          type: String
        },
        name: {
          type: String
        },
        description: {
          type: String
        }
      }],
      manMadePhysicalFeatures: [{
        id: {
          type: String
        },
        name: {
          type: String
        },
        description: {
          type: String
        }
      }],
      bankErosion: {
        type: Boolean
      }
    },
    rightBankHabitat: {
      naturalVegetation: [{
        id: {
          type: String
        },
        name: {
          type: String
        },
        description: {
          type: String
        }
      }],
      naturalPhysicalFeatures: [{
        id: {
          type: String
        },
        name: {
          type: String
        },
        description: {
          type: String
        }
      }],
      manMadePhysicalFeatures: [{
        id: {
          type: String
        },
        name: {
          type: String
        },
        description: {
          type: String
        }
      }],
      bankErosion: {
        type: Boolean
      }
    }
  },
  managementActions: {
    foodProvisioning: {
      type: {
        type: Number,
        required: true
      },
      description: {
        type: String
      }
    },
    fishingAnglingAllowed: {
      type: {
        type: Number,
        required: true
      }
    },
    swimmingAllowed: {
      type: {
        type: Number,
        required: true
      }
    },
    patrollingAllowed: {
      type: {
        type: Number,
        required: true
      },
      description: {
        type: String
      }
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
  recognizeFish: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

fishSanctuariesSchema.methods = {
  view (full) {
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
        }
      },
      managementActions: {
        foodProvisioning: {
          type: this.managementActions.foodProvisioning.type,
          description: this.managementActions.foodProvisioning.description
        },
        fishingAnglingAllowed: {
          type: this.managementActions.fishingAnglingAllowed.type
        },
        swimmingAllowed: {
          type: this.managementActions.swimmingAllowed.type
        },
        patrollingAllowed: {
          type: this.managementActions.patrollingAllowed.type,
          description: this.managementActions.patrollingAllowed.description
        }
      },
      speciesPictures: this.speciesPictures,
      culturalHistoricalSignificance: this.culturalHistoricalSignificance,
      sanctuaryFiles: this.sanctuaryFiles,
      speciesFiles: this.speciesFiles,
      recognizeFish: this.recognizeFish,
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
