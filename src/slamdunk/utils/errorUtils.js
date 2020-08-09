const error2Event = (error) =>{
    return {
        type: 'error',
        error: `${error}`
    }
}
export {
    error2Event
}