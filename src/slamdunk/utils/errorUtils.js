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

    let errorContext
    if (typeof errorEvent.error === 'object') {
      errorContext = getErrorProperties(errorEvent.error)
    }
    const context = merge({}, errorContext)

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

const getErrorProperties = (error) => {
  const properties = {}
  if (typeof error === 'object' && error !== null) {
    Object.keys(error).forEach(key => {
      if (key === 'stack') return
      let val = error[key]
      if (val === null) return // null is typeof object and well break the switch below
      switch (typeof val) {
        case 'function':
          return
        case 'object':
          // ignore all objects except Dates
          if (typeof val.toISOString !== 'function') return
          val = val.toISOString()
      }
      properties[key] = val
    })
  }
  return properties
}

export {
    error2Event
}