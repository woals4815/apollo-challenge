import { ApolloProvider } from '@apollo/client';
import { RenderResult, waitFor } from '@testing-library/react';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '../../test-utils';
import {ALL_PODCASTS_QUERY, Podcasts} from '../podcasts';
const result = {
    data: {
        getAllPodcasts: {
            ok: true,
            error: 'error',
            podcasts: [{
                id: 1,
                title: 'test',
                category: 'test',
                createdAt: 'test'
            }]
        }
    }
};

describe('Podcasts', () => {
    let renderResult: RenderResult;
    let mockedClient: MockApolloClient;
    beforeEach(async() => {
        await waitFor(() => {
            mockedClient = createMockClient();
            const handler = () => Promise.resolve(result);
            mockedClient.setRequestHandler(ALL_PODCASTS_QUERY, handler);
            const {debug} = render(
                <Router>
                    <ApolloProvider client={mockedClient}>
                        <Podcasts />
                    </ApolloProvider>
                </Router>
            )
            debug();
        })
    });
    it('should render ok', async() => {
        await waitFor(() => {
            expect(document.title).toBe('');
        })
    });
})