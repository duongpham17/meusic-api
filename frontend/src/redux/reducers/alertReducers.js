import {
    ALERT_REMOVE, 
    ALERT_SET,
} from '../actions/types'

const initialState = [];

export const alert = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case ALERT_SET:
            return [...state, payload];
        case ALERT_REMOVE:
            return state.filter(i => i.id !== payload)

        default: 
            return state;
    }
}

export default alert;