import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem('token')));

export const client = new ApolloClient({
  uri: "https://nuber-eats-challengee.herokuapp.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          }
        }
      }
    }
  })
});
