import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../title/Title";
import { useDispatch, useSelector } from "react-redux";
import { listContact } from "../../actions/contactActions";
import LoadingBox from "../../components/LoadingBox";
import ErrorBox from "../../components/ErrorBox";
import ContactTable from "./ContactTable";
import axios from "axios";
//-------------------------------------------------------------

function ContactShow() {
  const [query, setQuery] = useState("");
  const searchColumns = ["name", "email"];
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const {
    contacts,
    loading: contactListLoading,
    error: contactListError,
  } = contactList;

  useEffect(() => {
    dispatch(listContact());
  }, [dispatch]);

  // Filter, take a function, this function return filtered array
  const search = (rows) => {
    return rows.filter(
      (row) =>
        searchColumns.length > 0 &&
        searchColumns.some(
          (column) =>
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
        )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/email/send-mail", { email: mail });
    console.log(data);
  };

  return (
    <>
      <section className="contact-show" id="contact-show">
        <Title>Contacts</Title>
        {/* <Breadcrumb link="Contacts" /> */}
        <div className="_breadcrumb">
          <Link to="/">Home</Link> / Contacts
        </div>
        <div className="product-table">
          <div className="product-table__options">
            <div className="options options__search">
              <form>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          {contactListLoading ? (
            <LoadingBox />
          ) : contactListError ? (
            <ErrorBox>{contactListError}</ErrorBox>
          ) : (
            <ContactTable contacts={search(contacts)} />
          )}
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="Enter destination email"
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactShow;
