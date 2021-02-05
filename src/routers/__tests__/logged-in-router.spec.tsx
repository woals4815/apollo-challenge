import { ApolloProvider } from '@apollo/client';
import { act, waitFor } from '@testing-library/react';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Podcasts } from '../../pages/podcasts';
import { render } from '../../test-utils';
import { LoggedInRouter } from '../logged-in-router';

describe('LoggedInRouter', () => {
    let mockedClient: MockApolloClient;
    beforeEach(async () => {
        await waitFor(async() => {
            mockedClient = createMockClient();
            await act(async() => await new Promise((resolve) => setTimeout(resolve, 0)));
        });
    });
    it('should render all router', async() => {
        /*const result = render(
            <MemoryRouter initialEntries={['/']}>
                <ApolloProvider client={mockedClient}>
                    <LoggedInRouter />
                </ApolloProvider>  
            </MemoryRouter>,
        );*/
        const { debug, container } = render(
            <ApolloProvider client={mockedClient}>
                <LoggedInRouter />
            </ApolloProvider>
        );
        await act(async() => await new Promise((resolve) => setTimeout(resolve, 0)));
    })
})