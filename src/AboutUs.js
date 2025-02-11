import React from "react";
const AboutUs = () => {
  const teamMembers = [
    { name: "Rakshit, Niloufar, Minan", role: "Frontend Development" },
    { name: "Ashmin,  Soheil, Hiroki", role: "Backend Development" },
  ];

  return (
    <div className="container">
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are a team of passionate individuals
        dedicated to providing the best Vinyls to our customers. Our mission is
        to innovate and deliver excellence in everthing we do.
      </p>

      <h2>Our Team</h2>
      <div className="team">
        {teamMembers.map((member, index )=> (
            <div key={index} className="team-member">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
