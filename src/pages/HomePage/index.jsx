import { useState } from 'react'
import Header from '../../components/Header';
import Home from './components/Home';
import Sidebar from '../../components/Sidebar';
import './css/style.css';

function HomePage(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return(
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Home />
        </div>
    )
}

export default HomePage;