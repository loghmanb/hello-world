import { combineReducers } from 'redux';
import actionTypes from '../actionTypes';
import { listOfCities } from '../helpers';

const citiesReducer = () => {
    return listOfCities;
}

/**
 * @function selectedCitiesReducer Create an array with selected cities to show weather box
 * @param {Array} state 
 * @param {Object} action
 * @returns {Array}
 */
const selectedCitiesReducer = (state = [], action) => {
    switch(action.type){
        case actionTypes.SET_CITY:
            let currentData = action.payload.data;
            let newState = {id: currentData.id, name: currentData.name, data: currentData};
            return [...state, newState];
        case actionTypes.UNSET_CITY:
            return state.filter(s => s.id !== action.payload.id);
        default:
            return state;
    }
}

export default combineReducers({
    selectedCities: selectedCitiesReducer,
    cities: citiesReducer
});