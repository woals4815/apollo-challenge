import { getByText, render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StatusBar } from '../status-bar';



describe('StatusBar', () => {
    it('renders status bar', () => {
        const { container} = render(
            <Router>
                <StatusBar />
            </Router>
        );
        expect(container.firstChild?.firstChild?.firstChild).toHaveAttribute("href", "/");
        expect(container.firstChild?.lastChild).toHaveClass(" text-3xl");
    })
})