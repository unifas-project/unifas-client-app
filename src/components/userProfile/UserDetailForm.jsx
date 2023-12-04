import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../userProfile/user.css";

function UserDetailForm() {
  const [user, setUser] = useState();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const fetchUserDetail = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
          "http://localhost:8080/api/users/profile",
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
      await axios.put(
          "http://localhost:8080/api/users/update-profile",
          user,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      // Bạn có thể thêm xử lý sau khi cập nhật thành công, ví dụ như hiển thị thông báo
      console.log("User profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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

      <div
          style={{
            width: "30%",
            margin: "auto",
            paddingTop: "50px",
            paddingBottom: "100px"

          }}
      >
        <h2 style={{ color: 'red' }}>Account profile</h2>
        <form>
          <div>
            <label>Username:</label>
            <br />
            <input
                readOnly={!editMode}
                name="username"
                value={user?.username}
                className="form-control"
                required
            />
          </div>
          <br />

          <div>
            <label>Email:</label>
            <br />
            <input
                readOnly={!editMode}
                name="email"
                value={user?.email}
                className="form-control"
                required
            />
          </div>
          <br />

          <div>
            <label>Full name:</label>
            <br />
            <input
                readOnly={!editMode}
                name="fullname"
                value={user?.fullname}
                onChange={handleInputChange}
                className="form-control"
                required
            />
          </div>
          <br />

          <div>
            <label>Date of birth:</label>
            <br />
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
          <br />

          <br />
          <div style={{ textAlign: "center" }}>

            {editMode ? (
                <>
                  <button style={{ textAlign: "center" }}
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="btn btn-warning"

                  >
                    Cancel
                  </button>

                  &nbsp; &nbsp;
                  <button
                      type="button"
                      style={{ textAlign: "center" }}
                      onClick={handleSaveChanges}
                      className="btn btn-success"
                  >
                    Changes
                  </button>
                </>
            ) : (
                <>
                <button
                    type="button"
                    onClick={getBackHome}
                    className="btn btn-primary"
                >
                  Home
                </button>

                &nbsp; &nbsp;

                <button
                    type="button"
                    type="text"
                    onClick={getUserEdit}
                    className="btn btn-danger"
                >
                  Update
                </button>
                </>

            )}
          </div>
        </form>
      </div>
  );
}

export default UserDetailForm;


























// import React, {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";
//
// function UserDetailForm() {
//   const [user, setUser] = useState();
//   const navigate = useNavigate();
//
//
//   const fetchUserDetail = async () => {
//     let token = localStorage.getItem("token");
//     let result = null;
//     try {
//       result = await axios.get("http://localhost:8080/api/users/profile",
//         {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//           }
//         })
//     } catch (e) {
//       console.log(e);
//       return null;
//     }
//     return result.data.data;
//   }
//   const setUserDetail = async () => {
//     let result = await fetchUserDetail();
//     // console.log(result)
//     setUser(result);
//   }
//
//   function getBackHome() {
//     navigate("/");
//     // window.location.reload();
//   }
//
//   function getUserEdit() {
//     navigate("/user-update");
//   }
//
//   useEffect(() => {
//     setUserDetail()
//   }, [])
//
//   return (
//
//       <div
//         style={{
//           width: "30%",
//           margin: "auto",
//           paddingTop: "50px",
//         }}
//       >
//         <form>
//           <div>
//             <label>Username:</label>
//             <br/>
//             <input
//               readOnly
//               name="username"
//               value={user?.username}
//               className="form-control"
//               required
//             />
//           </div>
//           <br/>
//
//
//
//           <div>
//             <label>Email:</label>
//             <br/>
//             <input
//               readOnly
//               name="email"
//               value={user?.email}
//               className="form-control"
//               required
//             />
//           </div>
//           <br/>
//
//           <div>
//             <label>Full name:</label>
//             <br/>
//             <input
//               readOnly
//               name="fullname"
//               value={user?.fullname}
//               className="form-control"
//               required
//             />
//           </div>
//           <br/>
//
//           <div>
//             <label>Date Of Birth:</label>
//             <br/>
//             <input
//                 readOnly
//                 type="date"
//                 name="dateOfBirth"
//                 value={user?.dateOfBirth}
//                 className="form-control"
//                 required
//             />
//           </div>
//           <br/>
//
//           <br/>
//           <div style={{textAlign: "left"}}>
//             <button
//               type="button"
//               onClick={getBackHome}
//               className="btn btn-primary"
//             >
//               Home
//             </button>
//
//             &nbsp;   &nbsp;
//             <button
//               type="button"
//               onClick={getUserEdit}
//               className="btn btn-danger"
//             >
//               Edit
//             </button>
//           </div>
//         </form>
//       </div>
//
//
//
//   );
// }
//
//
// export default UserDetailForm
