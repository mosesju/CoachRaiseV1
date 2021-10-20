import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'

const Details = () => {
    let pathname = window.location.pathname
    // this is a security issue. Figure it out.
    pathname = pathname.split('/');
    const contactId = pathname[2].toString();
    console.log(contactId)
    const [contact, setContact] = useState({})

    // const [contact, setContact] = useState('')
    useEffect(()=>{
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('contacts')
                .select()
                .match({ id: contactId })
            return data;
        }
        fetchData().then((data)=> {
            setContact(data[0])
            }).catch(error=>{
                console.log(error)
            })
        // returns an array or objects. each object is a contact    
    },[])

    return (
        <div>
            <h1>Details</h1>
            <h2>{ contact.prospect_name }</h2>
            <h4>{ contact.prospect_phone }</h4>
            <Link href={ 'mailto:' + contact.prospect_email }>
                <h4>{ contact.prospect_email }</h4>
            </Link>
            <p>{ contact.notes } </p>

        </div>
        
    );
}
export default Details;

// Probably the way you should do it
// export const getStaticPaths = async({session}) => {
//     const user = supabase.auth.user().id
//     console.log(user)
//     const data = await supabase
//         .from('contacts')
//         .select()
//         .match({ user_id: user })
//     const paths = data.map(contact => {
//         return {
//             params:{ id: contact.id.toString() }
//         }
//     })
//     return {
//         paths,
//         fallback: false
//     }
// }

// export const getStaticProps = async (context) => {
//     console.log(context)
//     const id = context.params.id;
//     const contactData = await supabase
//     .from('contacts')
//         .select()
//         .match({ id: id })

//     return {
//         props: {contact: contactData}
//     }
// }

// const Details = ({ contact }) => {
//     const user = supabase.auth.user().id
//     console.log(user)

//     return (
//       <div>
//         <h1>Details</h1>
//         {/* <h1>{ contact.prospect_name}</h1>
//         <p>{ contact.prospect_phone }</p> */}

//       </div>
//     );
//   }
  
//   export default Details;