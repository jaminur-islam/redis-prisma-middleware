// HOC/withAuth.jsx
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// the below function could be any of your custom implementation for verifying the token. I've added it as means of explanantion

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const verify = async () => {
        // const userData = await axios.get("http://localhost:5000/post");
        const userData = localStorage.getItem("user");
        if (userData) {
          setVerified(true);
        } else {
          Router.push("/login");
        }
      };
      verify();
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return <h2> Loading...</h2>;
    }
  };
};

export default withAuth;
