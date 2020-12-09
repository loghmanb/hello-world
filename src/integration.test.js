import { storeFactory } from '../test/testUtils';
import { selectCity } from './redux/actions';
import moxios from 'moxios';
import { cityData } from './helpers';

describe('selectCity action dispatch', () => {
    beforeEach(() => {
        moxios.install();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: cityData
            })
        })
    })
    it('no city selected yet', () => {
        const initialState = { selectedCities: [] };
        let store = storeFactory(initialState);
        return store.dispatch(selectCity({id: 6942553, name: 'Paris'})).then(() => {
            const newState = store.getState();
            expect(newState.selectedCities).toStrictEqual([{id: 6942553, name: 'Paris', data: cityData}]);
        });
    });
});