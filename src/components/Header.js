import React, { useEffect, useState, useRef } from "react";
import { Menu, Search, Bell, Video, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_LOGO } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const searchRef = useRef(null);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        if (searchCache[searchQuery]) {
          setSuggestionList(searchCache[searchQuery]);
        } else {
          getSearchSuggestions();
        }
      } else setSuggestionList([]);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSearchSuggestions = async () => {
    try {
      // NOTE: Use your backend proxy to avoid CORS issues
      console.log("API CALL !!!!");

      const res = await fetch(
        "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
          searchQuery
      );
      const data = await res.json();
      setSuggestionList(data[1] || []);
      setShowSuggestions(true);
      dispatch(cacheResults({ [searchQuery]: data[1] }));
      console.log(searchCache);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md sticky top-0 bg-white z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={toggleMenuHandler}
        >
          <Menu size={24} />
        </button>
        <img
          src={YOUTUBE_LOGO}
          alt="YouTube Logo"
          className="h-6 cursor-pointer"
        />
      </div>

      {/* Middle Section - Search Bar */}
      <div className="relative flex flex-1 max-w-2xl mx-4" ref={searchRef}>
        <input
          value={searchQuery}
          type="text"
          placeholder="Search"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() !== "" && setShowSuggestions(true)}
        />
        <button className="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
          <Search size={20} />
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestionList.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
            {suggestionList.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchQuery(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Video size={22} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={22} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
