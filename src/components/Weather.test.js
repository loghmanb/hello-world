import { shallow } from 'enzyme';
import React from 'react';
import { getByAttr, storeFactory } from '../../test/testUtils';
import { selectCity, removeCity } from '../actions';
import moxios from 'moxios';
import { cityData } from '../helpers';

import Weather from './Weather';

const setup = (store = {}) => {
    const wrapper = shallow(<Weather store={store} />).dive().dive();
    return wrapper;
}

it('Weather component render test', () => {
    const state = { selectedCities: [] };
    let store = storeFactory(state);
    const wrapper = setup(store);
    const component = getByAttr(wrapper, 'weather-component');
    expect(component.length).toBe(1);
});

describe('Async Test with moxios', () => {
    beforeEach(() => {
        moxios.install();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: cityData
            });
        });
    })
    afterEach(() => {
        moxios.uninstall();
    })
    it('Check open weather-box when a test city is selected', () => {
        const state = { selectedCities: [] };
        let store = storeFactory(state);
        return store.dispatch(selectCity({id: 6942553, name: 'Paris'})).then(() => {
            const wrapper = setup(store);
            const weatherBox = getByAttr(wrapper, 'weather-box');
            expect(weatherBox.length).toBe(1);
        });
    });
    
    it('Check `selectedCities` prop type to be array', () => {
        const state = { selectedCities: [] };
        let store = storeFactory(state);
        return store.dispatch(selectCity({id: 6942553, name: 'Paris'})).then(() => {
            const weatherStore = store.getState();
            expect(weatherStore.selectedCities).toStrictEqual([{id: 6942553, name: 'Paris', data: cityData}]);
        });
    });

    it('Check remove from selectedCities data when click on close button', () => {
        const state = { selectedCities: [] };
        let store = storeFactory(state);
        return store.dispatch(selectCity({id: 6942553, name: 'Paris'})).then(() => {
            const wrapper = setup(store);
            const closeButton = getByAttr(wrapper, 'close-button');
            closeButton.simulate('click');
            const weatherStore = store.getState();
            expect(weatherStore.selectedCities).toEqual([]);
        });
    });
});