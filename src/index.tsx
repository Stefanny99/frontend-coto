import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import Root from "./components/Root";

const client = new ApolloClient({
  uri: "http://localhost:5050",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Root/>
  </ApolloProvider>,
  document.getElementById("root")
);
