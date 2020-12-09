import rootReducer from '.';

describe('selectedCities', () => {
    it('return `[]` when no action exists', () => {
        let newState = rootReducer(undefined, {}).selectedCities;
        expect(newState).toEqual([]);
    });
});