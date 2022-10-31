import * as React from "react";
export interface IPostProps {
  id: number;
  title: string;
  description: string;
  userId: number;
}
const Post: React.FC<{ post: IPostProps }> = ({ post }) => {
  return (
    <div className="border p-5 bg-green-500 rounded-lg">
      <h1> {post.title} </h1>
      <p> {post.description}</p>
      <h1>{post.id}</h1>
    </div>
  );
};

export default Post;
