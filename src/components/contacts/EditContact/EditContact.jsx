import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../../Spinner/Spinner.js";
import supabase from "../../../backend/supabase.js";

let EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      phone: "",
      email: "",
    },
    errorMessage: '',
  });

    let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async () => {
    try {
      setState({ ...state, loading: true });

      let { error } = await supabase
        .from('UserData')
        .update(state.contact)
        .eq('id', contactId);

      if (error) {
        throw new Error(error.message);
      }

      navigate('/contacts/list', { replace: true });
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, errorMessage } = state;
  
  return (
    <React.Fragment>
      {
        loading ? <Spinner/>:<React.Fragment>
         <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-primary fw-bold">Edit Contact</p>
              
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required="true"
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required="true"
                    name="phone"
                    value={contact.phone}
                    onChange={updateInput}
                    type="text"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                  
                  name="email"
                  value={contact.email}
                  onChange={updateInput}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                
                
                

              
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Update"
                  />
                  <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>

            <div className="col-md-6">
              <img
                src="https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
                className="img-fluid contact-img"
              />
            </div>
          </div>
        </div>
      </section>


        </React.Fragment>
      }
      
    </React.Fragment>
  );
};
export default EditContact;
