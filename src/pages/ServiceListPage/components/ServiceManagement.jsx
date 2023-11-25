import React, { useEffect } from "react";
import { Icon } from '@iconify/react';
import "../css/_service-management.css";

function ServiceManagement() {

    useEffect(() => {
    }, []);

    return (
        <div className="your-contracts">
            <div className="intro-y">
                <h2>
                    Service Management
                </h2>
                <div>
                    <button class="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i><Icon icon="lucide:plus" className="icon" /> Add New </button>
                    <button class="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i><Icon icon="lucide:filter" className="icon" /> Filter </button>
                    <div>
                        <Icon icon="lucide:search" className="icon" />
                        <input type="text" className="form-control" placeholder="Search by name" />
                    </div>
                    {/*<button class="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i> Export to PDF </button> */}
                </div>
                
            </div>
            <div className="intro-y">
                <table className="table-report">
                    <thead>
                        <tr>
                            <th>CODE</th>
                            <th>SERVICE NAME</th>
                            <th>COST</th>
                            <th>STATUS</th>
                            <th>DESCRIPTION</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
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
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
                            </td>
                            <td className="table-report__action">
                                <div>
                                    <a href=""> <Icon icon="lucide:check-square" className="icon" /> Edit </a>
                                    <a href=""> <Icon icon="lucide:trash-2" className="icon" /> Delete </a>
                                </div>
                            </td>
                        </tr><tr className="intro-x">
                            <td>
                                <div>
                                    1  
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>
                                
                            </td>
                            <td>
                                <div>20.000.000 VND</div>
                            </td>
                            <td>
                                <div> Active </div>
                            </td>
                            <td>
                                <div> Chỉnh sửa hợp đồng A </div>
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
                    <option>15</option>
                    <option>20</option>
                </select>
            </div>
        </div>
    );
}

export default ServiceManagement;