import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { User } from '../user';

describe("User", () => {
    it('should render User', () => {
        const {container} = render(
            <Router>
                <User />
            </Router>
        )
        expect(container.firstChild).toHaveAttribute("href", "/user");
    })
})