import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Dropdown from './Dropdown'


export default function CoachDropdown() {
    const starterData = {
        label: 'Choose Coach',
        value: 'coach'
    }
    const [selected, setSelected] = useState(starterData);
    const [options, setOptions] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            // Should query all coaches for dropdown
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    username                   
                `)
                // I want to get the coaches name next to the contact
                // should be a join.. right?
                // profiles (
                    // username
                    // )
                
            return data;
        }
        fetchData().then((data)=> {
            // console.log(data)
            setOptions(data);
        }).catch(error=>{
            console.log(error)
        })
        // returns an array or objects. each object is a contact    
    },[])

    return(
        <div>
            <h1>CoachDropdown</h1>
            <Dropdown 
                label='Coach'
                options={options}
                selected={selected}
                onSelectedChange={setSelected}
            />
        </div>
    )
}