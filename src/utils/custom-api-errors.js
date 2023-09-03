// /*===============================================================================*/
// /*********************************************************************************/
// /**
//  * @fileOverview Provides basic error framework for backend services with basic
//  * error codes, which can be extended to define custom error codes.
//  * @author Soujanya Venkatesh, hello@jackfruitsolutions.com
//  * @copyright Copyright (c) 2018 Elear Solutions Tech Private Limited. All rights
//  * reserved.
//  * @license To any person (the "Recipient") obtaining a copy of this software and
//  * associated documentation files (the "Software"):
//  *
//  * All information contained in or disclosed by this software is confidential
//  * and proprietary information of Elear Solutions Tech Private Limited and all
//  * rights therein are expressly reserved. By accepting this material the
//  * recipient agrees that this material and the information contained therein is
//  * held in confidence and in trust and will NOT be used, copied, modified,
//  * merged, published, distributed, sublicensed, reproduced in whole or in part,
//  * nor its contents revealed in any manner to others without the express
//  * written permission of Elear Solutions Tech Private Limited.
//  */
// /*********************************************************************************/
// /*===============================================================================*/
// import { error } from '../config/common-config';
// import { SEARCH_TEXT_MIN_LENGTH } from './constants';

// // Export CustomApiError and HttpStatus
// export const CustomApiError = error.CustomApiError;
// export const HttpStatus = error.HttpStatus;

// /** List of Custom API ErrorCodes */
// export const CustomErrorCodes = {

//   // HTTP Status 400 - BAD_REQUEST
//   "USER_ALREADY_EXISTS": {
//     "httpstatus": HttpStatus.BAD_REQUEST,
//     "code": 40006,
//     "message": "That account is taken. Try another."
//   },
//   "PASSWORD_CRITERIA_FAILED": {
//     "httpstatus": HttpStatus.BAD_REQUEST,
//     "code": 40007,
//     "message": "Choose a stronger password. Mix it up a bit"
//   },
//   "USER_DOES_NOT_EXIST": {
//     "httpstatus": HttpStatus.BAD_REQUEST,
//     "code": 40008,
//     "message": error.READABLE_NAME_TEMPLATE + " does not exist"
//   },
//   "AUTHORIZATION_IN_PROGRESS": {
//     "httpstatus": HttpStatus.BAD_REQUEST,
//     "code": 40009,
//     "message": "Authorization already in progress"
//   },
//   "INVALID_SEARCH_TEXT": {
//     "httpstatus": HttpStatus.BAD_REQUEST,
//     "code": 40010,
//     "message": "Provide at least " + SEARCH_TEXT_MIN_LENGTH +
//       " characters to search"
//   },
//   "USER_NOT_ALLOWED_DELETE": {
//     "httpstatus": HttpStatus.BAD_REQUEST,
//     "code": 40011,
//     "message": "User of operator role is not allowed to delete"
//   },

//   // HTTP status 401
//   "COCO_USER_DOES_NOT_EXIST": {
//     "httpstatus": HttpStatus.UNAUTHORIZED,
//     "code": 40106,
//     "message": "Couldn't find your COCO account"
//   },
//   "WRONG_PASSWORD": {
//     "httpstatus": HttpStatus.UNAUTHORIZED,
//     "code": 40107,
//     "message": "Invalid Password. Click Forgot Password to reset it"
//   },

//   // HTTP Status 403 - FORBIDDEN
//   "ACCOUNT_LOCKED": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40302,
//     "message": "Account locked, too many incorrect attempts."
//       + " Click Forgot Password to reset it.",
//   },
//   "RECOVERY_LIMIT_REACHED": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40303,
//     "message": "Max attempts reached, password recovery failed"
//   },
//   "OTP_LIMIT_REACHED": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40304,
//     "message": "Max attempts reached, resend OTP failed",
//   },
//   "INVALID_TOKEN": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40305,
//     "message": "Session timeout, please retry"
//   },
//   "ACTIVATION_LIMIT_REACHED": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40306,
//     "message": "Authentication failed, activation email limit reached"
//   },
//   "INVALID_ACTIVATION_LINK": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40307,
//     "message": "Invalid activation link"
//   },
//   "INVALID_RECOVERY_LINK": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40308,
//     "message": "Invalid recovery link"
//   },
//   "INVALID_STATE": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40309,
//     "message": "Operation not permitted"
//   },
//   "STRIPE_INVALID_PAYMENT_METHOD": {
//     "httpstatus": HttpStatus.FORBIDDEN,
//     "code": 40310,
//     "message": "The payment method provided is not attached to your account."
//   },
//   "DUPLICATE_VIDEO_STORAGE_PLAN": {
//     "httpstatus": HttpStatus.BAD_REQUEST,
//     "code": 40011,
//     "message": "Video storage plan name should be unique"
//   },
//   "VIDEO_STORAGE_PLAN_DOES_NOT_EXIST": {
//     "httpstatus": HttpStatus.NOT_FOUND,
//     "code": 40403,
//     "message": error.READABLE_NAME_TEMPLATE + " does not exist for operator"
//   },
// };

// // Export ErrorCodes
// export const ErrorCodes = error.ErrorCodes(CustomErrorCodes);

/** List of Http Status Codes */
export const HttpStatus = {
  // HttpStatus for Success
  OK: 200,
  PARTIAL_CONTENT: 206,

  // HttpStatus for Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,

  // HttpStatus for Server Error
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

/** List of Custom API ErrorCodes */
const ErrorCodes = {
  // HTTP Status 400 - BAD_REQUEST
  BAD_REQUEST: {
    httpstatus: HttpStatus.BAD_REQUEST,
    code: 40000,
    message: 'Bad request'
  },

  // "MISSING_PARAM": {
  //   "httpstatus": HttpStatus.BAD_REQUEST,
  //   "code": 40001,
  //   "message": READABLE_NAME_TEMPLATE + " is missing"
  // },

  // "MISSING_ARRAY": {
  //   "httpstatus": HttpStatus.BAD_REQUEST,
  //   "code": 40001,
  //   "message": READABLE_NAME_TEMPLATE + " are missing"
  // },

  // "INVALID_INPUT": {
  //   "httpstatus": HttpStatus.BAD_REQUEST,
  //   "code": 40002,
  //   "message": READABLE_NAME_TEMPLATE + " is invalid"
  // },

  // "INVALID_ARRAY": {
  //   "httpstatus": HttpStatus.BAD_REQUEST,
  //   "code": 40002,
  //   "message": READABLE_NAME_TEMPLATE + " are invalid"
  // },

  // "INVALID_RANGE": {
  //   "httpstatus": HttpStatus.BAD_REQUEST,
  //   "code": 40003,
  //   "message": READABLE_NAME_TEMPLATE + " is not in valid range"
  // },

  DUPLICATE_DATA: {
    httpstatus: HttpStatus.BAD_REQUEST,
    code: 40004,
    message: 'This ${readableName} is already taken'
  },

  // HTTP Status 401 - UNAUTHORIZED
  AUTH_REQUIRED: {
    httpstatus: HttpStatus.UNAUTHORIZED,
    code: 40101,
    message: 'Authentication required'
  },
  SESSION_EXPIRED: {
    httpstatus: HttpStatus.UNAUTHORIZED,
    code: 40102,
    message: 'Session expired'
  },
  INVALID_CREDENTIALS: {
    httpstatus: HttpStatus.UNAUTHORIZED,
    code: 40103,
    message: 'Invalid credentials'
  },

  // HTTP Status 403 - FORBIDDEN
  ACCESS_RESTRICTED: {
    httpstatus: HttpStatus.FORBIDDEN,
    code: 40301,
    message: 'Operation not permitted'
  },

  // HTTP Status 404 - NOT_FOUND
  NOT_FOUND: {
    httpstatus: HttpStatus.NOT_FOUND,
    code: 40401,
    message: 'API not found'
  },
  FILE_NOT_FOUND: {
    httpstatus: HttpStatus.NOT_FOUND,
    code: 40402,
    message: 'File not found'
  },
  RESOURCE_NOT_FOUND: {
    httpstatus: HttpStatus.NOT_FOUND,
    code: 40403,
    message: 'Resource not found'
  },
  // "INPUT_RESOURCE_NOT_FOUND": {
  //   "httpstatus": HttpStatus.NOT_FOUND,
  //   "code": 40403,
  //   "message": READABLE_NAME_TEMPLATE + " not found"
  // },

  // HTTP Status 500 - INTERNAL_SERVER_ERROR
  INTERNAL_SERVER_ERROR: {
    httpstatus: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 50001,
    message: 'Internal server error'
  },

  // HTTP Status 500 - PAYMENT_FAILED
  // TODO: revisit the payment related error codes
  PAYMENT_FAILED: {
    httpstatus: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 50002,
    message: 'Payment failed'
  },

  // HTTP Status 503 - SERVICE_UNAVAILABLE
  DATABASE_ERROR: {
    httpstatus: HttpStatus.SERVICE_UNAVAILABLE,
    code: 50301,
    message: 'Database temporarily unavailable'
  },
  SERVER_ERROR: {
    httpstatus: HttpStatus.SERVICE_UNAVAILABLE,
    code: 50302,
    message: 'Server is temporarily unavailable'
  },

  // HTTP status 504 - request timed out
  REQUEST_TIMEOUT: {
    httpstatus: HttpStatus.GATEWAY_TIMEOUT,
    code: 50401,
    message: 'Your command was successfully sent, but it timed out waiting' +
      ' for a response.'
  }
}
