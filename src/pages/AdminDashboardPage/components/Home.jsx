import '../css/style.css';
import GeneralReport from './GeneralReport';
import UserManagement from './UserManagement';

function AdminDashboard() {
    return (
        <div>
            <div className="main">
                {/* <!-- BEGIN: General Report --> */}
                <GeneralReport />
                {/* <!-- END: General Report -->                   
                        <!-- BEGIN: Weekly Top Products --> */}
                <UserManagement />
                {/* <!-- END: Weekly Top Products --> */}

            </div>
        </div>
    )
}

export default AdminDashboard;