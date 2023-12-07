import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../../../../css/user/userdetail/user-detail.css";
import Form from "react-bootstrap/Form";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UNIFAS_API} from "../../../../constants/api";

function UserDetailForm() {
  const [user, setUser] = useState();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const fetchUserDetail = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${UNIFAS_API}/users/profile`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async () => {
    const token = localStorage.getItem("token");
    try {

      if (!user.fullName || user.fullName.length < 6 || !/^[a-zA-Z\sđĐàÀáÁạẠảẢãÃăĂằẰắẮặẶẳẲẵẴâÂầẦấẤậẬẩẨẫẪđĐèÈéÉẹẸẻẺẽẼêÊềỀếẾệỆểỂễỄìÌíÍịỊỉỈĩĨòÒóÓọỌỏỎõÕôÔồỒốỐộỘổỔỗỖơƠờỜớỚợỢởỞỡỠùÙúÚụỤủỦũŨưỨừỬửữỮựỰỳỲýÝỵỴỷỶỹỸ]+$/u.test(user.fullName)) {
        toast.error('Full name is required and should not contain special characters or numbers.');
        return;
      }

      const response = await axios.put(
        `${UNIFAS_API}/users/update-profile`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditMode(false);
      toast.success(response.data.message || "Update profile successfully !");

      setTimeout(() => {
        toast.dismiss();
      }, 100000);

    } catch (error) {
      toast.error(error.response.data.message || "Failed to update profile.");
      console.error('Error updating user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const getBackHome = () => {
    navigate("/");
  };

  const getUserEdit = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    updateUserProfile();
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">

          <Form>
            <h2 style={{color: 'red'}}>Account profile</h2>
            <br/>
            <div>
              <label>Username:</label>
              <input
                readOnly
                name="username"
                value={user?.username}
                className="form-control"
                required
              />
            </div>
            <br/>

            <div>
              <label>Email:</label>
              <input
                readOnly
                name="email"
                value={user?.email}
                className="form-control"
                required
              />
            </div>
            <br/>

            <div>
              <label>Full name:</label>
              <input
                readOnly={!editMode}
                name="fullName"
                value={user?.fullName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <br/>

            <div>
              <label>Date of birth:</label>
              <input
                readOnly={!editMode}
                type="date"
                name="dateOfBirth"
                value={user?.dateOfBirth}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <br/>

            <div className="row justify-content-center">
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="btn btn-warning user-detail-btn "
                  > Cancel
                  </button>
                  &nbsp; &nbsp;
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="btn btn-success user-detail-btn"
                  > Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={getBackHome}
                    className="btn btn-primary user-detail-btn"
                  > Home
                  </button>
                  &nbsp; &nbsp;
                  <button
                    type="button"
                    onClick={getUserEdit}
                    className="btn btn-danger user-detail-btn"
                  > Update
                  </button>
                </>
              )}
            </div>
            <ToastContainer/>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserDetailForm
