import type { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../services/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../services/redux/slices/userSlice";
import withAuth from "../components/WithAuth/withAuth";
import { useRouter } from "next/router";
import Posts from "../components/Posts/Posts";
import { setPost } from "../services/redux/slices/postSlice";

const home: NextPage = () => {
  const Router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const userDate = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(userDate || "{}")));
  }, []);

  return (
    <div>
      <Head>
        <title>own project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-20 mx-auto">
        <h1 className="text-5xl text-center"> My post </h1>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            Router.push("/login");
            dispatch(setPost([]));
          }}
          className="text-2xl px-5 py-2 border mx-auto ml-2 bg-red-500 rounded-lg text-white"
        >
          LogOut
        </button>
        <Posts />
      </main>
    </div>
  );
};

export default withAuth(home);
