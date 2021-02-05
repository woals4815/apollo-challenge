import { ApolloProvider } from '@apollo/client';
import {MockedProvider} from '@apollo/client/testing';
import { act, RenderResult, wait, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '../../test-utils';
import { Podcast, GET_EPISODES } from '../podcast';

const Result = {
  data: {
    getPodcast: {
      ok: true,
      error: 'null',
      podcast: {
        id: 1,
        title: 'test',
        category: 'test',
        createdAt: 'test',
        episodes: [{
          id: 1,
          title: 'test',
          category: 'test',
          createdAt: 'test'
        }]
      }
    },
    subscription: []
  }
};
    

describe("Podcast", () => {
    let renderResult: RenderResult;
    let mockedClient: MockApolloClient;
    beforeEach(async () => {
      await waitFor(() => {
        mockedClient = createMockClient();
        const handler = () => Promise.resolve(Result);
        mockedClient.setRequestHandler(GET_EPISODES, handler);
        //mockedClient.setRequestHandler(SUBSCRIPTION, handler);
        renderResult = render(
          <ApolloProvider client={mockedClient}>
            <Podcast />
          </ApolloProvider>
        );
      })
      await act(async() => await new Promise((resolve) => setTimeout(resolve, 0)));
    });
    it('render OK with params', async() => {
      await waitFor(() => {
        expect(document.title).toBe("test | Podcast");
      })
    });
    it('should see episode', async () => {
      await waitFor(() => {
        const {getAllByText, container} = renderResult;
        expect(container.firstChild?.firstChild?.nextSibling).toHaveClass('w-screen');
      });
    });
    /*it('should subscribe', async() => {
      const { getByRole } = renderResult
      const btn = getByRole('button');
      const mockedMutationResponse = jest.fn().mockResolvedValue({
        data: {
            toggleSubscribe: {
                ok: true,
                error: 'mutation-error',
            }
        }
      });
      await waitFor(() => {
        userEvent.click(btn);
      });
      //mockedClient.setRequestHandler(SUBSCRIPTION, mockQueryResponse);
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    });
    */
});

