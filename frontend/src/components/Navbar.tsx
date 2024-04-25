import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="flex justify-between border-b-2 px-8 py-3">
        <span>logo</span>
        <ul className="flex gap-2">
          <li>1</li>
          <li>2</li>
          <li>
            <Link to={'/publish'}
              type="button"
              className="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br"
            >
              Publish
            </Link>
          </li>
        </ul>
        <span>0</span>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
