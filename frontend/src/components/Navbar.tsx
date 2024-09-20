import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { LogInIcon, LogOutIcon } from "lucide-react";
import useAuthStore from "../store/AuthStore";
import logo from "../assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user, signout, isAuthenticated } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      signout: state.signout,
      isAuthenticated: state.isAuthenticated,
    })),
  );
  return (
    <>
      <div className="flex items-center justify-between border-b-2 px-8">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-14" />
        </Link>
        <div className="flex gap-4">
          <ul className="flex items-center gap-3">
            <li>
              <Link to={"/"} className="font-semibold">
                Blogs
              </Link>
            </li>
            <li>
              {isAuthenticated && (
                <Link
                  to={"/write"}
                  type="button"
                  className="mb-2 me-2 rounded-md bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br"
                >
                  Create
                </Link>
              )}
            </li>
            <li
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <>
                <span className="font-bold text-white">
                  {user?.name[0].toUpperCase() || user?.email[0].toUpperCase()}
                </span>
                {isMenuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 top-[3.3rem] z-40 flex w-28 flex-col items-start gap-1 rounded-md bg-white p-1 shadow-md shadow-black ring-1 ring-black *:w-full *:font-semibold"
                  >
                    {isAuthenticated && (
                      <Link
                        to={"/myBlogs"}
                        className="rounded-md px-2 py-1 hover:bg-black hover:text-white"
                      >
                        My Blogs
                      </Link>
                    )}
                    {!isAuthenticated && (
                      <>
                        <Link
                          to={"/signin"}
                          className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-black hover:text-white"
                        >
                          Signin <LogInIcon size={18} />
                        </Link>
                        <Link
                          to={"/signup"}
                          className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-black hover:text-white"
                        >
                          Signup <LogOutIcon size={18} />
                        </Link>
                      </>
                    )}
                    {isAuthenticated && (
                      <Link
                        onClick={() => signout()}
                        to={"/signin"}
                        className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-black hover:text-white"
                      >
                        Signout <LogOutIcon size={18} />
                      </Link>
                    )}
                  </div>
                )}
              </>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
