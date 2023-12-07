import React from 'react';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SpeedIcon from '@mui/icons-material/Speed';

const Find = () => {
    return (
        <div>
            <div className="find-area mt-100">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-12">
                            <form >
                                <div className="find-wrap" style={{}}>
                                    <div className="location d-flex align-items-center">
                                        <i className="flaticon-location mr-4" />
                                        <p className="mb-0" style={{color:"white",fontFamily:"'Nunito', sans-serif", fontWeight:"800", fontSize:"20px"}}> 21K Nguyen Van Troi, Phu Nhuan District, Ho Chi Minh City" </p>
                                    </div>
                                    <div className="find-category">
                                        <ul style={{borderRadius:"0px 15px 15px 0px", fontSize:"25px", fontFamily:"'Nunito', sans-serif", color: "white", fontWeight:"800"}}>
                                            <li className="d-flex align-items-center"><SpeedIcon fontSize="large"/> <span className="ml-3"> Fast</span></li>
                                            <li className="d-flex align-items-center"><TouchAppIcon fontSize="large"/><span className="ml-3"> Reputation</span></li>
                                            <li className="d-flex align-items-center"><VolunteerActivismIcon fontSize="large"/><span className="ml-3"> Conscientious</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Find;