import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

function UserModal({ profile }) {
  const [modalOpen, setModalOpen] = useState(false);
  const onOpenModal = () => setModalOpen(true);
  const onCloseModal = () => setModalOpen(false);

  return (
    <>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Link to="#" onClick={onOpenModal}>
        <i class="fas fa-user"></i>
      </Link>
      <Modal open={modalOpen} onClose={onCloseModal} center id="admin-modal">
        <div className="container" id="user-modal">
          <div className="row">
            {profile ? (
              <>
                <div className="col-lg-3"></div>
                <div className="col-lg-9">
                  <div className="user-modal__title">
                    <h3>User Profile</h3>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-lg-12">
                <div className="user-modal__title">
                  <h3 className="text-center">User Profile</h3>
                </div>
              </div>
            )}
          </div>

          {!profile ? (
            <h5 className="text-center mt-4">User do not set profile yet!</h5>
          ) : (
            <>
              <div className="row mt-4">
                <div className="col-lg-3">
                  <p>Full name</p>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    value={profile.name}
                    disabled
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-3">
                  <p>Phone number</p>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    value={profile.phone}
                    disabled
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-3">
                  <p>City</p>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    value={profile.city}
                    disabled
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-3">
                  <p>Province</p>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    value={profile.province}
                    disabled
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-3">
                  <p>Address</p>
                </div>
                <div className="col-lg-9">
                  <textarea
                    className="form-control"
                    value={profile.address}
                    rows="7"
                    disabled
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default UserModal;
