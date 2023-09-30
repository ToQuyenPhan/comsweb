import { BsFillBellFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
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
            <div className='header-right'>
                <BsFillBellFill className='icon' />
                <BsPersonCircle className='icon' />
            </div>
        </header>
    )
}

export default Header;