import Account from '../components/UpdateAccount'
import ViewAccount from '../components/ViewAccount'
import { supabase } from '../utils/supabaseClient'
import {useState,useEffect} from 'react'
import NavBar from '../components/NavBar'

export default function AccountPage() {
    const [session, setSession] = useState(null)

    useEffect(() => {
      setSession(supabase.auth.session())  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    })

    return (
      <div>
        <NavBar />
        <h1>Account</h1>
        <ViewAccount />
        <Account />
      </div>
      
    );
}