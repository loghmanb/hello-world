import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import actionTypes from '../actionTypes';
import { removeCity } from '../actions';
import './Weather.css';
/**
 * countryflags.io api uses to show country flag
 */
class Weather extends Component {
    render() {
        const { selectedCities, removeCity } = this.props;
        return (
            <div className="container-fluid mt-3" data-test="weather-component">
                {
                    selectedCities && selectedCities.length ? 
                        <div data-test="weather-box" className="row weather-box">
                            {
                                selectedCities.map(city => {
                                    let { data } = city;
                                    let weather = data.weather && data.weather[0] ? data.weather[0] : false;
                                    let { sys, main } = data;
                                    return (
                                        <div key={city.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                            <div className="float-right mr-2 ml-2 mt-1 close-button" data-test="close-button" onClick={() => removeCity(city)}>
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </div>
                                            <div className="weather-box-inner container">
                                                {
                                                    weather ?
                                                        <Fragment>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    {sys && sys.country && <img src={`https://www.countryflags.io/${sys.country}/shiny/32.png`} />} {city.name}
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="img-64 float-left">
                                                                        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                                                                    </div>
                                                                    <div>
                                                                        <b>{ weather.main }</b>
                                                                    </div>
                                                                    <div>
                                                                        { weather.description }
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 container-fluid">
                                                                    <div className="row">
                                                                        <div className="col-6">Sunrise :</div>
                                                                        <div className="col-6">{new Date(sys.sunrise*1000).toLocaleTimeString()}</div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-6">Sunset :</div>
                                                                        <div className="col-6">{new Date(sys.sunset*1000).toLocaleTimeString()}</div>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="col-12 row weather-option-box">
                                                                <div className="col-12">Latest Weather Conditions</div>
                                                            </div>
                                                            <div className="col-12 row">
                                                                <div className="col-6 mb-1">Temperature :</div>
                                                                <div className="col-6 mb-1">{Math.round(main.temp)} &#8451;</div>
                                                                <div className="col-6 mb-1">Real Feel :</div>
                                                                <div className="col-6 mb-1">{Math.round(main.feels_like)} &#8451;</div>
                                                                <div className="col-6 mb-1">Min Temp. :</div>
                                                                <div className="col-6 mb-1">{Math.round(main.temp_min)} &#8451;</div>
                                                                <div className="col-6 mb-1">Max Temp. :</div>
                                                                <div className="col-6 mb-1">{Math.round(main.temp_max)} &#8451;</div>
                                                                <div className="col-6">humidity :</div>
                                                                <div className="col-6">{Math.round(main.humidity)} %</div>
                                                            </div>
                                                        </Fragment>
                                                        : ''
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    : ''
                }
            </div>
        )
    }
}

Weather.propTypes = {
    removeCity: PropTypes.func,
    selectedCities: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    const { selectedCities } = state;
    return { selectedCities };
}

export default connect(mapStateToProps,{ removeCity })(Weather);