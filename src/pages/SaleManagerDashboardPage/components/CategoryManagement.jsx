import React, { useEffect } from "react";
import { Icon } from '@iconify/react';
import "../css/_category-management.css";

function CategoryManagement() {

    useEffect(() => {
    }, []);

    return (
        <div className="your-contracts">
            <div className="intro-y">
                <h2>
                    <a href="">
                        Category Management
                    </a>
                </h2>
                <div>
                    <button class="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i><Icon icon="lucide:filter" className="icon" /> Filter </button>
                    <div>
                        <Icon icon="lucide:search" className="icon" />
                        <input type="text" className="form-control" placeholder="Search by name" />
                    </div>
                </div>
            </div>
            <div className="intro-y">
                <table className="table-report">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CATEGORY NAME</th>
                            <th></th>
                            <th>STATUS</th>
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
                                <div></div>
                            </td>
                            <td>
                                <div> Active </div>
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
                                    2
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>

                            </td>
                            <td>

                            </td>
                            <td>
                                <div> Active </div>
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
                                    3
                                </div>
                            </td>
                            <td>
                                <a href="">Hop dong dich vu 1</a>

                            </td>
                            <td>

                            </td>
                            <td>
                                <div> Active </div>
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
                    <option>3</option>
                    <option>5</option>
                    <option>7</option>
                    <option>9</option>
                </select>
            </div>
        </div>
    );
}

export default CategoryManagement;