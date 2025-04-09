import React, { useState } from 'react';
import './VIPSignupPage.css';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaNewspaper, FaArrowRight } from 'react-icons/fa';
import image1 from './assets/listeninglounge_vv_Vip.png';
import image2 from './assets/Listening_room_lounge.png';
import image3 from './assets/VIP_HERO_LANDING.jpeg';
import { jwtDecode } from 'jwt-decode';

const VIPSignupPage = () => {
    const monthlyPrice = '2.99';
    const annualPrice = '29.99';
    const annualSavings = '16%';
    const galleryImages = [image1, image2, image3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupImageIndex, setPopupImageIndex] = useState(0);

    const navigate = useNavigate();

    const handleSubscriptionClick = (planType) => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login', { state: { redirectTo: `/vip-payment?plan=${planType}` } });
            return;
        }

        try {
            jwtDecode(token); // Validate token
            navigate(`/vip-payment?plan=${planType}`);
        } catch (error) {
            localStorage.removeItem('token');
            navigate('/login', { state: { redirectTo: `/vip-payment?plan=${planType}` } });
        }
    };

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
                        <p id="heroIntro" className="hero-intro">
                            Gain exclusive access to premium collections, special discounts, and members-only events as part of our VIP community!
                        </p>
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
                            <strong>Bronze VIP:</strong> 15% discount on all orders (requires £50 total order history).
                        </li>
                        <li id="discountSilver">
                            <strong>Silver VIP:</strong> 20% discount on all orders (requires £100 total order history).
                        </li>
                        <li id="discountGold">
                            <strong>Gold VIP:</strong> 25% discount on all orders (requires £200 total order history).
                        </li>
                    </ul>
                </section>

                <section id="subscriptionOptions" className="subscription-options">
                    <h2 id="subscriptionOptionsTitle">Subscription Plans</h2>
                    <p>Choose the plan that suits your vinyl journey:</p>
                    <div id="plansContainer" className="plans-container">
                        <div
                            id="monthlyPlan"
                            className="plan monthly-plan-link"
                            onClick={() => handleSubscriptionClick('monthly')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubscriptionClick('monthly')}
                        >
                            <h3 id="monthlyPlanTitle">Monthly Subscription</h3>
                            <p id="monthlyPlanPrice" className="price">£{monthlyPrice} / month</p>
                            <p id="monthlyPlanDetails" className="details">
                                Enjoy all VIP benefits with a flexible monthly commitment.
                            </p>
                            <span className="arrow-icon"><FaArrowRight /></span>
                        </div>

                        <div
                            id="annualPlan"
                            className="plan popular annual-plan-link"
                            onClick={() => handleSubscriptionClick('annual')}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubscriptionClick('annual')}
                        >
                            <h3 id="annualPlanTitle">Annual Subscription</h3>
                            <p id="annualPlanPrice" className="price">
                                £{annualPrice} / year <span id="annualPlanSavings" className="savings">(Save {annualSavings})</span>
                            </p>
                            <p id="annualPlanDetails" className="details">
                                Commit for a year and enjoy a discounted rate on your VIP membership.
                            </p>
                            <span className="arrow-icon"><FaArrowRight /></span>
                        </div>
                    </div>
                    <div id="howToJoin" className="how-to-join combined-section">
                        <p id="paymentInfo" className="payment-info">
                            You will be redirected to our secure payment gateway to complete your subscription.
                        </p>
                    </div>
                </section>
            </div>

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
