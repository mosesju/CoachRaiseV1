import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useForm } from "react-hook-form";
import Link from 'next/link';
import Auth from './Auth';
import ButtonLink from './ButtonLink';

export default function Prospect({ session }) {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = async (formData) => {
        const user = supabase.auth.user();
        const { data, error } = await supabase
            .from('contacts')
            .insert([
                { 
                    user_id: user.id,
                    prospect_name: formData.prospect_name, 
                    prospect_email: formData.prospect_email,
                    prospect_phone: formData.prospect_phone,
                    notes: formData.notes
                    
                }
            ])
    }
    return (
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <input type="text" placeholder="Name" name="name" {...register("prospect_name")} />
                <input type="text" placeholder="Email" name="email" {...register("prospect_email")} />
                <input type="text" placeholder="Phone" name="phone" {...register("prospect_phone")} />
                <input type="textarea" placeholder="Notes" name="notes" {...register("notes")} />
                {errors.message && errors.message.message}
                <input type="submit" />
            </form>
            
        </div>
    )
}