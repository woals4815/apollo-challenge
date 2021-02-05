import { ApolloProvider } from '@apollo/client';
import { act, waitFor } from '@testing-library/react';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { render } from '../../test-utils';
import { LoggedOutRouter } from '../logged-out-router';

describe('LoggedOutRouter', () => {
    let mockedClient: MockApolloClient;
    beforeEach(async() => {
        await waitFor(async() => {
            mockedClient = createMockClient();
            await act(async() => await new Promise((resolve) => setTimeout(resolve, 0)));
        });
    })    
    it('render logged out router', async() => {
        const {debug} = render(
            <ApolloProvider client={mockedClient}>
                <LoggedOutRouter />
            </ApolloProvider>
        );
        await act(async() => await new Promise((resolve) => setTimeout(resolve, 0)));
    });
})