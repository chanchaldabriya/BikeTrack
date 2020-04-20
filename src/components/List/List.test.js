import React from 'react';
import {render} from '@testing-library/react';
import List from './List';

describe("List", () => {
    test('List shows Loading when loading prop is set', () => {
        const { getByText } = render(<List loading />);
        const loading = getByText(/Loading/i);
        expect(loading).toBeInTheDocument();
    });

    test('List shows error text when error prop is set', () => {
        const { getByText } = render(<List error />);
        const error = getByText("Oops, something went wrong");
        expect(error).toBeInTheDocument();
    });

    test('List shows empty text when no records are passed', () => {
        const { getByText } = render(<List reocrds={[]} />);
        const empty = getByText("No results");
        expect(empty).toBeInTheDocument();
    });
});