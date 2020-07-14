import React from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Login } from "./screens/Login";

const LOGIN = gql`
  {
    login(password: "1235", email: "dario@email.com") {
      id
      firstName
      lastName
      name
      createdAt
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(LOGIN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      {/* <Login /> */}
      <span>{data?.login.id}</span>
      <span>{data?.login.firstName}</span>
      <span>{data?.login.lastName}</span>
      <span>{data?.login.name}</span>
      <span>{data?.login.createdAt}</span>
    </div>
  );
}

export default App;
