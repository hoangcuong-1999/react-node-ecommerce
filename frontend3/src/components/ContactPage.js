import React, { useEffect, useState } from "react";
import { createContact } from "../actions/contactActions";
import BreadCrum from "./BreadCrum";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "./LoadingBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RESET_SEND_CONTACT_SUCCESS } from "../constants/contactConstants";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const contactCreate = useSelector((state) => state.contactCreate);
  const { loading, success } = contactCreate;

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO
    dispatch(createContact({ name, email, subject, message }));
    // After dispatch, check contact store state to show sweet alert
    // If success
    // if (success) {
    //   toast.success("Your message is sent successfully!", {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   setName("");
    //   setEmail("");
    //   setSubject("");
    //   setMessage("");
    // }
  };

  useEffect(() => {
    if (success) {
      toast.success("Your message is sent successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      // Reset success to false to avoid toastify load again when componentDidMount
      dispatch({ type: RESET_SEND_CONTACT_SUCCESS });
    }
  }, [success, dispatch]);

  return (
    <>
      <BreadCrum currenLink="Contact" />
      <section className="contact">
        <ToastContainer />
        <div className="container">
          <div className="contact__content d-flex justify-content-end">
            <div className="contact__content__info">
              <span className="contact__content__info__sm__text">
                Infomation
              </span>
              <h2>Contact Us</h2>
              <p className="mb-4">
                As you might expect of a company that began as a high-end
                interiors contractor, we pay strict attention.
              </p>
              <div className="contact__content__info__title">
                <span>
                  <i class="fas fa-map-marked"></i> Address
                </span>
                <p>Duong 30/4, quan Ninh Kieu, Thanh pho Can Tho</p>
              </div>
              <div className="contact__content__info__title">
                <span>
                  <i class="fas fa-phone"></i> Phone
                </span>
                <p>Mobile (+84): 0123456789</p>
                <p>Hostline: 0123 425 123</p>
              </div>
              <div className="contact__content__info__title">
                <span>
                  <i class="fas fa-envelope"></i> Email
                </span>
                <p>cuongb1706790@student.ctu.edu.vn</p>
                <p>personalacc@gmail.com</p>
              </div>
            </div>

            <div className="contact__content__form">
              <form onSubmit={handleSubmit}>
                <div className="contact__content__form__group">
                  <label>
                    Name<span>*</span>
                    <input
                      placeholder="Name"
                      type="text"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="contact__content__form__group">
                  <label>
                    Email<span>*</span>
                    <input
                      placeholder="Email"
                      type="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div className="contact__content__form__group">
                  <label>
                    Subject
                    <input
                      placeholder="Subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </label>
                </div>
                <div className="contact__content__form__group">
                  <label>
                    Message<span>*</span>
                    <textarea
                      placeholder="Message"
                      value={message}
                      required
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>
                </div>
                {loading ? (
                  <LoadingBox />
                ) : (
                  <button type="submit">Send Message</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
