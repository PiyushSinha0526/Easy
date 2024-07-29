import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Edit from "./pages/Edit";
import Write from "./pages/Write";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="" element={<Navbar />}>
              <Route path="/" element={<Blogs />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/myBlogs" element={<Blogs />} />
                <Route path="blog/:id" element={<Blog />} />
                <Route path="/write" element={<Write />} />
                <Route path="/blog/:id/edit" element={<Edit />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
