import React, { useEffect } from "react";
import ContactModal from "../modal/ContactModal";
import { deleteContact, listContact } from "../../actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CONTACT_DELETE_RESET } from "../../constants/contactConstants";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";

function ContactTable({ contacts }) {
  const contactDelete = useSelector((state) => state.contactDelete);
  const { deletedContact, loading } = contactDelete;

  const dispatch = useDispatch();

  const deleteContactHandler = (contactId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this contact ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteContact(contactId));
      }
    });
  };

  useEffect(() => {
    if (deletedContact) {
      Swal.fire("Success!", "Your order is placed successfully.", "success");
      dispatch({ type: CONTACT_DELETE_RESET });
      dispatch(listContact());
    }
    // Else if error
  }, [deletedContact, dispatch]);

  return (
    <>
      {contacts.length ? (
        <table>
          <tr>
            <th className="contact__count">#</th>
            <th className="contact__name">Sender name</th>
            <th className="contact__email">Sender email</th>
            <th className="contact__subject">Subject</th>
            <th className="contact__message">Message</th>
            <th className="contact__actions">Actions</th>
          </tr>

          {contacts.map((contact, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
              <td>
                {/* <Link to="#">
                      <i class="far fa-eye"></i>
                    </Link> */}
                <ContactModal contact={contact} />
                {loading ? (
                  <LoadingBox />
                ) : (
                  <Link
                    to="#"
                    onClick={() => deleteContactHandler(contact._id)}
                  >
                    <i class="far fa-trash-alt"></i>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <table className="table__no__data">
          <tr>
            <th className="contact__count">#</th>
            <th className="contact__name">Sender name</th>
            <th className="contact__email">Sender email</th>
            <th className="contact__subject">Subject</th>
            <th className="contact__message">Message</th>
            <th className="contact__actions">Actions</th>
          </tr>
          <div className="table__no__data__img">
            <div className="table__no__data__img__wrapper">
              <img src="/assets/img/icon/not-found.png" alt="" />
            </div>
          </div>
          <div className="table__no__data__title">
            <h4>No Data</h4>
          </div>
        </table>
      )}
    </>
  );
}

export default ContactTable;
