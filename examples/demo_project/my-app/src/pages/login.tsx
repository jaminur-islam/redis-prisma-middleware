import * as React from "react";
import Login from "../components/Login/Login";

interface ILoginProps {}

const LoginPage: React.FunctionComponent<ILoginProps> = (props) => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
