import { selectCity, updateCity } from './';
import actionTypes from '../actionTypes';
import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { cityData } from '../helpers';

describe('selectCity action creator', () => {
    beforeEach(() => {
        moxios.install(); // install moxios before each test
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: cityData
            });
        });
    });
    afterEach(() => {
        moxios.uninstall(); // uninstall moxios after each test
    });
    it('send current city id ( and name ) and add data variable with weather data to current city', () => {
        let store = storeFactory();
        return store.dispatch(selectCity({id: 6942553, name: 'Paris'})).then(() => {
            const newState = store.getState();
            expect(newState.selectedCities).toStrictEqual([{id: 6942553, name: 'Paris', data: cityData}]);
        });
    });
});