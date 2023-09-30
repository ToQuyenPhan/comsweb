import { BsFillBellFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import '../assets/css/style.css';

function Header({OpenSidebar}){
    return(
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenSidebar}/>
            </div>
            <div className='header-left'>
                <BsSearch className='icon' />
            </div>
            <div className='header-right menu-container'>
                <BsFillBellFill className='icon' />
                <img className='icon avatar menu-trigger'
                    src='https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/378312065_3646078839050133_6402680649090857184_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=vbmNmfzQAIAAX8Fa7z-&_nc_ht=scontent.fsgn2-5.fna&_nc_e2o=f&oh=00_AfDS_92mDN5rrjv0B0fKG1_wAyzMOksAZo4gR13cp0vKiA&oe=651D4756' />
                <div className='dropdown-menu'>
                    <h3>Nguyen Thanh Tam<br /><span>Leader</span></h3>
                    <ul>
                        <li className='dropdown-item'>
                            <BsPersonCircle className='icon' />
                            <a href=''>My Profile</a>
                        </li>
                        <li className='dropdown-item'>
                            <AiOutlineLogout className='icon' />
                            <a href=''>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;