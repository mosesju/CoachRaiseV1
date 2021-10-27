import ButtonLink from './ButtonLink'
import { useState } from 'react'

const NavBar = () => {
    const [session, setSesstion] = useState();
    return (
        <div>
            <ButtonLink pageLink={'/'} linkText={'Home'}/>
            <ButtonLink pageLink={'/CoachDashboard'} linkText={'Coach Dashboard'} />
            <ButtonLink pageLink={'/DevelopmentDashboard'} linkText={'Development Dashboard'} />
            <ButtonLink pageLink={'/AccountPage'} linkText={'Account'} />
        </div>
    )
}
export default NavBar;