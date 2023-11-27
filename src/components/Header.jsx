import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { $ } from 'react-jquery-plugin';
import { Icon } from '@iconify/react';
import { jwtDecode } from 'jwt-decode';
import '../assets/css/_top-bar.css';

function Header() {
    const [notificationClass, setNotificationClass] = useState('notification-content dropdown-menu');
    const [profileClass, setProfileClass] = useState('dropdown-menu');
    const fullName = localStorage.getItem("FullName");
    const location = useLocation();
    let notificationRef = useRef(null);
    let profileRef = useRef(null);
    const token = localStorage.getItem("Token");

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

    document.addEventListener('mousedown', closeNotificationMenu);
    document.addEventListener('mousedown', closeProfileMenu);

    useEffect(() => {
        openSearch();
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
                        <div className='notification--bullet'></div>
                    </div>
                    <div className={notificationClass}>
                        <div className="notification-content__box dropdown-content">
                            <div className="notification-content__title">Notifications</div>
                            <div className="notification-item-first">
                                <div>
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-7.jpg"> */}
                                    <div className="dark:border-darkmode-600"></div>
                                </div>
                                <div>
                                    <div>
                                        <a href="javascript:;">Kevin Spacey</a>
                                        <div>01:10 PM</div>
                                    </div>
                                    <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500</div>
                                </div>
                            </div>
                            <div className="notification-item-first">
                                <div>
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-2.jpg"> */}
                                    <div className="dark:border-darkmode-600"></div>
                                </div>
                                <div>
                                    <div>
                                        <a href="javascript:;">Johnny Depp</a>
                                        <div>01:10 PM</div>
                                    </div>
                                    <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 20</div>
                                </div>
                            </div>
                            <div className="notification-item-first">
                                <div className="image-fit">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-5.jpg"> */}
                                    <div className="dark:border-darkmode-600"></div>
                                </div>
                                <div>
                                    <div>
                                        <a href="javascript:;">Johnny Depp</a>
                                        <div>05:09 AM</div>
                                    </div>
                                    <div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomi</div>
                                </div>
                            </div>
                            <div className="notification-item-first">
                                <div className="image-fit">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-9.jpg"> */}
                                    <div className="dark:border-darkmode-600"></div>
                                </div>
                                <div>
                                    <div>
                                        <a href="javascript:;">Morgan Freeman</a>
                                        <div>01:10 PM</div>
                                    </div>
                                    <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 20</div>
                                </div>
                            </div>
                            <div className="notification-item-first">
                                <div className="image-fit">
                                    {/* <img alt="Midone - HTML Admin Template" class="rounded-full" src="dist/images/profile-1.jpg"> */}
                                    <div className="dark:border-darkmode-600"></div>
                                </div>
                                <div>
                                    <div>
                                        <a href="javascript:;">Denzel Washington</a>
                                        <div>03:20 PM</div>
                                    </div>
                                    <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="intro-x dropdown profile-part" ref={profileRef}>
                    <div className="dropdown-toggle image-fit zoom-in" onClick={openProfile} role="button" aria-expanded="false" data-tw-toggle="dropdown">
                        <img alt="Avatar" src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/281349832_3114845732069443_2942167027652900504_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zOsWlA8MS6UAX-hJcio&_nc_ht=scontent.fsgn5-6.fna&_nc_e2o=f&oh=00_AfDcA8QzxAVu7f0crqkTF-33hc5doV1vqCCqjTUxdAPBfg&oe=65339CBE" />
                    </div>
                    <div className={profileClass}>
                        <ul className="dropdown-content">
                            <li>
                                {jwtDecode(token).role === 'partner' ? (
                                    <>
                                        <div>{jwtDecode(token).representative}</div>
                                        <div className=" dark:text-slate-500">Software Engineer</div>
                                    </>
                                ) : (
                                    <>
                                        <div>{jwtDecode(token).fullName}</div>
                                        <div className=" dark:text-slate-500">Software Engineer</div>
                                    </>
                                )}
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:user" width={16} height={16} /> Profile </a>
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
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a href="/" class="dropdown-item"> <Icon icon="lucide:toggle-right" width={16} height={16} /> Logout </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;