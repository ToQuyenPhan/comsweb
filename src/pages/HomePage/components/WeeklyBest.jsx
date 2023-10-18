import React, { useEffect } from "react";
import "../css/_weekly-best.css";

function WeeklyBest() {

    useEffect(() => {
    }, []);

    return (
        <div className="weekly-best-part">
            <div className="intro-y">
                <h2>
                    Weekly Best Creators
                </h2>
            </div>
            <div>
                <div className="intro-y">
                    <div className="box zoom-in">
                        <div className="image-fit">
                            {/* <img alt="Midone - HTML Admin Template" src="dist/images/profile-14.jpg"> */}
                        </div>
                        <div>
                            <div>Russell Crowe</div>
                            <div>Staff</div>
                        </div>
                        <div>137</div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="box zoom-in">
                        <div className="image-fit">
                            {/* <img alt="Midone - HTML Admin Template" src="dist/images/profile-11.jpg"> */}
                        </div>
                        <div>
                            <div>John Travolta</div>
                            <div>Manager</div>
                        </div>
                        <div>137</div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="box zoom-in">
                        <div className="image-fit">
                            {/* <img alt="Midone - HTML Admin Template" src="dist/images/profile-11.jpg"> */}
                        </div>
                        <div>
                            <div>Tom Cruise</div>
                            <div>Staff</div>
                        </div>
                        <div>137</div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="box zoom-in">
                        <div className="image-fit">
                            {/* <img alt="Midone - HTML Admin Template" src="dist/images/profile-13.jpg"> */}
                        </div>
                        <div>
                            <div>Denzel Washington</div>
                            <div>Manager</div>
                        </div>
                        <div>137</div>
                    </div>
                </div>
                <a href="" className="intro-y dark:border-darkmode-300">View More</a>
            </div>
        </div>
    );
}

export default WeeklyBest;