import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'


export default function RequestMoves() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    // const [selected, setSelected] = useState(starterData);
    const [coaches, setCoaches] = useState([]);
    const [contacts, setContacts] = useState([]);

    const moveOptions = [
        {
            label: 'Cultivation',
            value: 'Cultivaiton'
        },
        {
            label: 'Solicitation',
            value: 'Solicitation'
        },
        {
            label: 'Stewardship',
            value: 'Stewardship'
        }
    ]


    const onSubmit = async (formInput) =>{
        const { data, error } = await supabase
            .from('stewardship_requests')
            .insert([
                formInput
        ])
    }

    useEffect(()=>{
        const fetchCoaches = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    username,
                    id
                `)
            return data;
        }
        const fetchContacts = async() => {
            const { data, error } = await supabase
                .from('contacts')
                .select(`
                    prospect_name,
                    id
                `)
            return data;
        }
        fetchCoaches().then((data)=> {
            setCoaches(data);
        }).catch(error=>{
            console.log(error)
        })

        fetchContacts().then((data) => {
            setContacts(data)

        }).catch(error=>{
            console.log(error)
        })

    },[])
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>CoachDropdown</h1>
            {/* register is what's returned in the JSON */}
            {/* Coach making move */}
            <label>Choose Coach</label>
            <select name="coach" {...register("coach")} >
                {coaches.map(coach => 
                    <option key={coach.id} value={coach.id}>{coach.username}</option>
                )}
            </select>
            {/* Contact for move */}
            <label>Choose Contact</label>
            <select name="contact" {...register("contact")}>
                {contacts.map(contact=>
                    <option key={contact.id} value={contact.id}>{contact.prospect_name}</option>
                )}
            </select>
            {/* Move type */}
            <label>Choose Move Type</label>
            <select name="moveType" {...register("move_type")}>
                {moveOptions.map(moveOption=>
                    <option key={moveOption.id} value={moveOption.value}>{moveOption.label}</option>
                )}
            </select>
            <label>Add Notes</label>
            <input {...register("notes")}/>
            <input type="submit" />
        </form>
    )
}