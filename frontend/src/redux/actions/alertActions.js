import {
    ALERT_SET,
    ALERT_REMOVE
} from './types';
import {generateid} from 'utils/generateid';

export const setAlert = (message, alertType, timeout = 2000) => async dispatch => {
    const id = generateid();

    dispatch({
        type: ALERT_SET,
        payload: {message, alertType, id}
    })
    setTimeout(() => 
        dispatch({
            type: ALERT_REMOVE,
            payload: id
        })
    , timeout);
};