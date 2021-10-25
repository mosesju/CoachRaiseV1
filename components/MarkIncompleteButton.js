import { supabase } from '../utils/supabaseClient'


const MarkIncompleteButton = ({buttonText, requestId}) => {
    const updateDB = async () => {
        const { data, error } = await supabase
            .from('stewardship_requests')
            .update({ status: false })
            .match({ id: requestId })
        console.log(data)
    }
    
    return (
        <div>
            <button onClick={updateDB} className="markIncompleteButton">
                { buttonText }
            </button>
        </div>
    )
}
export default MarkIncompleteButton;