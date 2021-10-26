import AllDevelopmentContacts from '../components/AllDevelopmentContacts'
import RequestMoves from '../components/RequestMoves'
import NavBar from '../components/NavBar'

export default function CoachDashboard({ session }) {
    return(
        <div>
            <NavBar />
            Development Dashboard
            <AllDevelopmentContacts />
            {/* <RequestMoves /> */}
        </div>
    )
}