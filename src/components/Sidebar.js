import React from "react";
import { Home, Compass, PlaySquare, Clock, ThumbsUp } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isMenuOpen } = useSelector((store) => store.app);

  return (
    <aside
      className={`${
        isMenuOpen ? "w-60" : "w-0"
      } h-screen bg-white border-r border-gray-200 overflow-y-auto hidden md:block transition-all duration-300`}
    >
      {isMenuOpen && (
        <>
          {/* Top Section */}
          <div className="px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">Main</h2>
            <ul className="space-y-1">
              <Link to="/">
                <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Home size={20} />
                  <span>Home</span>
                </li>
              </Link>
              <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <Compass size={20} />
                <span>Explore</span>
              </li>
              <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <PlaySquare size={20} />
                <span>Subscriptions</span>
              </li>
            </ul>
          </div>

          <hr className="my-2" />

          {/* Library Section */}
          <div className="px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              Library
            </h2>
            <ul className="space-y-1">
              <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <Clock size={20} />
                <span>History</span>
              </li>
              <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <ThumbsUp size={20} />
                <span>Liked Videos</span>
              </li>
            </ul>
          </div>

          <hr className="my-2" />

          {/* Subsection Example */}
          <div className="px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              Playlists
            </h2>
            <ul className="space-y-1">
              <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                React Tutorials
              </li>
              <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                Music Mix
              </li>
              <li className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                Podcasts
              </li>
            </ul>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
