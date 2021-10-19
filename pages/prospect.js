import { useForm } from "react-hook-form";
// const request = require("request");
const Airtable = require('airtable');

const Prospect = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = async (data) => {
        const base = new Airtable({apiKey: 'keydWixOvWOf2ZWiL'}).base('appXDepETtaOyFrMm');

        base('CoachContacts').create([
            {
              "fields": {
                "Name": data.name,
                "Email": data.email,
                "Phone": data.phone,
                "Notes": "met just nwo \n"
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
            });
          });

    }
    return(
        <div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <input type="text" placeholder="Name" name="name" {...register("name")} />
                <input type="text" placeholder="Email" name="email" {...register("email")} />
                <input type="text" placeholder="Phone" name="phone" {...register("phone")} />
                {/* Add Notes textarea */}
                {errors.message && errors.message.message}
                <input type="submit" />
            </form>
            
        </div>
    );
}
export default Prospect;