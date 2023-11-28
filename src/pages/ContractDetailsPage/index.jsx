import { useEffect } from 'react';
import SaleManagerSidebar from '../../components/SaleManagerSidebar';
import './css/style.css';
import Header from '../../components/Header';
import Contract from './components/Contract';
import Comment from './components/Comment';
import Attachment from './components/Attachment';
import Export from './components/Export';
import Sidebar from '../../components/Sidebar';


function ContractDetails() {
    useEffect(() => {
        
    }, []);

    return (
        
        <div className='sale-manager-home'>
            <div className='home-body'>
                <div className='home-content'>
                    <header className='header'>
                        <Sidebar />
                    </header>
                    <div className='content'>
                        <Header />
                        <div class="intro-y grid grid-cols-11 gap-5 mt-5 items-start">
                            <div class="col-span-12 lg:col-span-7 2xl:col-span-8">
                                <Contract />
                            </div>
                            <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
                                <Export/>
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