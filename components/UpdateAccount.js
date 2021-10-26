import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function UpdateAccount() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [sport, setSport] = useState(null);
  const [role, setRole] = useState(null);
  const preSession = {user:{}}
  const [session, setSession] = useState(preSession)

  useEffect(() => {
    setSession(supabase.auth.session())
    console.log(session)
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, sport, role`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.log(role)
        // setUsername(data.username)
        // setWebsite(data.website)
        // setAvatarUrl(data.avatar_url)
        // setSport(data.sport)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, sport, role }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        sport,
        role,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <h1>Update Account</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <div onChange={(e) => setRole(e.target.value)}>
          <input type="radio" value="coach" name="role"/>Coach
          <input type="radio" value="Administrator" name="role"/>Administrator
        </div>
      </div>
      <div>
        <label htmlFor="sport">Sport</label>
        <input
          id="sport"
          type="sport"
          value={sport || ''}
          onChange={(e) => setSport(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, role, sport  })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
