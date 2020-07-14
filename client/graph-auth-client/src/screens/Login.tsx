import React from "react";

export const Login: React.FC<any> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        backgroundColor: "lightblue",
        padding: "20px",
        justifyContent: "space-between",
      }}
    >
      <span>email</span>
      <input />
      <span>password</span>
      <input type="password" />
      <button style={{ marginTop: "10px" }}>Login</button>
    </div>
  );
};
