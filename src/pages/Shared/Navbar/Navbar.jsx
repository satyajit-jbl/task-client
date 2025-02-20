import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { authContext } from "../../component/AuthProvider/AuthProvider";
// import logo from "../../assets/logo.png"
import logo from "../../../assets/logo.png"
import { AuthContext } from "../../../provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logOut()
    // .then(()=>alert('successfully logout'))
  }

  return (
    <nav className=" shadow-md sticky top-0 z-50 bg-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className=" flex flex-shrink-0 items-center">
            <img src={logo} alt="" />
            <Link
  to="/"
  className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-400 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-400 hover:to-cyan-300 transition duration-300"
>
  TaskTrek
</Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-600 font-semibold hover:text-blue-600">
              Home
            </Link>
            <Link to="/services" className="text-gray-600 font-semibold hover:text-blue-600">
              About
            </Link>
            <Link to="/services" className="text-gray-600 font-semibold hover:text-blue-600">
              Contact
            </Link>
            {/* {isLoggedIn ? ( */}
            {user ? (
              <>

                <div className="flex items-center space-x-4">
                  <img
                    referrerPolicy='no-referrer'
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border"
                  />
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 font-semibold hover:text-blue-600">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 font-semibold hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="text-gray-600 font-semibold hover:text-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-4 py-4">
              <Link to="/" className="block text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link to="/about" className="block text-gray-600 font-semibold hover:text-blue-600">
                About
              </Link>
              <Link to="/contact" className="block text-gray-600 font-semibold hover:text-blue-600">
                Contact
              </Link>
              {user ? (
                <>
                  {/* <Link
                    to="/add-service"
                    className="block text-gray-600 hover:text-blue-600">
                    Add Service
                  </Link>
                  <Link
                    to="/my-reviews"
                    className="block text-gray-600 hover:text-blue-600">
                    My Reviews
                  </Link>
                  <Link
                    to="/my-services"
                    className="block text-gray-600 hover:text-blue-600">
                    My Services
                  </Link> */}
                  <div className="flex items-center space-x-4 py-2">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border"
                    />
                    <button
                      // onClick={onLogout}
                      onClick={handleLogout}
                      className="text-gray-600 font-semibold hover:text-blue-600">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-gray-600 font-semibold hover:text-blue-600">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-gray-600 font-semibold hover:text-blue-600">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
