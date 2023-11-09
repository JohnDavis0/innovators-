import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { ContactService } from '../../../utils';
import Spinner from '../../Spinner/Spinner';

let ViewContact = () =>   {

    let {contactId} = useParams();

    let [state, setState] = useState({
       loading: false,
       contact : {},
       errorMessage :''
    });

    useEffect(() => {
      const asyncFetchDailyData = async () => {
        try{
          setState({...state, loading: true});
          let response = await ContactService.getContact(contactId);
         setState({
            ...state, 
            loading:false,
            contact : response.data
         });

        }catch(error){

          setState({
            ...state, 
            loading:false,
            errorMessage: error.message
         });
        }
      }
        asyncFetchDailyData()
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