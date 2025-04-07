import React, { useState } from 'react';
import './VIPSignupPage.css';
import { Link } from 'react-router-dom';
import { FaRocket, FaNewspaper } from 'react-icons/fa';
// import HeroBackgroundImage from './assets/vv_lounge_form_bg_cornersofa.png';
import image1 from './assets/listeninglounge_vv_Vip.png';
import image2 from './assets/Listening_room_lounge.png';
import image3 from './assets/VIP_HERO_LANDING.jpeg';

const VIPSignupPage = () => {
    const monthlyPrice = '2.99';
    const galleryImages = [image1, image2, image3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupImageIndex, setPopupImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    const handleClickThumbnail = (index) => {
        setCurrentImageIndex(index);
    };

    const openPopup = (index) => {
        setPopupImageIndex(index);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handlePopupNext = () => {
        setPopupImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const handlePopupPrev = () => {
        setPopupImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <div id="vipSignupContainer" className="vip-signup-container single-bg-hero-theme">
            <header id="vipHeroSignup" className="hero">
                <div id="heroOverlay" className="hero-overlay">
                    <div id="heroContent" className="hero-content">
                        <h1 id="heroTitleVIPsignup">
                            <span className="step-into">JOIN </span>
                            <span className="the">The </span>
                            <span className="lounge">LOUNGE</span>
                        </h1>
                        <p id="heroIntro" className="hero-intro">Gain exclusive access to premium collections, special discounts, and members-only events as part of our VIP community!</p>
                    </div>
                </div>
            </header>

            <div id="signupContent" className="signup-content">
                <section className="subscription-details">
                    <h2>Unlock Exclusive Benefits for Just £{monthlyPrice}/month</h2>
                    <p className="perk">
                        <span className="perk-icon"><FaRocket /></span> Get Early Access to Pre-Orders: Secure those limited edition releases before anyone else!
                    </p>
                    <p className="perk">
                        <span className="perk-icon"><FaNewspaper /></span> Inside Scoop with Our VIP Newsletter: Receive exclusive news, behind-the-scenes content, and special offers directly to your inbox.
                    </p>
                </section>

                <section id="discountTiers" className="discount-tiers">
                    <h2 id="discountTiersTitle">Tiered Discount System</h2>
                    <p>Your VIP discount grows with your passion for vinyl:</p>
                    <ul id="discountList">
                        <li id="discountStandard">
                            <strong>Standard VIP (First Order):</strong> 10% off your initial purchase.
                        </li>
                        <li id="discountBronze">
                            <strong>Bronze VIP:</strong> 15% discount on all orders.
                        </li>
                        <li id="discountSilver">
                            <strong>Silver VIP:</strong> 20% discount on all orders.
                        </li>
                        <li id="discountGold">
                            <strong>Gold VIP:</strong> 25% discount on all orders.
                        </li>
                    </ul>
                </section>

                <section id="subscriptionOptions" className="subscription-options">
                    <h2 id="subscriptionOptionsTitle">Subscription Plans</h2>
                    <p>Choose the plan that suits your vinyl journey:</p>
                    <div id="plansContainer" className="plans-container">
                        <div id="monthlyPlan" className="plan">
                            <h3 id="monthlyPlanTitle">Monthly Subscription</h3>
                            <p id="monthlyPlanPrice" className="price">£X.XX / month</p> {/* Replace £X.XX */}
                            <p id="monthlyPlanDetails" className="details">
                                Enjoy all VIP benefits with a flexible monthly commitment.
                            </p>
                        </div>
                        <div id="annualPlan" className="plan popular">
                            <h3 id="annualPlanTitle">Annual Subscription</h3>
                            <p id="annualPlanPrice" className="price">
                                £Y.YY / year <span id="annualPlanSavings" className="savings">(Save Z%)</span>
                            </p>{" "}
                            {/* Replace £Y.YY and Z */}
                            <p id="annualPlanDetails" className="details">
                                Commit for a year and enjoy a discounted rate on your VIP membership.
                            </p>
                        </div>
                    </div>
                    <div id="heroButtons" className="hero-buttons">
                        <Link
                            id="joinMonthlyHero"
                            to="/payment/vip-monthly"
                            className="join-button hero-button monthly"
                        >
                            Join Monthly
                        </Link>
                        <Link
                            id="joinAnnualHero"
                            to="/payment/vip-annual"
                            className="join-button hero-button annual"
                        >
                            Join Annually
                        </Link>
                    </div>
                </section>

                <section id="howToJoin" className="how-to-join">
                    <h2 id="howToJoinTitle">Ready to Elevate Your Collection?</h2>
                    <p>Select your preferred subscription and join THE LOUNGE today!</p>
                    <p id="paymentInfo" className="payment-info">
                        You will be redirected to our secure payment gateway to complete your subscription.
                    </p>
                </section>
            </div>

            {/* Gallery at the bottom */}
            <section id="vipGallery" className="vip-gallery">
                <h2>Peek Inside our new private listening room</h2>
                <div className="image-gallery">
                    <div className="main-image-container" onClick={() => openPopup(currentImageIndex)}>
                        <img
                            src={galleryImages[currentImageIndex]}
                            alt={`Lounge Preview ${currentImageIndex + 1}`}
                            className="vip-image"
                        />
                    </div>
                    {galleryImages.length > 1 && (
                        <div className="thumbnail-strip">
                            {galleryImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                                    onClick={() => handleClickThumbnail(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* The Pop-up Overlay */}
            {isPopupOpen && (
                <div className={`gallery-popup-overlay open`} onClick={closePopup}>
                    <div className="gallery-popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="popup-close-button" onClick={closePopup}>&times;</button>
                        <img
                            src={galleryImages[popupImageIndex]}
                            alt={`Full Lounge Preview ${popupImageIndex + 1}`}
                        />
                        {galleryImages.length > 1 && (
                            <>
                                <button className="popup-navigation-button popup-prev-button" onClick={handlePopupPrev}>&lt;</button>
                                <button className="popup-navigation-button popup-next-button" onClick={handlePopupNext}>&gt;</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VIPSignupPage;
