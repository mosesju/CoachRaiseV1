import { useState, useEffect } from "react"
import { supabase } from '../utils/supabaseClient'
import Link from 'next/link'


export default function ViewAccount() {
    const preSession = {user:{}}
    const [session, setSession] = useState(preSession)
    const [profile, setProfile] = useState({})

    async function getProfile() {
        try {
          const user = supabase.auth.user()
    
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, sport, role, email`)
            .eq('id', user.id)
            .single()

            
          if (error && status !== 406) {
            throw error
          }
          return data;
        } catch (error) {
          alert(error.message)
        } 
      }

    useEffect(() => {
        setSession(supabase.auth.session())
        console.log(session)
        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    })

    useEffect(() => {
        getProfile().then((data)=>{
            console.log(data)
            setProfile(data)
            console.log("profile: ", profile)
        })
    }, [])

    
    return (
        <div>
            <h1>{profile.username}'s Profile</h1>
            <h3>{ profile.sport } { profile.role }</h3>
            <Link href={ 'mailto:' + profile.email }>
                <h4>Email: { profile.email }</h4>
            </Link>
        </div>
    )
}