import React, { useState, useContext } from "react";
import { RiShoppingCartLine, RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import UserMenu from "./UserMenu";
import { useNavigate } from 'react-router-dom';
import HeaderPopup from "./HeaderPopup";


function HeaderPrimary() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, setUserData } = useContext(UserContext); // Access user data and logout function from UserContext

  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/search-results?search=${searchQuery}`;
    }
  };

  const handleLogout = () => {
    // Clear user data from context and localStorage
    setUserData(null);
    localStorage.removeItem('token');
    // Refresh the page to reflect changes
    
    
    navigate('/sign-in');
    window.location.reload();

  };

  return (
    <div>
      <HeaderPopup/>
      <div className="headerPrimary bg-[#ffffff] flex justify-between items-center h-20 shadow-lg px-4 sm:px-6 lg:px-8 text-base">
        <div className="flex flex-row space-x-20">
          <div className="left flex items-center">
            <Link to="/">
              <div className="udemyLogo">
                <img
                  src="/logo.png"
                  className="logo h-8 w-auto"
                  alt="logo"
                ></img>
              </div>
            </Link>
          </div>
          <div className="mid flex-1 ml-4 sm:ml-6 lg:ml-8 relative">
            <div className="searchIcon absolute left-0 flex justify-center items-center h-8 w-10">
              <RiSearchLine className="icon mt-2" />
            </div>
            <input
              className="searchBar pl-12 border w-96 border-gray-300 rounded-full h-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
        <div className="right flex font-sans items-center">
          {user ? (
            <>
              {user.role === "admin" && (
                <div className="w-20 mx-10">
                  <span className="business">
                    <Link to="/admin">Your Dashboard</Link>
                  </span>
                </div>
              )}
              {user.role === "creator" && (
                <div className="w-20 mx-10">
                  <span className="business">
                    <Link to="/creator">Your Dashboard</Link>
                  </span>
                </div>
              )}
              {user.role === "user" && (
                <div className="w-20 mx-10">
                  <span className="business">
                    <Link to="/student-dashboard">Your Dashboard</Link>
                  </span>
                </div>
              )}
              <div className="w-20">
                <span className="teach">Teach on EduPulse</span>
              </div>
              <div className="cartDiv ml-4">
                <RiShoppingCartLine className="icon" />
              </div>
              <div className="pl-4">
                <UserMenu role={user.role} handleLogout={handleLogout} />
              </div>
            </>
          ) : (
            <div className="right flex font-sans items-center">
              <Link to="/sign-in">
                <div className="login button bg-white text-slate-700  shadow-lg border  hover:text-slate-900 rounded-md px-4 py-1 ml-4 cursor-pointer">
                  Log In
                </div>
              </Link>
              <Link to="/sign-up">
                <div className="signup button bg-blue-400 text-white border shadow-lg hover:bg-blue-500 rounded-md px-4 py-1 ml-2 cursor-pointer">
                  Sign up
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderPrimary;
