import React, { useEffect } from "react";
import { Icon } from '@iconify/react';
import "../css/_your-contracts.css";

function YourContracts() {

    useEffect(() => {
    }, []);

    return (
        <div className="your-contracts">
            <div className="intro-y">
                <h2>
                    Your Contracts
                </h2>
                <div>
                    {/* <button class="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i> Export to Excel </button>
                    <button class="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i> Export to PDF </button> */}
                </div>
            </div>
            <div className="intro-y">
                <table className="table-report">
                    <thead>
                        <tr>
                            <th>CREATOR</th>
                            <th>CONTRACT NAME</th>
                            <th>CREATE DATE</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-12.jpg" title="Uploaded at 3 June 2020"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-6.jpg" title="Uploaded at 6 August 2020"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-13.jpg" title="Uploaded at 3 July 2022"> */}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                <div>Company A</div>
                            </td>
                            <td>08/08/2023</td>
                            <td>
                                <div> Approved </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-15.jpg" title="Uploaded at 18 October 2022"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-5.jpg" title="Uploaded at 15 June 2021"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-5.jpg" title="Uploaded at 12 June 2020"> */}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 2</a>
                                <div>Company B</div>
                            </td>
                            <td>09/04/2023</td>
                            <td>
                                <div> Completed </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-5.jpg" title="Uploaded at 5 September 2020"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-14.jpg" title="Uploaded at 23 August 2021"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-9.jpg" title="Uploaded at 27 July 2020"> */}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 3</a>
                                <div>Company C</div>
                            </td>
                            <td>10/03/2023</td>
                            <td>
                                <div> Waiting </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-12.jpg" title="Uploaded at 21 May 2020"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-6.jpg" title="Uploaded at 4 February 2022"> */}
                                    </div>
                                    <div className="image-fit zoom-in">
                                        {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-14.jpg" title="Uploaded at 24 July 2020"> */}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 4</a>
                                <div>Company D</div>
                            </td>
                            <td>16/04/2023</td>
                            <td>
                                <div> Finalized </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="intro-y">
                <nav>
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#"> <Icon icon="lucide:chevrons-left" className="icon" /> </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#"> <Icon icon="lucide:chevron-left" className="icon" /> </a>
                        </li>
                        <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                        <li className="page-item"> <a className="page-link" href="#">1</a> </li>
                        <li className="page-item active"> <a className="page-link" href="#">2</a> </li>
                        <li className="page-item"> <a className="page-link" href="#">3</a> </li>
                        <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                        <li className="page-item">
                            <a className="page-link" href="#"> <Icon icon="lucide:chevron-right" className="icon" /> </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#"> <Icon icon="lucide:chevrons-right" className="icon" /> </a>
                        </li>
                    </ul>
                </nav>
                <select className="form-select box">
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                </select>
            </div>
        </div>
    );
}

export default YourContracts;