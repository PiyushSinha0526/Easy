import { Blog } from "../hooks";

const BlogMain = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <div>{blog.title}</div>
        <div>{blog.content}</div>
      </div>
      <div className="col-span-4">
        {blog.author.name ? blog.author.name : "Anonymous"}
      </div>
    </div>
  );
};

export default BlogMain;
