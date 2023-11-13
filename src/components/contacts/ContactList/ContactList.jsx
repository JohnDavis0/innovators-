import React, { useState, useEffect, } from "react";
import { Link, useLocation } from "react-router-dom";
import supabase from "../../../backend/supabase.js";
import Spinner from "../../Spinner/Spinner.js";
let ContactList = () => {
  const { state: { userData } } = useLocation();

  let [query, setQuery] = useState({
    text: '',
  });
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: '',
  });
  const userId = userData.id;
  useEffect(() => {
    const asyncFetchContacts = async () => {
      try {
        setState({ ...state, loading: true });
        let { data, error } = await supabase
          .from('UserData')
          .select('*')
          .eq('id', userId);
          
        if (error) {
          window.alert('Database fetch failed. Please try again later.');
          throw new Error(error.message);
        }
        setState({
          ...state,
          loading: false,
          contacts: data,
          filteredContacts: data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    asyncFetchContacts();
  }, []); // Empty dependency array to mimic componentDidMount
  // delete contact
  let clickDelete = async (contactId) => {
    try {
      setState({ ...state, loading: true });
      let { error } = await supabase
        .from('UserData')
        .delete()
        .eq('table_id', contactId);
      if (error) {
        throw new Error(error.message);
      }
      let { data: contactsAfterDeletion } = await supabase
        .from('UserData')
        .select('*');
      setState({
        ...state,
        loading: false,
        contacts: contactsAfterDeletion,
        filteredContacts: contactsAfterDeletion,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };
  // search contacts
  let searchContacts = (event) => {
    setQuery({
      ...query,
      text: event.target.value,
    });
    let filteredContacts = state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredContacts: filteredContacts,
    });
  };
  let { loading, filteredContacts } = state;
  
  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Contact Manager
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Welcome to contact list manager application. Please navigate
                  thorugh different areas and acknowledge yourself.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        type="text"
                        className="form-control"
                        placeholder="Search Names"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      {
        loading ? <Spinner/> : <React.Fragment>
<section className="contact-list my-5">
  <div className="container">
    <div className="row">
      {filteredContacts.length > 0 &&
        filteredContacts.map((contact, index) => (
          <div className="col-md-4" key={contact.id}>
            <div className="card mb-4 shadow-sm">
              {/* Content related to the contact's image or other details */}
              <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">
                  <strong>Mobile:</strong> {contact.phone}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {contact.email}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link
                      to={`/contacts/view/${contact.table_id}/`}
                      className="btn btn-sm btn-outline-warning"
                    >
                      <i className="fa fa-eye me-1" /> View
                    </Link>
                    <Link
                      to={`/contacts/view/${contact.table_id}/`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fa fa-pen me-1" /> Edit
                    </Link>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => clickDelete(contact.table_id)}
                  >
                    <i className="fa fa-trash me-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
</section>
      </React.Fragment>
      }
      
 
    </React.Fragment>
  )
};
export default ContactList;