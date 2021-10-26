import ButtonLink from './ButtonLink'
const NavBar = () => {
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