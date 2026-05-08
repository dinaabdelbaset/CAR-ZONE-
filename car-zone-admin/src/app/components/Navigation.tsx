import { Link, useLocation } from "react-router-dom";
import { CarZoneLogo } from "./CarZoneLogo";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <CarZoneLogo />
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/") ? "text-black" : "text-gray-600 hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`transition-colors ${
                isActive("/browse") ? "text-black" : "text-gray-600 hover:text-black"
              }`}
            >
              New Cars
            </Link>
            <Link
              to="/used-cars"
              className={`transition-colors ${
                isActive("/used-cars") ? "text-black" : "text-gray-600 hover:text-black"
              }`}
            >
              Used Cars
            </Link>
            <Link
              to="/spare-parts"
              className={`transition-colors ${
                isActive("/spare-parts") ? "text-black" : "text-gray-600 hover:text-black"
              }`}
            >
              Spare Parts
            </Link>
            <Link
              to="/compare"
              className={`transition-colors ${
                isActive("/compare") ? "text-black" : "text-gray-600 hover:text-black"
              }`}
            >
              Compare
            </Link>
            <Link
              to="/contact"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}