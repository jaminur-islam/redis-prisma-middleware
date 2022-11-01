import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../services/redux/slices/postSlice";
import { RootState } from "../../services/redux/store";
import CreatePost from "./CreatePost";
import Post, { IPostProps } from "./Post";

const Posts: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const posts = useSelector((state: RootState) => state.posts.posts);
  React.useEffect(() => {
    if (user.id) {
      const loadPostData = async () => {
        try {
          const posts = await axios.get(
            `http://localhost:5000/post?id=${user.id}`
          );
          console.log(posts.data);
          dispatch(setPost(posts.data));
        } catch (err) {
          console.log(err);
        }
      };
      loadPostData();
    }
  }, [user.id]);
  console.log(posts);
  return (
    <div>
      <CreatePost />
      <div className="grid grid-cols-3 gap-5 mt-10">
        {posts?.map((post: any) => {
          console.log(post);
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Posts;
