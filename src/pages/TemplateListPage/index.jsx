import { useEffect } from 'react';
import SaleManagerSidebar from '../../components/SaleManagerSidebar';
import './css/style.css';
import Header from '../../components/Header';

function TemplateList() {

    useEffect(() => {
    }, []);

    return (
        <div className='sale-manager-home'>
            <div className='home-body'>
                <div className='home-content'>
                    <SaleManagerSidebar />
                    <div className='content'>
                        <Header />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TemplateList;