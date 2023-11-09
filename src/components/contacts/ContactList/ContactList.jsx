import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../../backend/supabase.js";
import Spinner from "../../Spinner/Spinner.js";

let ContactList = () => {
  let [query, setQuery] = useState({
    text: '',
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: '',
  });

  useEffect(() => {
    const asyncFetchContacts = async () => {
      try {
        setState({ ...state, loading: true });

        let { data, error } = await supabase
          .from('UserData')
          .select('*');

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
        .from('UserAuth')
        .delete()
        .eq('id', contactId);

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

  console.log('Final Filtered Contacts:', filteredContacts);

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

<section className="contact-list">
  <div className="container">
    <div className="row d-flex">
      {filteredContacts.length > 0 &&
        filteredContacts.map((contact, index) => {
          return (
            <div className="col-md-4" key={contact.id}>
              <div className="d-flex h-100">
                <div className="card my-2 w-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-md-4">
                          {/* Content related to the contact's image or other details */}
                        </div>
                        <div className="col-md-7">
                          <ul className="list-group">
                            <li className="list-group-item list-group-item-action">
                              Name: <span className="fw-bold">{contact.name}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                              Mobile: <span className="fw-bold">{contact.phone}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                              Email: <span className="fw-bold">{contact.email}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-1 d-flex flex-column align-items-center mt-auto">
                      <Link
                        to={`/contacts/view/${contact.id}`}
                        className="btn btn-warning my-1"
                      >
                        <i className="fa fa-eye" />
                      </Link>
                      <Link
                        to={`/contacts/edit/${contact.id}`}
                        className="btn btn-primary my-1"
                      >
                        <i className="fa fa-pen" />
                      </Link>
                      <button
                        className="btn btn-danger my-1"
                        onClick={() => clickDelete(contact.id)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  </div>
</section>

      </React.Fragment>
      }

      
 
    </React.Fragment>
  )
};

export default ContactList;
