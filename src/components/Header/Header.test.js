import React from 'react';
import {render} from '@testing-library/react';
import Header from './Header';
import { shallow } from 'enzyme';

describe("Header", () => {
    test('Header renders the Police Department title', () => {
        const propTitle = "Police Department - Mumbai", propSubtitle = "Bikes Stolen List";
        const { getByText } = render(<Header title={propTitle} subtitle={propSubtitle} />);
        const title = getByText(/Police Department/i);
        expect(title).toBeInTheDocument();
    });

    test('Header renders desired title and subtitle', () => {
        const propTitle = "NYPD", propSubtitle = "New York Police Department";
        const wrapper = shallow(<Header title={propTitle} subtitle={propSubtitle} /> );
        expect(wrapper.find('.Header-title').text()).toBe(propTitle);
        expect(wrapper.find('.Header-subtitle').text()).toBe(propSubtitle); 
    });
});