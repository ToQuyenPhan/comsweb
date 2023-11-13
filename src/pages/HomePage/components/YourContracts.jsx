import React, { useEffect, useState, useRef } from "react";
import { Icon } from '@iconify/react';
import "../css/_your-contracts.css";

function YourContracts() {
    const [dropdownMenuClass, setDropdownMenuClass] = useState('inbox-filter__dropdown-menu dropdown-menu');
    const filterRef = useRef(null);
    const optionMenuRef = useRef(null);

    const openFilter = () => {
        if (dropdownMenuClass === 'inbox-filter__dropdown-menu dropdown-menu show') {
            setDropdownMenuClass('');
        } else {
            setDropdownMenuClass('inbox-filter__dropdown-menu dropdown-menu show');
        }
    }

    const openOptionMenu = (id) => {
        if (document.getElementById(id).classList.contains('show')) {
            document.getElementById(id).classList.remove('show');
        } else {
            document.getElementById(id).classList.add('show');
        }
    }

    const closeFilterMenu = (e) => {
        if (!filterRef?.current?.contains(e.target)) {
            setDropdownMenuClass('inbox-filter__dropdown-menu dropdown-menu');
        }
    }

    const closeOptionMenu = (e) => {
        if (!optionMenuRef?.current?.contains(e.target)) {
            document.getElementById(e.target.id).classList.remove('show');
        }
    }

    document.addEventListener('mousedown', closeFilterMenu);

    useEffect(() => {
    }, []);

    return (
        <div className="your-contracts">
            <div className="intro-y">
                <h2>
                    Your Contracts
                </h2>
                {/* <div>
                    <div>
                        <Icon icon="lucide:search" className="icon" />
                        <input type="text" className="form-control" placeholder="Search by name" />
                    </div>
                    <button class="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i> Export to Excel </button>
                    <button class="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i> Export to PDF </button>
                </div> */}
                <div>
                    <Icon icon="lucide:search" className="icon" />
                    <input type="text" placeholder="Search contracts" />
                    <div className="inbox-filter dropdown" data-tw-placement="bottom-start" ref={filterRef} >
                        <Icon icon="lucide:chevron-down" onClick={openFilter} className="icon" />
                        {/* <i class="dropdown-toggle w-4 h-4 cursor-pointer text-slate-500" role="button" aria-expanded="false" data-tw-toggle="dropdown" data-lucide="chevron-down"></i> */}
                        <div className={dropdownMenuClass}>
                            <div className="dropdown-content">
                                <div>
                                    <div>
                                        <label for="input-filter-1" className="form-label">Contract Name</label>
                                        <input id="input-filter-1" type="text" className="form-control" placeholder="Type the file name" />
                                    </div>
                                    <div>
                                        <label for="input-filter-2" className="form-label">Created By</label>
                                        <input id="input-filter-2" type="text" className="form-control" placeholder="example@gmail.com" />
                                    </div>
                                    <div>
                                        <label for="input-filter-3" className="form-label">Created At</label>
                                        <input id="input-filter-3" type="text" className="form-control" placeholder="Important Meeting" />
                                    </div>
                                    <div>
                                        <label for="input-filter-4" className="form-label">Status</label>
                                        <select id="input-filter-4" className="form-select">
                                            <option>Draft</option>
                                            <option>Waiting</option>
                                            <option>Approved</option>
                                            <option>Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        {/* <button class="btn btn-secondary w-32 ml-auto">Create Filter</button> */}
                                        <button className="btn btn-primary ml-2">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <img alt="Creator Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                    {/* <div className="image-fit zoom-in">
                                        <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-6.jpg" title="Uploaded at 6 August 2020">
                                    </div>
                                    <div className="image-fit zoom-in">
                                        <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-13.jpg" title="Uploaded at 3 July 2022">
                                    </div> */}
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
                                    <Icon icon="lucide:more-horizontal" className="icon" onClick={() => openOptionMenu(1)} />
                                    <div id="1">
                                        <ul className="dropdown-content">
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        <img alt="Creator Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 18 October 2022" />
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
                                    <Icon icon="lucide:more-horizontal" className="icon" onClick={() => openOptionMenu(2)} />
                                    <div id="2">
                                        <ul className="dropdown-content">
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        <img alt="Creator Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 5 September 2020" />
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
                                    <Icon icon="lucide:more-horizontal" className="icon" onClick={() => openOptionMenu(3)} />
                                    <div id="3">
                                        <ul className="dropdown-content">
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a> */}
                                </div>
                            </td>
                        </tr>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        <img alt="Creator Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 21 May 2020" />
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
                                    <Icon icon="lucide:more-horizontal" className="icon" onClick={() => openOptionMenu(4)} />
                                    <div id="4">
                                        <ul className="dropdown-content">
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item"> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                            </li>
                                        </ul>
                                    </div>
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
        </div >
    );
}

export default YourContracts;