import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange })=>{
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        const onBodyClick = (event) =>{
            // This if closes the navbar after clicking on an element
            // Ref refers to a dom element
            if(ref.current.contains(event.target)){
                return false
            }
            setOpen(false);
        }
        
        document.body.addEventListener('click', onBodyClick);
        // This is a cleanup function
        return() =>{
            document.body.removeEventListener('click', onBodyClick);
        };
    },[options])

    const renderedOptions = options.map((option)=>{
        console.log('rendered options')
        console.log(options)
        if(option.value === selected.value){
            return null;
        }
        return  (
            <div 
                key={ option.value } 
                className="item"
                onClick={()=>{
                    onSelectedChange(option)
                }}
            >
                {option.username}
            </div>
        )
    }, []);
    return (
        <div ref = {ref}
            className='ui form'
        >
            <div>
                <label>{label}</label>
                <div 
                    onClick={()=>{
                        setOpen(!open);
                    }} 
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i></i>
                    <div>{ selected.label }</div>
                    <div onClick={()=>{setOpen(!open)}} className={`menu ${open ? 'visible transition':''}`}>{renderedOptions}</div>
                </div>
            </div>
        </div>
    )
}
export default Dropdown;