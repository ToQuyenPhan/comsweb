import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/css/_side-nav.css';
import { Icon } from '@iconify/react';
import { $ } from 'react-jquery-plugin';
import logoImg from '../assets/img/hisoftlogo.jpg';

function SaleManagerSidebar() {
    const [icon, setIcon] = useState('lucide:chevron-up');
    const [url, setUrl] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    const openMenu = () => {
        $(".side-menu").on("click", function () {
            if ($(this).parent().find("ul").length) {
                if ($(this).parent().find("ul").first()[0].offsetParent !== null) {
                    $(this)
                        .find(".side-menu__sub-icon")
                        .removeClass("transform rotate-180");
                    $(this).removeClass("side-menu--open");
                    $(this)
                        .parent()
                        .find("ul")
                        .first()
                        .slideUp(300, function () {
                            $(this).removeClass("side-menu__sub-open");
                        });
                    setIcon("lucide:chevron-down");
                } else {
                    $(this)
                        .find(".side-menu__sub-icon")
                        .addClass("transform rotate-180");
                    $(this).addClass("side-menu--open");
                    $(this)
                        .parent()
                        .find("ul")
                        .first()
                        .slideDown(300, function () {
                            $(this).addClass("side-menu__sub-open");
                        });
                    setIcon("lucide:chevron-up");
                }
            }
        });
    }

    useEffect(() => {
        openMenu();
    }, [])

    return (
        <aside>
            <nav className='side-nav'>
                <a href="" className='side-brand'>
                    <img alt="Hisoft Logo" src={logoImg} />
                </a>
                <div className='side-nav__devider'></div>
                <ul>
                    <li>
                        <a href="/home" className={"side-menu " + (url === "/home" ? "side-menu--active" : "")}>
                            <div className="side-menu__icon"><Icon icon="mdi:monitor-dashboard" color={(url === "/home" ? "#000000" : "#ffffff")} width={24} height={24} /></div>
                            <div className="side-menu__title">
                                Dashboard
                                {/* <div className="side-menu__sub-icon transform"><Icon icon={icon} width={16} height={16} /></div> */}
                            </div>
                        </a>
                        
                    </li>
                    <li>
                        <a href={(url === "/contract" ? "#" : "/contract")} className={"side-menu " + (url === "/contract" || "/create-contract" ? "side-menu--active" : "")}>
                            <div className="side-menu__icon"><Icon icon="lucide:layout-template" color={(url === "/contract" || "/create-contract" ? "#000000" : "#ffffff")} width={24} height={24} /></div>
                            <div className="side-menu__title">
                                Contracts
                                <div className="side-menu__sub-icon transform"><Icon icon={icon} width={16} height={16} /></div>
                            </div>
                        </a>
                        <ul class="side-menu__sub-open">
                            <li>
                                <a href="/contract" className={"side-menu " + (url === "/contract" ? "side-menu--active" : "")}>
                                    <div class="side-menu__icon"> <Icon icon="lucide:list" className='icon'/></div>
                                    <div class="side-menu__title"> View Contracts </div>
                                </a>
                            </li>
                            <li>
                                <a href="/create-contract" className={"side-menu " + (url === "/create-contract" ? "side-menu--active" : "")}>
                                    <div class="side-menu__icon"> <Icon icon="gridicons:create" className='icon'/> </div>
                                    <div class="side-menu__title"> Create New </div>
                                </a>
                            </li>
                            
                        </ul>
                        <li>
                            <a href="##" className={"side-menu " + (url === "" ? "side-menu--active" : "")}>
                            <div className="side-menu__icon"><Icon icon="mdi:monitor-dashboard" color={(url === "/" ? "#000000" : "#ffffff")} width={24} height={24} /></div>
                            <div className="side-menu__title">
                                Audit Trail
                                {/* <div className="side-menu__sub-icon transform"><Icon icon={icon} width={16} height={16} /></div> */}
                            </div>
                        </a>
                            </li>
                    </li>
                    
                </ul>  
            </nav>
        </aside>
    )
}

export default SaleManagerSidebar;