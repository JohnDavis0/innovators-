import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {
  const { contactId } = useParams();

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
    const asyncFetchContact = async () => {
      try {
        setState({ ...state, loading: true });

        // Assuming 'UserData' table structure includes fields like 'id', 'name', 'phone', 'email'
        let { data, error } = await supabase
          .from('UserData')
          .select('*')
          .eq('id', contactId)
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
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };

    asyncFetchContact();
  }, [contactId]);

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
                    <div className="col-md-4">
                      
                    </div>
                    <div className="col-md-8">
                    <ul className="list-group">
                       
                        <li className="list-group-item list-group-item-action">
                          NAME : <span className="fw-bold">{contact.name}</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          MOBILE : <span className="fw-bold">{contact.phone}</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          EMAIL : <span className="fw-bold">{contact.email}</span>
                        </li>
                      </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
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
