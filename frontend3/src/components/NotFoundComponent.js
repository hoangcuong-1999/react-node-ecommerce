import React from "react";
import { Link } from "react-router-dom";

function NotFoundComponent() {
  return (
    <>
      <section id="notfound">
        <div className="notfound-wrapper">
          <div className="notfound-content">
            <h1 data-text="404">404</h1>
            <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <div className="notfound-btn">
              <Link to="/">Return home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundComponent;
