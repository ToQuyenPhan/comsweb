import React, { useEffect } from "react";
import "../css/_recent-activities.css";

function RecentActivities() {

    useEffect(() => {
    }, []);

    return (
        <div className="recent-activities">
            <div className="intro-x">
                <h2>
                    Recent Activities
                </h2>
                <a href="">Show More</a>
            </div>
            <div className="before:dark:bg-darkmode-400">
                <div className="intro-x">
                    <div className="before:dark:bg-darkmode-400">
                        <div className="image-fit">
                            <img alt="Avatar" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" />
                        </div>
                    </div>
                    <div className="box zoom-in">
                        <div>
                            <div>Al Pacino</div>
                            <div>07:00 PM</div>
                        </div>
                        <div>Has joined the team</div>
                    </div>
                </div>
                {/* <div className="intro-x">
                    <div className="before:dark:bg-darkmode-400">
                        <div className="image-fit">
                            {/* <img alt="Midone - HTML Admin Template" src="dist/images/profile-6.jpg"> 
                        </div>
                    </div>
                    <div className="box zoom-in">
                        <div>
                            <div>Tom Cruise</div>
                            <div>07:00 PM</div>
                        </div>
                        <div class="text-slate-500">
                            <div class="mt-1">Added 3 new photos</div>
                            <div class="flex mt-2">
                                <div class="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Samsung Galaxy S20 Ultra">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-md border border-white" src="dist/images/preview-6.jpg"> 
                                </div>
                                <div class="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Oppo Find X2 Pro">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-md border border-white" src="dist/images/preview-13.jpg"> 
                                </div>
                                <div class="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Nike Tanjun">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-md border border-white" src="dist/images/preview-6.jpg"> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div class="intro-x text-slate-500 text-xs text-center my-4">12 November</div> */}
                <div className="intro-x">
                    <div className="before:dark:bg-darkmode-400">
                        <div className="image-fit">
                            <img alt="Avatar" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" />
                        </div>
                    </div>
                    <div className="box zoom-in">
                        <div>
                            <div>Johnny Depp</div>
                            <div>07:00 PM</div>
                        </div>
                        <div>Has changed <a className="text-primary" href="">Sony A7 III</a> price and description</div>
                    </div>
                </div>
                <div className="intro-x">
                    <div className="before:dark:bg-darkmode-400">
                        <div className="image-fit">
                            <img alt="Avatar" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" />
                        </div>
                    </div>
                    <div className="box zoom-in">
                        <div>
                            <div>Al Pacino</div>
                            <div>07:00 PM</div>
                        </div>
                        <div>Has changed <a className="text-primary" href="">Samsung Q90 QLED TV</a> description</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentActivities;