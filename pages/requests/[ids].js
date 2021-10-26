import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'
import MarkCompleteButton from '../../components/MarkCompleteButton'
import MarkIncompleteButton from '../../components/MarkIncompleteButton'


const RequestDetails = () => {
    let pathname = window.location.pathname
    // this is a security issue. Figure it out.
    pathname = pathname.split('/');
    const contactId = pathname[2].toString();
    const request = {contacts:{}}
    const [requestDetails, setRequestDetails] = useState(request)

    useEffect(()=>{
        console.log('request fired')
        const fetchStewardshipRequest = async () => {
            const { data, error } = await supabase
                .from('stewardship_requests')
                .select(`
                    id,
                    move_type,
                    notes,
                    status,
                    contacts (
                        id,
                        prospect_name,
                        prospect_email,
                        prospect_phone,
                        notes
                    )
                    `)
                .match({ id: contactId})
            return data;
        }
        fetchStewardshipRequest().then((data)=> {
            let returnObj = data[0]
            console.log(returnObj.status)
            setRequestDetails(returnObj)
            }).catch(error=>{
                console.log(error)
            })
    },[status])

    return (
        <div>
            {/* change the color of the link */}
            {/* This button should be green when you mark as complete and red when incomplete */}
            {/* { requestDetails && requestDetails.contacts */}
            <div>
                <h1>Request Details</h1> 
                <h2>{ requestDetails.contacts.prospect_name }</h2>
                <h3>{ requestDetails.move_type } Move</h3>
                <h3>Current Status: { requestDetails.status ?  'Complete' : 'Incomplete' }</h3>
                <h4>Move Notes</h4>
                <p>{ requestDetails.notes }</p>
                <h4>{ requestDetails.contacts.prospect_phone }</h4>
                
                <Link href={ 'mailto:' + requestDetails.contacts.prospect_email }>
                    <h4>{ requestDetails.contacts.prospect_email }</h4>
                </Link>
                <h4>Notes about Prospect</h4>
                <p>{ requestDetails.contacts.notes } </p> 
                { requestDetails.status ? <MarkIncompleteButton buttonText="Incomplete" requestId='1'/> : <MarkCompleteButton buttonText="Complete" requestId='1' /> } 
            </div>
            {/* } */}
        </div>
        
    );
}
export default RequestDetails;