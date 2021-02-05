import { ApolloProvider } from '@apollo/client';
import { MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { render } from '../../test-utils';
import { LoggedInRouter } from '../logged-in-router';

describe('LoggedInRouter', () => {
    let mockedClient: MockApolloClient;
    it('should render all router', async() => {
        const {container} = render(
            <ApolloProvider client={mockedClient}>
                <LoggedInRouter />
            </ApolloProvider>
        );
        console.log(container);
    })
})