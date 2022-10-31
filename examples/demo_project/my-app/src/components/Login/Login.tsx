import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/redux/slices/userSlice";

interface IAppProps {}

const Login: React.FunctionComponent<IAppProps> = (props) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const Router = useRouter();

  const createUser = async (e: any) => {
    e.preventDefault();

    if (
      nameRef.current?.value &&
      emailRef.current?.value &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        emailRef.current?.value
      )
    ) {
      const userData = await axios.post("http://localhost:5000/user", {
        name: nameRef.current.value,
        email: emailRef.current.value,
      });
      if (userData.data.id) {
        dispatch(setUser(userData.data));
        localStorage.setItem("user", JSON.stringify(userData.data));
        Router.push("/");
      } else {
        alert(userData.data);
      }
    } else {
      alert("please set valid email address");
    }
  };

  return (
    <div>
      <h1 className="text-3xl myHeading  mt-5 border-b border-b-2 leading-[40px] border-b-black w-max mx-auto">
        Login
      </h1>
      <form onSubmit={createUser} className=" mt-5  w-1/6 mx-auto">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          ref={nameRef}
          className="border p-1.5  rounded border-black "
          type="text"
        />
        <br />
        <label htmlFor="name" className="block mt-2">
          Email
        </label>
        <input
          ref={emailRef}
          className="border rounded border-black  p-1.5 mt-2"
          type="email"
        />
        <br />
        <input
          type="submit"
          className="mt-3 px-3 text-gray-600 py-2 border cursor-pointer bg-green-400 rounded-lg"
        />
      </form>
    </div>
  );
};
export default Login;
