import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../services/redux/slices/postSlice";
import { RootState } from "../../services/redux/store";

const CreatePost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const createPost = async (e: any) => {
    e.preventDefault();
    if (titleRef?.current?.value && descriptionRef.current?.value) {
      const post = await axios.post("http://localhost:5000/post", {
        title: titleRef?.current?.value,
        description: descriptionRef?.current?.value,
        userId: user.id,
      });
      console.log(post);
      dispatch(setPost([post.data]));
    } else {
      alert("Please full fill the form");
    }
  };
  return (
    <form
      onSubmit={createPost}
      className="flex flex-col w-max mt-10 space-y-5 ml-auto"
    >
      <input
        ref={titleRef}
        className="border px-2 py-1 border-gray-300 rounded-lg"
        placeholder="title"
        type="text"
      />
      <textarea
        ref={descriptionRef}
        className="border px-2 py-1 border-gray-300 rounded-lg"
        placeholder="description"
        name="txtname"
        rows={4}
        cols={20}
        maxLength={200}
      />
      <input
        className="border px-2 py-1 bg-green-500 rounded-lg text-white"
        type="submit"
      />
    </form>
  );
};

export default CreatePost;
