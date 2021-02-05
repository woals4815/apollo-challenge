import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Podcast } from '../podcast';

describe('Podcast', () => {
    it('should render OK with props', () => {
        const podcastProps = {
            id: "1",
            title: "test",
            category: "test",
            createdAt: "test"
        };
        const {getAllByText, container} = render(
            <Router>
                <Podcast {...podcastProps} />
            </Router>
        )
        getAllByText('test');
        expect(container.firstChild?.firstChild).toHaveAttribute("href", `/podcasts/${podcastProps.id}`)
    });
});