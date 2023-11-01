import './reportsPage.scss';
import react, { useState } from 'react';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import Tabs from '../../components/tabs/tabs';
import Reports from '../../components/reports/reports';
import Report_Image from '../../components/reports/view_post_img';

function AdvertisementsPage() {

    const [postImageDisplayed, setpostImageDisplayed] = useState(0);


    return (
        <div className="reportss_main">
            <div className="reports_navbar">
                <AdminNavbar />
                <Tabs />
            </div>
            <div className="reports_body">
                <Reports postImageDisplayed={postImageDisplayed} setpostImageDisplayed={setpostImageDisplayed} />
                {postImageDisplayed !== 0 && <Report_Image postImageDisplayed={postImageDisplayed} setpostImageDisplayed={setpostImageDisplayed} />}

                {/* <Report_Image /> */}
            </div>
        </div>
    );
}

export default AdvertisementsPage;