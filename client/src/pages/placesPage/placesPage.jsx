import './placesPage.scss';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import Tabs from '../../components/tabs/tabs';
// import Places from '../../components/places/places';
import Trip from '../../components/trip/trip';
import Destination from '../../components/trip/destination'

function PlacesPage() {
    return (
        <div className="places_main">
            <div className="places_navbar">
                <AdminNavbar />
                <Tabs />
            </div>
            <div className="places_body">
                <Trip />
            </div>
        </div>
    );
}

export default PlacesPage;