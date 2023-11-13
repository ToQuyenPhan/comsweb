import { useEffect } from 'react';
import SaleManagerSidebar from '../../components/SaleManagerSidebar';
import './css/style.css';
import Header from '../../components/Header';
import Template from './components/Template';
import Topbar from './components/Topbar';

function CreateTemplate() {

    useEffect(() => {
    }, []);

    return (
        <div className='sale-manager-home'>
            <div className='home-body'>
                <div className='home-content'>
                    <SaleManagerSidebar />
                    <div className='content'>
                        <Header />                       
                        <Topbar />
                        <Template />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateTemplate;