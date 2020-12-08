import { shallow } from 'enzyme';
import React from 'react';
import { getByAttr } from '../../test/testUtils';
import App from './App';

const setup = (props = {}) => {
    return shallow(<App {...props} />);
}

it('App component render test', () => {
    const wrapper = setup();
    const appComponent = getByAttr(wrapper, 'app-component');
    expect(appComponent.length).toBe(1);
});