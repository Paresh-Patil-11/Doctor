import { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Book Appointment", href: "/appointment" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href) => location.pathname === href;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : 'shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 rounded-lg p-1 transition-colors hover:bg-gray-50"
          >
            <Heart className="h-8 w-8 text-[#006D77]" />
            <span className="text-xl font-extrabold text-gray-800">MedCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-all duration-300 font-semibold text-base py-2 px-3 rounded-lg ${
                  isActiveLink(item.href)
                    ? "text-white bg-[#006D77] shadow-md hover:bg-[#005761]"
                    : "text-gray-600 hover:text-[#006D77] hover:bg-[#EDF6F9]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={
                    user?.role === "doctor"
                      ? "/dashboard/doctor"
                      : "/dashboard/patient"
                  }
                >
                  <button className="px-4 py-2 text-sm font-medium text-white bg-[#006D77] rounded-lg shadow-md hover:bg-[#005761] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:ring-opacity-50">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-[#006D77] rounded-lg shadow-md hover:bg-[#005761] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:ring-opacity-50">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:block lg:hidden p-2 rounded-md text-gray-700 hover:text-[#006D77] hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bg-white shadow-xl transition-transform duration-300 ease-out z-40 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActiveLink(item.href)
                  ? "text-[#006D77] bg-[#EDF6F9]"
                  : "text-gray-700 hover:text-[#006D77] hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Auth buttons in mobile menu */}
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={
                    user?.role === "doctor"
                      ? "/dashboard/doctor"
                      : "/dashboard/patient"
                  }
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#006D77] hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#006D77] hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 px-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-3 py-2 rounded-md text-sm font-medium text-white bg-[#006D77] hover:bg-[#005761] transition-colors duration-200 shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;