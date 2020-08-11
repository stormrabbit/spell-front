import {
    generateRandomId,
    merge
} from './commonUtils'; 
const error2Event = (messageOrError) =>{
    const errorEvent = {}
    if (typeof messageOrError === 'string') {
      errorEvent.message = messageOrError;
    } else {
      errorEvent.error = messageOrError;
    }
    return logErrorEvent(errorEvent)
    // return {
    //     type: 'error',
    //     error: `${error}`
    // }
}
const logErrorEvent = (errorEvent) => {
    // eslint-disable-next-line no-console
    console.error('error event:', errorEvent);
    const errorObject = createErrorDataModel(errorEvent);
    return errorObject;
}
const createErrorDataModel = (errorEvent) => {
    
    const message = errorEvent.message || (errorEvent.error && errorEvent.error.message)
    let errorType = errorEvent.error ? errorEvent.error.name : undefined
    if (!errorType) {
      if (message && message.indexOf(':') > -1) {
        errorType = message.split(':')[0]
      } else {
        errorType = ''
      }
    }

    const configContext = this._configService.get('context')
    let errorContext
    if (typeof errorEvent.error === 'object') {
      errorContext = this._getErrorProperties(errorEvent.error)
    }
    const context = merge({}, configContext, errorContext)

    const errorObject = {
      id: generateRandomId(16),
      type: 'error',
      sub_type: errorType,
      start: window.performance.now(),
      message,
      context,
    }

    
    return errorObject
  }
export {
    error2Event
}