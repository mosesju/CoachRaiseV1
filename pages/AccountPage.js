import Account from '../components/Account'
import { supabase } from '../utils/supabaseClient'
import {useState,useEffect} from 'react'

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
        <h1>Account</h1>
        <Account session={ session } />
      </div>
      
    );
}