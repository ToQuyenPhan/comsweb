import React from "react";
import { Icon } from '@iconify/react';
import '../css/_report-box.css';

function GeneralReport() {
    return (
        <div className="general-report-part">
            <div className="intro-y">
                <h2>
                    General Report
                </h2>
                <a href=""> <Icon icon="lucide:refresh-cw" width={16} height={16} className="icon" /> Reload Data </a>
            </div>
            <div>
                <div className="intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div>
                                <Icon icon="ri:draft-line" className="report-box__icon" color="#1e40af" />                            
                            </div>
                            <div>47</div>
                            <div>Contract Templates</div>
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div>
                                <Icon icon="carbon:task-approved" className="report-box__icon" color="#f97316" />
                                
                            </div>
                            <div>37</div>
                            <div>Liquidation Records</div>
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div>
                                <Icon icon="clarity:contract-line" className="report-box__icon" color="#facc15" />
                                
                            </div>
                            <div>21</div>
                            <div>Annex Templates</div>
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div>
                                <Icon icon="uil:user" className="report-box__icon" color="#84cc16" />
                                
                            </div>
                            <div>152</div>
                            <div>Partners</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralReport;