import React, { useEffect, useState} from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import Spinner from "../../Spinner/Spinner.js";
import supabase from "../../../backend/supabase.js";

const EditContact = () => {
  const navigate = useNavigate();
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

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      setState({ ...state, loading: true });

      let { error } = await supabase
        .from('UserData')
        .update(state.contact)
        .eq('table_id', table_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      navigate('/contacts/list', { replace: true });
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate('/contacts/edit', { replace: true });
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
                    required
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
                    name="phone"
                    required
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
