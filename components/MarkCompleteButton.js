import { supabase } from '../utils/supabaseClient'


const MarkCompleteButton = ({buttonText, requestId}) => {
    const updateDB = async () => {
        const { data, error } = await supabase
            .from('stewardship_requests')
            .update({ status: true })
            .match({ id: requestId })
        console.log(data)
    }
    
    return (
        <div>
            <button onClick={updateDB} className="markCompleteButton">
                { buttonText }
            </button>
        </div>
    )
}
export default MarkCompleteButton;