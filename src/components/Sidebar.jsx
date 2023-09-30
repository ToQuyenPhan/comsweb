import { IoFileTrayStackedOutline } from 'react-icons/io5'
import { BiHomeSmile } from 'react-icons/bi'
import { LiaFileContractSolid } from 'react-icons/lia'
import { CgTemplate } from 'react-icons/cg';
import '../assets/css/style.css';

function Sidebar({openSidebarToggle, OpenSidebar}){
    return(
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <IoFileTrayStackedOutline className='icon_header' /> CoMS
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <BiHomeSmile className='icon' /> Home
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <LiaFileContractSolid className='icon' /> Contracts
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href=''>
                        <CgTemplate className='icon' /> Templates
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;