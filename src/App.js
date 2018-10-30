import React, { Component } from "react";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import UploadFile from "./UploadFile";
import UploadMultiFile from "./UploadMultiFile";
import UploadBlob from "./UploadBlob";
// import FileList from "./FileList";

const uploadLink = createUploadLink({ uri: "http://localhost:4308" });
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');

  const token = "test token string";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    cache: new InMemoryCache().restore(cache),
    link: authLink.concat(uploadLink)
    // link: createUploadLink({ uri: "http://localhost:3001/graphql" })
  });

const apolloClient = createApolloClient();

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={apolloClient}>
          <UploadFile />
          <UploadMultiFile />
          <UploadBlob />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
