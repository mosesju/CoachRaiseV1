import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import ButtonLink from './ButtonLink'


export default function CoachDashboard({ session }) {
    const [contacts, setContacts] = useState([])
    useEffect(()=>{
        const fetchData = async (user) => {
            console.log(user)
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
            console.log(contacts)
        }).catch(error=>{
            console.log(error)
        })
        // returns an array or objects. each object is a contact    
    },[contacts])
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
                {
                    contacts.map((contact, i) => {
                        return (
                            <tr key={i}>
                                <td>{contact.prospect_name}</td>
                                <td>{contact.prospect_email}</td>
                                <td>{contact.prospect_phone}</td>
                                <td>{contact.notes}</td>
                                <td><ButtonLink pageLink={ '/prospects/' + contact.id } linkText="See Details"/></td>
                            </tr>
                        )
                        
                    })
                }
                
            </tbody>
                <ul>
                    
                </ul>
        </div>

    )
}