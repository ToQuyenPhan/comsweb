import React, { useEffect } from "react";
import { Icon } from '@iconify/react';
import "../css/_user-management-admin-dashboard.css";

function UserManagement() {

    useEffect(() => {
    }, []);

    return (
        <div className="your-contracts">
            <div className="intro-y">
                <h2>
                    User Management
                </h2>
                <div>
                    <button class="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i><Icon icon="lucide:filter" className="icon" /> Filter </button>
                    <div>
                        <Icon icon="lucide:search" className="icon" />
                        <input type="text" className="form-control" placeholder="Search by name" />
                    </div>
                    {/* <button class="btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i> Export to Excel </button>
                    <button class="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300"> <i data-lucide="file-text" class="hidden sm:block w-4 h-4 mr-2"></i> Export to PDF </button> */}
                </div>
            </div>
            <div className="intro-y">
                <table className="table-report">
                    <thead>
                        <tr>
                            <th>IMAGES</th>
                            <th>USER NAME</th>
                            <th>ROLE</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="intro-x">
                            <td>
                                <div>
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                                    <div className="image-fit zoom-in">
                                        <img alt="Avatar" class="tooltip rounded-full" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" title="Uploaded at 3 June 2020" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <a href="">Nguyen Thai Phong</a>
                                <div>phong@gmail.com</div>
                            </td>
                            <td>Staff</td>
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
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                </select>
            </div>
        </div>
    );
}

export default UserManagement;