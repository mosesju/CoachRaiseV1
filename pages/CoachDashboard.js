import AllContacts from '../components/AllContacts'
import ViewMoveRequests from '../components/ViewMoveRequests'
import NavBar from '../components/NavBar'
export default function CoachDashboard({ session }) {
    return(
        <div>
            <NavBar />
            CoachDashboard
            {/* <AllContacts /> */}
            <ViewMoveRequests />
        </div>
    )
}