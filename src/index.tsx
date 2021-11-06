import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import { GlobalStateProvider } from "./GlobalStateProvider";

const client = new ApolloClient({
  uri: "http://localhost:5050",
  cache: new InMemoryCache(),
});

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <GlobalStateProvider>
        <Root />
      </GlobalStateProvider>
    </ApolloProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
