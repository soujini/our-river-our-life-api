import logger from '../../logger'
import { HttpStatus } from '../../utils/custom-api-errors'

/**
* Handle errors and create custom api error message
* @param {Object} name - error
* @returns Promise
*/
export const errorHandler = (error, res) => {
  const errorHandleResponse = {
    error: []
  }

  return new Promise((resolve, reject) => {
    if (error.name === 'Invalid id') {
      const errorObj = {
        status: HttpStatus.BAD_REQUEST,
        code: 40001,
        fieldName: 'id',
        message: 'Id is not a valid mongoDB Id'
      }
      logger.error('errorHandler: ' + JSON.stringify(errorObj))
      errorHandleResponse.error.push(errorObj)
      resolve(errorHandleResponse)
    } else if (error.name === 'Id does not exist') {
      const errorObj = {
        status: HttpStatus.NOT_FOUND,
        code: 40001,
        fieldName: 'id',
        message: 'Id does not exist in the database'
      }
      logger.error('errorHandler: ' + JSON.stringify(errorObj))
      errorHandleResponse.error.push(errorObj)
      resolve(errorHandleResponse)
    } else if (error.name === 'MongoError') { // 400 Invalid Input/Bad request
      if (error.code === 11000) { // Duplicate Key
        const errorObj = {
          status: HttpStatus.BAD_REQUEST,
          code: error.code,
          fieldName: 'name',
          message: 'A record with this name already exists'
        }
        errorHandleResponse.error.push(errorObj)
        logger.error('errorHandler: ' + JSON.stringify(errorObj))
        resolve(errorHandleResponse)
      }
    } else if (error.name === 'ValidationError') {
      Object.keys(error.errors).forEach((key) => {
        const errorType = error.errors[key].kind // minlength, required, maxlength
        const errorObj = {
          status: HttpStatus.BAD_REQUEST,
          code: 40001,
          fieldName: error.errors[key].path,
          message: error.errors[key].message,
          type: error.errors[key].kind
        }
        logger.error('errorHandler: ' + JSON.stringify(errorObj))
        errorHandleResponse.error.push(errorObj)
      })
      resolve(errorHandleResponse)
    } else {
      const errorObj = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        code: error.code,
        fieldName: '',
        message: 'Oops! Something went wrong!'
      }
      logger.error('errorHandler: ' + JSON.stringify(errorObj))
      errorHandleResponse.error.push(errorObj)
      resolve(errorHandleResponse)
    }
  })
}
