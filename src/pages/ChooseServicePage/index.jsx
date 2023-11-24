import { useEffect } from 'react';
import StaffSidebar from '../../components/StaffSidebar';
import './css/style.css';
import Header from '../../components/Header';
import Service from './components/service';

function ChooseService() {

    useEffect(() => {
    }, []);

    return (
        <div className='sale-manager-home'>
            <div className='home-body'>
                <div className='home-content'>
                    <StaffSidebar />
                    <div className='content'>
                        <Header />
                        <Service />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChooseService;