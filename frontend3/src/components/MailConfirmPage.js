import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { verifyUser } from "../utils";
import Axios from "axios";

function MailConfirmPage(props) {
  // if (props.match.path === "/confirm/:confirmationCode") {
  //   verifyUser(props.match.params.confirmationCode);
  // }
  const confirmationCode = props.match.params.confirmationCode;
  useEffect(() => {
    Axios.get(`/api/auth/confirm/${confirmationCode}`);
  }, [confirmationCode]);

  return (
    <div className="mail-confirm">
      <div className="mail-confirm-box">
        <div className="mail-confirm-icon">
          <i class="fas fa-check"></i>
        </div>
        <div className="mail-confirm-text">Your email has been confirmed</div>
        <div className="mail-confirm-btn">
          <Link to="/signin">Go Signin</Link>
        </div>
      </div>
    </div>
  );
}

export default MailConfirmPage;
