import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import TableTest from "./components/TestTable/TableTest";

const client = new ApolloClient({
  uri: "http://localhost:5050",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  );
};

render(
  <ApolloProvider client={client}>
    <App />
    <TableTest />
  </ApolloProvider>,
  document.getElementById("root")
);
