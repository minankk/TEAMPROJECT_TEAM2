import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <section className="banner">
        <div className="banner-content">
          {/* Placeholder for banner content */}
        </div>
      </section>

      <section className="content">
        <div className="section">
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
          <div className="item">Item 3</div>
        </div>
        <div className="section">
          <div className="item">Item 4</div>
          <div className="item">Item 5</div>
          <div className="item">Item 6</div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
