import React from "react";
import './TermsAndConditions.css';

const TermsAndConditions = () =>{
    return (
        <div className="terms-container">
            <h1>Terms and Conditions</h1>
            <p>Welcome to our terms and Conditions page. Please read carefully.</p>
            <ul>
                <li>1: You agree to not use this site for unlawful purpose</li>
                <li>2: We reserve the right to update these conditions anytime.</li>
                <li>3: The site owner reserves the right to terminate user access to the site without notice for any breach of these terms.</li>
                <li>4: Users' personal information will be handled according to the site's privacy policy.</li>
            </ul>
        </div>
    );
};
export default TermsAndConditions;
