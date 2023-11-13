import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';
import supabase from "../../../backend/supabase.js";

const ViewContact = () => {
  const { table_id } = useParams();


  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      phone: "",
      email: "",
    },
    errorMessage: '',
  });

  useEffect(() => {
    asyncFetchContact();
  }, [table_id]);

  const asyncFetchContact = async () => {
    try {
      setState({ ...state, loading: true });

      let { data, error } = await supabase
        .from('UserData')
        .select('*')
        .eq('table_id', table_id)
        .single();
       
      if (error) {
        throw new Error(error.message);
      }

      setState({
        ...state,
        loading: false,
        contact: data,
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
      setState({
        ...state,
        loading: false,
        errorMessage: 'Contact not found.',
      });
    }
  };

    let { loading, contact, errorMessage} = state;
    return(
        <React.Fragment>
           <section className='view-contact-intro  p-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='h3 text-warning fw-bold'>
                            View Contact
                        </p>
                        <p className='fst-italic'>

                        </p>
                    </div>
                </div>
                </div>
           </section>

           {
            loading ? <Spinner/>: <React.Fragment>
           { 
             Object.keys(contact).length > 0 &&

             <section className="view-contact mt-3">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-3">
        <img
          src="https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
          alt="avatar"
          className="contact-img img-fluid" // Added 'img-fluid' class to make the image responsive
        />
      </div>
      <div className="col-md-9">
        <div className="card">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item list-group-item-action">
                <strong>NAME:</strong> {contact.name}
              </li>
              <li className="list-group-item list-group-item-action">
                <strong>MOBILE:</strong> {contact.phone}
              </li>
              <li className="list-group-item list-group-item-action">
                <strong>EMAIL:</strong> {contact.email}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-9 offset-md-3"> {/* Adjusted the offset to move the button closer to the text box */}
        <Link to={'/contacts/list'} className="btn btn-warning">
          Back
        </Link>
      </div>
    </div>
  </div>
</section>


}
            </React.Fragment>
           }

        </React.Fragment>
    )
};
export default ViewContact;
