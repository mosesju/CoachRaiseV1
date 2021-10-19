import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'


export default function CoachDashboard({ session }) {
    const [contacts, setContacts] = useState([])
    useEffect(()=>{
        const fetchData = async (user) => {
            const { data, error } = await supabase
                .from('contacts')
                .select()
                .match({ user_id: user })
            return data;
        }
        const user = supabase.auth.user().id;
        fetchData(user).then((data)=> {
            // console.log(data)
            setContacts(data);
        }).catch(error=>{
            console.log(error)
        })
        // returns an array or objects. each object is a contact    
    })
    return(
        <div>
            <h1>All Contacts</h1>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>notes</th>
                </tr>
                <ul>
                    {
                        contacts.map(contact => {
                            <li key={contact.id}>{contact.prospect_name}</li>
                        })
                    }
                </ul>

                {/* // <tr key={i}>
                //     <td>{item.prosepct_name}</td>
                //     <td>{item.prospect_email}</td>
                //     <td>{item.prospect_phone}</td>
                //     <td>{item.notes}</td>
                //     <button>
                //         <Link href='/ProspectPage/{}'>
                //             <a>CoachDashboard</a>
                //         </Link>
                //     </button>
                //   </tr> */}
            </tbody>
        </div>

    )
}