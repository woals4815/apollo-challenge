import { ApolloProvider } from '@apollo/client';
import { act, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '../../test-utils';
import { Login } from '../login';
import {LOGIN_MUTATION} from '../login';

describe("Login", () => {
    let renderResult: RenderResult;
    let mockedClient: MockApolloClient;
    beforeEach(async () => {
        await waitFor(async () => {
            mockedClient = createMockClient();
            renderResult = render(
                <HelmetProvider>
                    <Router>
                        <ApolloProvider client={mockedClient}>
                            <Login />
                        </ApolloProvider>
                    </Router>
                </HelmetProvider>
            );
            await act(async() => await new Promise((resolve) => setTimeout(resolve, 0))); 
        });
    });
    it("should render OK", async () => {
        await waitFor(() => {
            expect(document.title).toBe("Login | Podcast");
        });
    });
    it("displays email validation errors", async () => {
        const {getByPlaceholderText, getByRole} = renderResult;
        const email= getByPlaceholderText(/email/i);
        await waitFor(() => {
            userEvent.type(email, "happy@gmail");
        });
        let errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
        await waitFor(() => {
            userEvent.clear(email);
        });
        errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/email is required/i);
    });
    it("display password required errors", async () => {
        const { getByPlaceholderText, debug, getByRole } = renderResult;
        const email = getByPlaceholderText(/email/i);
        const submitBtn = getByRole("button");
        await waitFor(() => {
            userEvent.type(email, "happy@gmail.com");
            userEvent.click(submitBtn);
        });
        const errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/password is required/i);
    });
    it("submits form and calls mutation", async() => {
        const {getByPlaceholderText, getByRole} = renderResult;
        const email = getByPlaceholderText(/email/i);
        const password = getByPlaceholderText(/password/i);
        const submitBtn = getByRole('button');
        const formData = {
            email: 'happy@gmail.com',
            password: "123"
        };
        const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
            data: {
                login: {
                    ok: true,
                    error: 'mutation-error',
                    token: "hello"
                }
            }
        });
        mockedClient.setRequestHandler(LOGIN_MUTATION, mockedLoginMutationResponse);
        jest.spyOn(Storage.prototype, 'setItem');
        await waitFor(() => {
            userEvent.type(email, formData.email);
            userEvent.type(password, formData.password);
            userEvent.click(submitBtn);
        });
        expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
            loginInput: {
                email: formData.email,
                password: formData.password
            },
        });
        const errorMessage = getByRole('alert');
        expect(errorMessage).toHaveTextContent(/mutation-error/i);
        expect(localStorage.setItem).toHaveBeenLastCalledWith('token', 'hello');
    })
})