import '../css/style.css';
import GeneralReport from './GeneralReport';
import RecentActivities from './RecentActivities';
import CategoryManagement from './CategoryManagement';
import PartnerManagement from './PartnerManagement';

function Home() {
    return (
        <div>
            <div className="main">
                <div className="main-body">
                    <div className="main-content">
                        {/* <!-- BEGIN: General Report --> */}
                        <GeneralReport />
                        {/* <!-- END: General Report -->
                        <!-- BEGIN: Weekly Top Products --> */}
                        <PartnerManagement />
                        {/* <!-- END: Weekly Top Products --> */}
                        <CategoryManagement />
                    </div>
                </div>
                <div className="side-body">
                    <div className='side-content'>
                        <div className="side-content-body">
                            {/*<!-- BEGIN: Recent Activities --> */}
                            <RecentActivities />
                            {/* <!-- END: Recent Activities -->*/}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;