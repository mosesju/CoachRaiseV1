import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import ButtonLink from './ButtonLink'


export default function AllDevelopmentContacts({ session }) {
    const preContact = [{profiles:{}}]
    const [contacts, setContacts] = useState(preContact)
    useEffect(()=>{
        const fetchData = async (user) => {
            const { data, error } = await supabase
                .from('contacts')
                .select(`
                    id,
                    prospect_name,
                    prospect_email,
                    prospect_phone,
                    notes,
                    profiles:user_id (
                        username
                    )
                    
                `)
                // I want to get the coaches name next to the contact
                // should be a join.. right?
                // profiles (
                    // username
                    // )
            console.log(data)
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
    },[])
    return(
        <div>
            <h1>All Contacts</h1>
            <tbody>
                <tr>
                    <th>Coach</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>notes</th>
                </tr>
                {
                    contacts.map((contact, i) => {
                        return (
                            <tr key={i}>
                                <td>{contact.profiles.username}</td>
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
        </div>

    )
}