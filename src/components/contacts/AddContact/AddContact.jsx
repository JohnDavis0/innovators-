import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../utils";
import supabase from "../../../backend/supabase.js";

let AddContact = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    contact: {
      id:1,
      name: "",
      phone: "",
      email: "",
    },
    errorMessage: "",
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

  let submitForm = async (event) => {
    event.preventDefault();

    try {
      setState({ ...state, loading: true });

      let { data, error } = await supabase
        .from('UserData')
        .upsert([state.contact]);

      if (error) {
        alert('Bad REQUEST')
        throw new Error(error.message);
      }

      navigate('/contacts/list', { replace: true });
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate('/contacts/add', { replace: false });
    }
  };

  let { loading, contact, errorMessage } = state;

  return (
    <React.Fragment>
      
      <section className="add-contact p-3">
        <div className="container">
        <div className='row'>
                    <div className='col'>
                        <p className='h3 text-warning fw-bold'>
                            Add Contact
                        </p>
                        <p className='fst-italic'>

                        </p>
                    </div>
                </div>

          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required ={true}
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
                   required ={true}
                   name="phone"
                   value={contact.phone}
                   onChange={updateInput}
                    type="number"
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
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddContact;
