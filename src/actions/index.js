import actionTypes from '../actionTypes';
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiKey } from '../helpers';
/**
 * @function selectCity will add a city to selectedCity reducer
 * @param {object} city 
 * @returns {object}
 */
const selectCity = city => {
    return async(dispatch, getState) => {
        // use https because of security and sever testing
        let payload = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=${apiKey ? apiKey : process.env.API_KEY}`);
        
        dispatch({
            type: actionTypes.SET_CITY,
            payload
        });
    }
}

selectCity.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
}

const removeCity = city => {
    return {
        type: actionTypes.UNSET_CITY,
        payload: city
    }
}

removeCity.propTypes = {
    city: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })
}

export {
    selectCity,
    removeCity
};