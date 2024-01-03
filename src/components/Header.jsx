import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { $ } from 'react-jquery-plugin';
import { Icon } from '@iconify/react';
import {
    BsFillEyeFill,
    BsFillEyeSlashFill,
} from "react-icons/bs";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import '../assets/css/_top-bar.css';
import { FaLess } from 'react-icons/fa';

function Header() {
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [notificationClass, setNotificationClass] = useState('notification-content dropdown-menu');
    const [profileClass, setProfileClass] = useState('dropdown-menu');
    const navigate = useNavigate();
    let notificationRef = useRef(null);
    let profileRef = useRef(null);
    const token = localStorage.getItem("Token");

    let headers = new Headers();
    let url = "https://localhost:7073/Users/current-user";
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');

    const openSearch = () => {
        $(".top-bar, .top-bar-boxed")
            .find(".search")
            .find("input")
            .each(function () {
                $(this).on("focus", function () {
                    $(".top-bar, .top-bar-boxed")
                        .find(".search-result")
                        .addClass("show");
                });

                $(this).on("focusout", function () {
                    $(".top-bar, .top-bar-boxed")
                        .find(".search-result")
                        .removeClass("show");
                });
            });
    }

    const openNotification = () => {
        if (notificationClass == 'notification-content dropdown-menu') {
            setNotificationClass('notification-content dropdown-menu show');
        } else {
            setNotificationClass('notification-content dropdown-menu');
        }
    }

    const openProfile = () => {
        if (profileClass == 'dropdown-menu') {
            setProfileClass('dropdown-menu show');
        } else {
            setProfileClass('dropdown-menu');
        }
    }

    const closeNotificationMenu = (e) => {
        if (!notificationRef?.current?.contains(e.target)) {
            setNotificationClass('notification-content dropdown-menu');
        }
    }

    const closeProfileMenu = (e) => {
        if (!profileRef?.current?.contains(e.target)) {
            setProfileClass('dropdown-menu');
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const fetchUserData = async () => {
        if (jwtDecode(token).role === 'Partner') {
            url = "https://localhost:7073/Partners/current-partner"
        }
        const res = await fetch(url, { mode: 'cors', method: 'GET', headers: headers });
        if (res.status === 200) {
            const data = await res.json();
            setCurrentUser(data);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

    const fetchNotifications = async () => {
        if (jwtDecode(token).role === 'Manager') {
            const res = await fetch(`https://localhost:7073/UserFlowDetails/notifications?CurrentPage=1&PageSize=5`,
                {
                    mode: 'cors', method: 'GET', headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            if (res.status === 200) {
                const data = await res.json();
                setNotifications(data.items);
                setHasNext(data.has_next);
                setHasPrevious(data.has_previous);
                setCurrentPage(data.current_page);
            } else {
                const data = await res.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.title
                })
            }
        }
    }

    const fetchNext = async () => {
        if (!hasNext) {
            return;
        }
        const res = await fetch(`https://localhost:7073/UserFlowDetails/notifications?CurrentPage=${currentPage + 1}&pageSize=5`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            setNotifications(data.items);
            setHasNext(data.has_next);
            setHasPrevious(data.has_previous);
            setCurrentPage(data.current_page);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

    const fetchPrevious = async () => {
        if (!hasPrevious) {
            return;
        }
        const res = await fetch(`https://localhost:7073/UserFlowDetails/notifications?CurrentPage=${currentPage - 1}&pageSize=5`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            setNotifications(data.items);
            setHasNext(data.has_next);
            setHasPrevious(data.has_previous);
            setCurrentPage(data.current_page);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

    const handleChooseContract = (id) => {
        navigate("/contract-details", {
            state: {
                contractId: id
            }
        });
    }

    const handleProfileClick = () => {
        setProfileClass('dropdown-menu');
        setShowPopup(true);
    }

    const handleCloseClick = () => {
        setShowPopup(false);
    }

    const authen = () => {
        if (token === null) {
            navigate('/');
        }
    }

    document.addEventListener('mousedown', closeNotificationMenu);
    document.addEventListener('mousedown', closeProfileMenu);

    useEffect(() => {
        authen();
        openSearch();
        fetchUserData();
        fetchNotifications();
    }, [])

    return (
        <header className='header'>
            <div className="top-bar">
                <nav aria-label="breadcrumb" className="breadcrumb-bar">
                    <ol className="breadcrumb">
                        {/* <li className="breadcrumb-item"><a href="#">{location.pathname.split("/")}</a></li> */}
                        {/* <li className="breadcrumb-item active" aria-current="page">Home</li> */}
                    </ol>
                </nav>
                {/* <div className="search-notification">
                    <div className="search">
                        <input type="text" className="search__input form-control" placeholder="Search..." />
                        <Icon icon="lucide:search" className='search__icon' />
                    </div>
                    <a className="notification" href=""> <i data-lucide="search" className="notification__icon"></i> </a>
                    <div className="search-result">
                        <div className="search-result__content">
                            <div className="search-result__content__title">Pages</div>
                            <div className="search-result__item">
                                <a href="">
                                    <div className="bg-success/20 dark:bg-success/10"><Icon icon="lucide:inbox" width={16} height={16} /> </div>
                                    <div>Mail Settings</div>
                                </a>
                                <a href="">
                                    <div className="bg-pending/10 text-pending"><Icon icon="lucide:users" width={16} height={16} /></div>
                                    <div>Users & Permissions</div>
                                </a>
                                <a href="">
                                    <div className="bg-primary/10 dark:bg-primary/20 text-primary/80"><Icon icon="uil:credit-card" width={16} height={16} /> </div>
                                    <div>Transactions Report</div>
                                </a>
                            </div>
                            <div className="search-result__content__title">Users</div>
                            <div className="search-result__item">
                                <a href="">
                                    <div className="image-fit">
                                        {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-7.jpg"> 
                                    </div>
                                    <div class="ml-3">Kevin Spacey</div>
                                    <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">kevinspacey@left4code.com</div>
                                </a>
                                <a href="">
                                    <div className="image-fit">
                                        {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-2.jpg"> 
                                    </div>
                                    <div class="ml-3">Johnny Depp</div>
                                    <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">johnnydepp@left4code.com</div>
                                </a>
                                <a href="">
                                    <div className="image-fit">
                                        {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-5.jpg"> 
                                    </div>
                                    <div class="ml-3">Johnny Depp</div>
                                    <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">johnnydepp@left4code.com</div>
                                </a>
                                <a href="">
                                    <div className="image-fit">
                                        {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-9.jpg"> 
                                    </div>
                                    <div class="ml-3">Morgan Freeman</div>
                                    <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">morganfreeman@left4code.com</div>
                                </a>
                            </div>
                            <div class="search-result__content__title">Products</div>
                            <a href="" class="flex items-center mt-2">
                                <div class="w-8 h-8 image-fit">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/preview-9.jpg"> 
                                </div>
                                <div class="ml-3">Oppo Find X2 Pro</div>
                                <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">Smartphone &amp; Tablet</div>
                            </a>
                            <a href="" class="flex items-center mt-2">
                                <div class="w-8 h-8 image-fit">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/preview-1.jpg"> 
                                </div>
                                <div class="ml-3">Nikon Z6</div>
                                <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">Photography</div>
                            </a>
                            <a href="" class="flex items-center mt-2">
                                <div class="w-8 h-8 image-fit">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/preview-2.jpg"> 
                                </div>
                                <div class="ml-3">Sony Master Series A9G</div>
                                <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">Electronic</div>
                            </a>
                            <a href="" class="flex items-center mt-2">
                                <div class="w-8 h-8 image-fit">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/preview-8.jpg"> 
                                </div>
                                <div class="ml-3">Dell XPS 13</div>
                                <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">PC &amp; Laptop</div>
                            </a>
                        </div>
                    </div>
                </div> */}
                <div className="intro-x dropdown notification-part" ref={notificationRef}>
                    <div className="dropdown-toggle notification" onClick={openNotification} role="button" aria-expanded="false" data-tw-toggle="dropdown">
                        <Icon icon="lucide:bell" width={20} height={20} className="notification__icon dark:text-slate-500" />
                        {notifications.length > 0 ? (
                            <div className='notification--bullet'></div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className={notificationClass}>
                        <div className="notification-content__box dropdown-content">
                            <div className="notification-content__title">Notifications</div>
                            {notifications.length > 0 ? (
                                <>{notifications.map(item => (
                                    <div id={item?.contractId} className="notification-item-first" onClick={() => handleChooseContract(item?.contractId)}>
                                        <div>
                                            <img alt="Midone - HTML Admin Template" class="rounded-full" src="https://firebasestorage.googleapis.com/v0/b/coms-64e4a.appspot.com/o/images%2Fnotification-bell.png?alt=media&token=a8aced5c-20e4-46f5-a952-8d195fae60da" />
                                            <div className="dark:border-darkmode-600"></div>
                                        </div>
                                        <div>
                                            <div>
                                                <a href="javascript:;">{item?.title}</a>
                                                <div>{item?.long}</div>
                                            </div>
                                            <div>{item?.message}</div>
                                        </div>
                                    </div>
                                ))}
                                    <div className="intro-y paging">
                                        <nav>
                                            <ul className="pagination">
                                                {/* <li className="page-item">
                            <a className="page-link" href="#"> <Icon icon="lucide:chevrons-left" className="icon" /> </a>
                        </li> */}
                                                <li className={"page-item " + (hasPrevious ? "active" : "disabled")} onClick={fetchPrevious}>
                                                    <a className="page-link" href="javascript:;"> <Icon icon="lucide:chevron-left" className="icon" /> </a>
                                                </li>
                                                {/* <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                        <li className="page-item"> <a className="page-link" href="#">1</a> </li>
                        <li className="page-item active"> <a className="page-link" href="#">2</a> </li>
                        <li className="page-item"> <a className="page-link" href="#">3</a> </li>
                        <li className="page-item"> <a className="page-link" href="#">...</a> </li> */}
                                                <li className={"page-item " + (hasNext ? "active" : "disabled")} onClick={fetchNext}>
                                                    <a className="page-link" href="javascript:;"> <Icon icon="lucide:chevron-right" className="icon" /> </a>
                                                </li>
                                                {/* <li className="page-item">
                            <a className="page-link" href="#"> <Icon icon="lucide:chevrons-right" className="icon" /> </a>
                        </li> */}
                                            </ul>
                                        </nav>
                                        {/* <select className="form-select box">
                    <option>10</option>
                    <option>25</option>
                    <option>35</option>
                    <option>50</option>
                </select> */}
                                    </div></>
                            ) : (
                                <div>
                                    No notifications
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="intro-x dropdown profile-part" ref={profileRef}>
                    <div className="dropdown-toggle image-fit zoom-in" onClick={openProfile} role="button" aria-expanded="false" data-tw-toggle="dropdown">
                        <img alt="Avatar" src={currentUser?.image} />
                    </div>
                    <div className={profileClass}>
                        <ul className="dropdown-content">
                            <li>
                                {jwtDecode(token).role === 'Partner' ? (
                                    <>
                                        <div>{currentUser?.representative}</div>
                                        <div className=" dark:text-slate-500">{currentUser?.companyName}</div>
                                    </>
                                ) : (
                                    <>
                                        <div>{currentUser?.fullName}</div>
                                        <div className=" dark:text-slate-500">{currentUser?.role}</div>
                                    </>
                                )}
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a href="javascript:;" class="dropdown-item" onClick={handleProfileClick}> 
                                    <Icon icon="lucide:user" width={16} height={16} /> Profile </a>
                            </li>
                            {/* <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:edit" width={16} height={16} /> Add Account </a>
                            </li>
                            <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:lock" width={16} height={16} /> Reset Password </a>
                            </li>
                            <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:help-circle" width={16} height={16} /> Help </a>
                            </li> */}
                            {/* <li>
                                <hr className="dropdown-divider" />
                            </li> */}
                            <li>
                                <a href="/" class="dropdown-item"> <Icon icon="lucide:toggle-right" width={16} height={16} /> Logout </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='profile-popup' style={{display: showPopup ? "block" : "none"}}>
                <div className="profile-details">
                    <h2>User Profile</h2>
                    <div>
                        <div>
                            <div>
                                <img alt="avatar" src={currentUser?.image} />
                                <div title="Remove this profile photo?">
                                    {" "}
                                    <i data-lucide="x"></i>{" "}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <label htmlFor="update-profile-form-1">Full Name</label>
                                        <p>{currentUser?.fullName}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="update-profile-form-1">
                                            Position
                                        </label>
                                        <p>{currentUser?.position}</p>
                                    </div>

                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="update-profile-form-1">Username</label>
                                        <p>{currentUser?.username}</p>
                                    </div>
                                    <div className="inputDiv">
                                        <label className="label" htmlFor="update-profile-form-1">
                                            Password
                                        </label>
                                        <div className="" style={{ position: "relative" }}>
                                            <input
                                                className="password"
                                                type={showPassword ? "text" : "password"}
                                                id="update-profile-form-1"
                                                name="code"
                                                placeholder="Input text"
                                                value={currentUser?.password}
                                                disabled
                                                style={{
                                                    paddingRight: "2.5rem",
                                                    width: "100%",
                                                    height: "40px",
                                                    padding: "12px",
                                                    fontSize: "0.875rem",
                                                    lineHeight: "1.25rem"
                                                }}
                                            />

                                            <div
                                                className="toggle"
                                                onClick={togglePasswordVisibility}
                                                style={{
                                                    position: "absolute",
                                                    right: "0.5rem",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                }}
                                            >
                                                {showPassword ? (
                                                    <BsFillEyeFill className="icon" />
                                                ) : (
                                                    <BsFillEyeSlashFill className="icon" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <label htmlFor="update-profile-form-1">Email</label>
                                        <p>{currentUser?.email}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="update-profile-form-1">Date Of Birth</label>
                                        <p>{currentUser?.dob}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="update-profile-form-1">Phone Number</label>
                                        <p>{currentUser?.phone}</p>
                                    </div>
                                    <div>
                                        <label htmlFor="update-profile-form-1">Role</label>
                                        <p>{currentUser?.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="edit">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleCloseClick}
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-primary"
                            type="button"
                            style={{
                                backgroundColor: "blue",
                                color: "white",
                            }}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;