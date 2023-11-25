import { useEffect } from 'react';
import SaleManagerSidebar from '../../components/SaleManagerSidebar';
import './css/style.css';
import Header from '../../components/Header';
import Contract from './components/Contract';

function CreateContract() {

    useEffect(() => {
    }, []);

    return (
        <div className='sale-manager-home'>
            <div className='home-body'>
                <div className='home-content'>
                    <SaleManagerSidebar />
                    <div className='content'>
                        <Header />
                        <Contract />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateContract;import { useEffect } from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './css/style.css';
import Contract from './components/Contract';

function CreateContract() {
    const navigate = useNavigate();

    useEffect(() => {
        // if (localStorage) {
        //     var token = localStorage.getItem('Token');
        //     if (token === null) {
        //         navigate('/');
        //     } else {
        //         if (jwtDecode(token).Role !== 'Staff') {
        //             navigate('/');
        //         }
        //     }
        // }
    }, [])

    return (
        <div className='home'>
            <div className='home-body'>
                <div className='home-content'>
                    <Sidebar />
                    <div className='content'>
                        <Header />
                        {/* <Contract /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateContract;