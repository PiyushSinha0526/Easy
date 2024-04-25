import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import BlogMain from "../components/BlogMain";

function Blog() {
  const {id} = useParams()
  const {loading, blog} = useBlog({id: id||""});
  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <div><BlogMain blog={blog}/></div>
  )
}

export default Blog