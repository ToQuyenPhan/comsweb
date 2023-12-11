import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SaleManagerSidebar from '../../components/SaleManagerSidebar';
import Header from '../../components/Header';

function TemplateDetails() {
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    const authen = () => {
        if(token === null){
            navigate('/');
        }
    }

    useEffect(() => {
        authen();
    }, []);

    return token !== null ? (
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
    ) : null;
}
export default TemplateDetails;