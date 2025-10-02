import React, { useEffect, useState, useRef } from "react";
import { Menu, Search, Bell, Video, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_LOGO, YOUTUBE_SEARCH_API } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";
import { addVideos } from "../utils/videosSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false); // New state for mobile search
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null); // Ref for mobile search container

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

  // Close suggestions when clicking outside of the search bar (desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check for desktop search
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      // Check for mobile search toggle and input
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target) &&
        isMobileSearchVisible
      ) {
        // Only hide if the click is not on the desktop search bar
        if (!searchRef.current || !searchRef.current.contains(event.target)) {
          setIsMobileSearchVisible(false);
          setSearchQuery(""); // Optionally clear search when hiding
          setShowSuggestions(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSearchVisible]);

  const getSearchSuggestions = async () => {
    try {
      console.log("API CALL !!!!");

      const res = await fetch(
        "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
          searchQuery
      );
      const data = await res.json();
      setSuggestionList(data[1] || []);
      setShowSuggestions(true);
      dispatch(cacheResults({ [searchQuery]: data[1] }));
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle opening mobile search
  const handleMobileSearchOpen = () => {
    setIsMobileSearchVisible(true);
    // Focus on the input after state update
    setTimeout(() => {
      if (mobileSearchRef.current) {
        mobileSearchRef.current.querySelector("input").focus();
      }
    }, 0);
  };

  const handleSuggestionClick = async (suggestion) => {
    console.log("suggestion clicked !!");

    setSearchQuery("");
    setShowSuggestions(false);
    const API_URL = YOUTUBE_SEARCH_API;
    const params = new URLSearchParams({
      part: "snippet", // Required for search, can include 'id'
      maxResults: "25",
      q: suggestion, // Use the suggestion for the query
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    });

    const data = await fetch(API_URL + params.toString());
    const json = await data.json();
    dispatch(addVideos(json.items));
    console.log(json);
  };
  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md sticky top-0 bg-white z-50">
      {/* Left Section (Always Visible) */}
      <div
        className={`flex items-center gap-4 ${
          isMobileSearchVisible ? "hidden sm:flex" : "flex"
        }`}
      >
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

      {/* Desktop Search Bar (Visible on 'sm' screens and up) */}
      <div
        className="relative hidden sm:flex flex-1 max-w-2xl mx-4"
        ref={searchRef}
      >
        <input
          value={searchQuery}
          type="text"
          placeholder="Search"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 min-w-[200px]"
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() !== "" && setShowSuggestions(true)}
        />
        <button className="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
          <Search size={20} />
        </button>

        {/* Suggestions Dropdown (Desktop) */}
        {showSuggestions && suggestionList.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
            {suggestionList.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleSuggestionClick(suggestion);
                }}
              >
                <Search size={16} className="inline mr-2 text-gray-500" />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile Search Bar (Only visible when toggled and on small screens) */}
      {isMobileSearchVisible && (
        <div className="relative flex flex-1 w-full mx-0" ref={mobileSearchRef}>
          <input
            value={searchQuery}
            type="text"
            placeholder="Search"
            // Use 'rounded-full' for mobile to center the search button visually
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() =>
              searchQuery.trim() !== "" && setShowSuggestions(true)
            }
          />
          <button
            className="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
            // You might want to implement an actual search submission here
          >
            <Search size={20} />
          </button>

          {/* Suggestions Dropdown (Mobile) - Uses a full-width overlay for better UX */}
          {showSuggestions && suggestionList.length > 0 && (
            <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
              {suggestionList.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setShowSuggestions(false);
                    // You might want to trigger a search here
                  }}
                >
                  <Search size={16} className="inline mr-2 text-gray-500" />
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Right Section (Modified for Responsiveness) */}
      <div
        className={`flex items-center gap-2 sm:gap-4 ${
          isMobileSearchVisible ? "hidden sm:flex" : "flex"
        }`}
      >
        {/* Search icon for mobile - only visible on small screens when search is NOT active */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 sm:hidden"
          onClick={handleMobileSearchOpen}
        >
          <Search size={22} />
        </button>

        {/* Video & Bell icons - hidden on small screens to prioritize search on mobile */}
        <button className="p-2 rounded-full hover:bg-gray-100 hidden sm:block">
          <Video size={22} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 hidden sm:block">
          <Bell size={22} />
        </button>

        {/* User icon (Always visible) */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
