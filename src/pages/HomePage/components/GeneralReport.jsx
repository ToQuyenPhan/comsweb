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
                                <div>
                                    <div className="report-box__indicator tooltip" title="33% Higher than last month"> 33% <Icon icon="lucide:chevron-up" className="icon" /> </div>
                                </div>
                            </div>
                            <div>47</div>
                            <div>Draft Contracts</div>
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div>
                                <Icon icon="carbon:task-approved" className="report-box__icon" color="#f97316" />
                                <div>
                                    <div class="report-box__indicator bg-danger tooltip" title="2% Lower than last month"> 2% <Icon icon="lucide:chevron-down" className="icon" /> </div>
                                </div>
                            </div>
                            <div>37</div>
                            <div>Approved Contracts</div>
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div>
                                <Icon icon="clarity:contract-line" className="report-box__icon" color="#facc15" />
                                <div>
                                    <div class="report-box__indicator tooltip" title="12% Higher than last month"> 12% <Icon icon="lucide:chevron-up" className="icon" /> </div>
                                </div>
                            </div>
                            <div>21</div>
                            <div>Signed Contracts</div>
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div>
                                <Icon icon="la:file-contract" className="report-box__icon" color="#84cc16" />
                                <div>
                                    <div class="report-box__indicator tooltip" title="22% Higher than last month"> 22% <Icon icon="lucide:chevron-up" className="icon" /> </div>
                                </div>
                            </div>
                            <div>152</div>
                            <div>Finalized Contracts</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralReport;