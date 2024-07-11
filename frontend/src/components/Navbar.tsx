import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { RiLoginCircleLine, RiLogoutCircleLine } from "@remixicon/react";
import useAuthStore from "../store/AuthStore";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const signout = useAuthStore(state=> state.signout)
  return (
    <>
      <div className="flex items-center justify-between border-b-2 px-8">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-14" />
        </Link>
        <div className="flex gap-4">
          <ul className="flex items-center gap-2">
            <li>
              <Link to={"/"} className="">
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to={"/publish"}
                type="button"
                className="mb-2 me-2 rounded-md bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br"
              >
                Create
              </Link>
            </li>
            <li
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen && (
                <div className="absolute right-0 top-[3.3rem] flex w-28 flex-col items-start gap-1 rounded-md bg-white p-1 shadow-md shadow-black ring-1 ring-black *:w-full *:font-semibold">
                  <Link
                    to={"/myBlogs"}
                    className="rounded-md px-2 py-1 hover:bg-black hover:text-white"
                  >
                    My Blogs
                  </Link>
                  <Link
                      onClick={() => signout()}
                      to={"/signin"}
                      className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-black hover:text-white"
                    >
                      Signout <RiLogoutCircleLine size={18} />
                  
                    </Link>
                  {true ? (
                    <Link
                      to={"/signin"}
                      className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-black hover:text-white"
                    >
                      Signin <RiLoginCircleLine size={18} />
                    </Link>
                  ) : (
                    <Link
                      to={"/signup"}
                      className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-black hover:text-white"
                    >
                      Signup <RiLogoutCircleLine size={18} />
                    </Link>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
