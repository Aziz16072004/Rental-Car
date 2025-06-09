import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { useEffect, useState } from "react";
import { UserCircle } from 'lucide-react';
function Navbar() {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("CarRentalCurrentUser"));
    setUser(savedUser);
  }, []);
  const openNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              {" "}
              <Link className="testi-link" to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
             {!user ? (
          <>
            <Link className="navbar__buttons__sign-in" to="/login" >
              Sign In
            </Link>
            <Link className="navbar__buttons__register" to="/signup">
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-4">

          <Link to="/profile"  className="flex items-center space-x-2 navUser ">
            <div className="h-[40px] w-[40px] rounded-full ring-4 ring-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                <UserCircle className="h-23 w-23 text-gray-400" />
              </div>
            <span className="font-semibold text-black">{user.firstName}</span>
          </Link>
          <button onClick={() => {
            localStorage.removeItem('CarRentalCurrentUser');
            // Optionally redirect or update state here
            window.location.reload(); // or navigate to login page
          }}>Log out</button>
          </div>
        )}
          </div>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
