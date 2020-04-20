import React from 'react';
import {render} from '@testing-library/react';
import Pagination from './Pagination';
import { shallow } from 'enzyme';

describe("Pagination", () => {
    test('Pagination shows Loading when loading prop is set', () => {
        const { getByText } = render(<Pagination loading />);
        const loading = getByText(/Loading/i);
        expect(loading).toBeInTheDocument();
    });

    test('Pagination shows only one disabled page-item when the list is empty and no-loading & no-error', () => {
        const wrapper = shallow(<Pagination records={0} />);
        expect(wrapper.find('.Pagination-item').length).toBe(1);
        expect(wrapper.find('.Pagination-item[disabled]').length).toBe(1);
    });

    test('Pagination shows error text when error prop is set', () => {
        const { getByText } = render(<Pagination error />);
        const error = getByText("Couldn't load pages due to some error");
        expect(error).toBeInTheDocument();
    });

    test('Pagination renders correct number of pages', () => {
        const wrapper = shallow(<Pagination records={32} perPage={10} />);

        // should render 1,2,3,4 & Next, Prev, First, Last buttons. 
        expect(wrapper.find('.Pagination-item').length).toBe(8);
    });

    test('Pagination renders correct number of pages with custom perPage count', () => {
        const wrapper = shallow(<Pagination records={32} perPage={16} />);

        // should render 1,2 & Next, Prev, First, Last buttons. 
        expect(wrapper.find('.Pagination-item').length).toBe(6);
    });
});