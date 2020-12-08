import { shallow } from 'enzyme';
import React from 'react';
import { getByAttr, checkPropType, storeFactory } from '../../test/testUtils';

import City from './City';

const setup = (initialState = {}, internalState) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<City store={store} />).dive().dive();
    if(internalState) wrapper.setState(internalState);
    return wrapper;
}

it('City component render test', () => {
    const wrapper = setup();
    const component = getByAttr(wrapper, 'city-component');
    expect(component.length).toBe(1);
});

describe('render select city', () => {
    const wrapper = setup();
    const selectCityInput = getByAttr(wrapper, 'select-city-input');
    it('render select city Input', () => {
        expect(selectCityInput.length).toBe(1);
    })
    describe('citySearch state test', () => {
        it('`citySearch` is empty when City component loaded', () => {
            const internalState = wrapper.state('citySearch');
            expect(internalState).toBe('');
        })
        it('update `citySearch` state on change select city input', () => {
            selectCityInput.simulate('change', {target: {value: 'test'}});
            const citySearch = wrapper.state('citySearch');
            expect(citySearch).toBe('test');
        })
    })
})

describe('render city box', () => {
    it('`isFocus` is `false` when City component loaded', () => {
        const wrapper = setup();
        const internalState = wrapper.state('isFocus');
        expect(internalState).toBe(false);
    })
    it('do not render city box when `isFocus` state is `false`', () => {
        const wrapper = setup(null, {isFocus: false});
        const cityBox = getByAttr(wrapper, 'city-box');
        expect(cityBox.length).toBe(0);
    })
    it('render city box when `isFocus` state is `true`', () => {
        const wrapper = setup(null, {isFocus: true});
        const cityBox = getByAttr(wrapper, 'city-box');
        expect(cityBox.length).toBe(1);
    })
})

it('Check selectCity prop to be function', () => {
    const state = { selectedCities: [] };
    const wrapper = setup(state);
    checkPropType(wrapper, 'selectCity');
});