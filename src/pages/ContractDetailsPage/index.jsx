import { useEffect } from 'react';
import SaleManagerSidebar from '../../components/SaleManagerSidebar';
import './css/style.css';
import Header from '../../components/Header';
import Contract from './components/Contract';
import Comment from './components/Comment';
import Attachment from './components/Attachment';


function ContractDetails() {
    useEffect(() => {
        
    }, []);

    return (
        <div className='sale-manager-home'>
            <div className='home-body'>
                <div className='home-content'>
                    <SaleManagerSidebar />
                    <div className='content'>
                        <Header />
                        <div className='viewcontract'>
                            <div className='contract-column'>
                                <Contract />
                            </div>
                            <div className='comment-column'>
                                <Attachment />
                                <Comment />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ContractDetails;