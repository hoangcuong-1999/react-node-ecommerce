import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

function ContactModal({ contact }) {
  const [modalOpen, setModalOpen] = useState(false);
  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  return (
    <>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Link to="#" onClick={onOpenModal}>
        <i class="far fa-eye"></i>
      </Link>
      <Modal open={modalOpen} onClose={onCloseModal} center id="admin-modal">
        {/* name, email, subject, message
         */}
        <br />
        <div className="container" id="contact-modal">
          <div className="row mt-3">
            <div className="col-lg-3">
              <p>Sender name</p>
            </div>
            <div className="col-lg-9">
              <input
                className="form-control"
                type="text"
                disabled
                value={contact.name}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-3">
              <p>Sender email</p>
            </div>
            <div className="col-lg-9">
              <input
                className="form-control"
                type="text"
                disabled
                value={contact.email}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-3">
              <p>Subject</p>
            </div>
            <div className="col-lg-9">
              <input
                className="form-control"
                type="text"
                disabled
                value={contact.subject}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-3">
              <p>Message</p>
            </div>
            <div className="col-lg-9">
              <textarea
                className="form-control"
                rows="7"
                disabled
                value={contact.message}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ContactModal;
