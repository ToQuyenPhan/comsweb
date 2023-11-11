import { useState, useEffect } from 'react'
import Header from '../../components/Header';
import Home from './components/Home';
import Sidebar from '../../components/Sidebar';
import Mode from './components/Mode';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './css/style.css';

function HomePage() {
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
                        <Home />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;