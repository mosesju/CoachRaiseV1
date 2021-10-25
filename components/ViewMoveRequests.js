import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import ButtonLink from './ButtonLink'

export default function ViewMoveRequests({ session }) {
    const [requests, setRequest] = useState([])
    useEffect(()=>{
        const fetchStewardshipRequest = async (user) => {
            const { data, error } = await supabase
                .from('stewardship_requests')
                .select(`
                    id,
                    move_type,
                    notes,
                    status,
                    contacts (
                        id,
                        prospect_name
                    )
                    `)
                .match({ coach: user })
            return data;
        }
        const user = supabase.auth.user().id;
        fetchStewardshipRequest(user).then((data)=> {
            // console.log(data)
            console.log("viewmoverequest")
            console.log(data)
            setRequest(data);
        }).catch(error=>{
            console.log(error)
        })
        // returns an array or objects. each object is a contact    
    },[])
    return(
        <div>
            <h1>View Requests</h1>
            <tbody>
                <tr>
                    <th>Prospect</th>
                    <th>Move Type</th>
                    <th>Status</th>
                    <th>See Details</th>
                </tr>
                {
                    requests.map((request, i) => {
                        return (
                            <tr key={i}>
                                <td>{request.contacts.prospect_name}</td>
                                <td>{request.move_type}</td>
                                <td>{request.status ? 'Complete':'Incomplete'}</td>
                                <td><ButtonLink pageLink={ '/requests/' + request.id } linkText="See Details"/></td> 
                            </tr>
                        )
                        
                    })
                }
                
            </tbody>
        </div>

    )
}