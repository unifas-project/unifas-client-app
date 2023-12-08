import React, {useState} from 'react'
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {UNIFAS_API} from "../../../../constants/api";

function UserPasswordForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmationPassword: "",
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    const token = localStorage.getItem('token');
    if (isCheckPassword()) {
      return;
    }

    try {
      const response = await axios.put(
        `${UNIFAS_API}/users/user-password`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || "Change pasword successfully");
      setTimeout(() => {
        toast.dismiss();
      }, 100000);

    } catch (error) {
      toast.error(error.response.data.message || "Failed to change password");
    }
  };
  const isCheckPassword = () => {
    const { currentPassword, newPassword } = user;

    if (newPassword === currentPassword) {
      toast.error('New password must be different from the current password.');
      return true;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return true;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!regex.test(user.newPassword)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return true;
    }
    // toast.success( "OK");
    return false;
  };
  const getBackHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <form>
            <h2 style={{color: 'red'}}>Change password</h2> <br/>

            <div>
              <label>Current password<span className="red-text">*</span></label>
              <input
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                value={user?.currentPassword}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <br/>

            <div>
              <label>New password<span className="red-text">*</span></label>
              <input
                name="newPassword"
                type="password"
                placeholder="Enter a new password different from the current password"
                value={user?.newPassword}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <p className="red-text">New password different from the current password
            </p>

            <div>
              <label>Confirmation password<span className="red-text">*</span></label>
              <input
                name="confirmationPassword"
                type="password"
                placeholder="Enter a new password"
                value={user?.confirmationPassword}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <p className="red-text">Password includes 8 characters, uppercase letters, lowercase letters, numbers, and
              special characters
            </p> <br/>

              <div>
                <div className="row justify-content-center">
                <button
                        type="button"
                        className="btn btn-primary user-detail-btn"
                        onClick={getBackHome}
                > Cancel
                </button>

                &nbsp; &nbsp;
                <button
                  type="button"
                  className="btn btn-success user-detail-btn"
                  onClick={handleChangePassword}
                > Change
                </button>
              </div>
            </div>
            <ToastContainer/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserPasswordForm
