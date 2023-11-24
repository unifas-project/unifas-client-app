import React from "react";
import { BiUser, BiLogOutCircle, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function BeforeAfterLogin() {
 

  const navigate = useNavigate();

  const storedUsername = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [username, setUsername] = useState(storedUsername);

  useEffect(() => {
    if (storedUsername) {
      setUsername(storedUsername);
      navigate("/");
    }
  }, [storedUsername]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {username !== null ? (
        <li className="header-shop-cart">
          <Link to="/">
            <BiUser style={{ fontSize: "27px", color: "#525252" }}></BiUser>
          </Link>

          <ul className="minicart">
            <li className="d-flex align-items-start">
              <div className="cart-img">
                <Link to="/#">
                  <BiUserCircle
                    style={{
                      fontSize: "30px",
                      color: "black",
                    }}
                  ></BiUserCircle>
                </Link>
              </div>
              <Link to="/">{username}</Link>
            </li>
            <li className="d-flex align-items-start">
              <div className="cart-img">
                <a href="/#">
                  <BiUserCircle
                    style={{
                      fontSize: "30px",
                      color: "black",
                    }}
                  ></BiUserCircle>
                </a>
              </div>
              <a href="/#">Update Profile</a>
            </li>

            {role === "ROLE_ADMIN" && (
              <li className="d-flex align-items-start">
                <div className="cart-img">
                  <a href="/#">
                    <BiUserCircle
                      style={{
                        fontSize: "30px",
                        color: "black",
                      }}
                    ></BiUserCircle>
                  </a>
                </div>
                <a href="/#">
                  <span>Admin DashBoard</span>
                </a>
              </li>
            )}

            <li className="d-flex align-items-start">
              <div className="cart-img">
                <a href="/#" onClick={handleLogout}>
                  <BiLogOutCircle
                    style={{
                      fontSize: "30px",
                      color: "black",
                    }}
                  ></BiLogOutCircle>
                </a>
              </div>
              <h4>
                <Link to="/#" onClick={handleLogout}>
                  Log out
                </Link>
              </h4>
            </li>
          </ul>
        </li>
      ) : (
        <li>
          <Link to="/login">
            <BiUser style={{ fontSize: "27px", color: "#525252" }}></BiUser>
          </Link>
        </li>
      )}
    </div>
  );
}

export default BeforeAfterLogin;
