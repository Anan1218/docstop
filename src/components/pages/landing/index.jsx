import React, { useEffect, useRef, useState } from 'react';
import './index.css';

export default function Main() {
    const [showing, setShowing] = useState(false);
    const [selectedButton, setSelectedButton] = useState(0);

    const beforeRef = useRef(null);

    const stageImages = [
        'https://t3.ftcdn.net/jpg/02/44/58/20/360_F_244582094_BTflxzaxlNDHk250JiOaPwAeC4487ns8.jpg',
        'https://t3.ftcdn.net/jpg/03/67/62/24/360_F_367622414_caYXN5n4chd9XjDbMAFi5BnaHgRTsRzK.jpg',
        'https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png',
        'data:image/png;base64,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',
        'https://cdn.fullestop.com/mobile-site/images/doctor-appointment.svg',
    ];

    function stageClicked(idx) {
        setSelectedButton(idx);
        beforeRef.current.src = stageImages[idx];
    }

    useEffect(() => {
        setTimeout(() => {
            setShowing(true);
        }, 0);
    }, []);

    return (
        <main className="page">
            <nav id="navBar">
                <a href="/" className="navLink">
                    DocStop
                </a>
                <div className="linksSection">
                    {/* <a className='navLink' href='about'>About</a>
          <a className='navLink' href='contact'>Contact</a> */}
                    <a className="navLink" href="mailto:info@docstop.co">
                        Sign Up
                    </a>
                </div>
            </nav>
            <div className={`responsiveDiv ${showing ? 'showing' : ''}`}>
                <div id="mainSplash">
                    <h1>Booking Reimagined.</h1>
                    <p>
                        <center>
                            Book appointments with local medical specialists in
                            the area.
                        </center>
                    </p>
                    <div
                        className={`buttonDiv responsiveDiv ${
                            showing ? 'showing' : ''
                        }`}
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'mailto:info@docstop.co';
                            }}
                            id="bookNow"
                        >
                            Join The Waitlist
                        </button>
                        {/* <button id="learnMore">Learn More</button> */}
                    </div>
                </div>
                <div className="imageDiv">
                    <div className="imageBg"></div>
                    <img
                        height={280}
                        width={400}
                        src="https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png"
                        alt="Some graphic here"
                        style={{ border: '1px solid black' }}
                    ></img>
                </div>
            </div>
            <div id="infoSection">
                <h1>Your experience will never be the same.</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div>
                        <h2>Before</h2>
                        <div>
                            <img
                                ref={beforeRef}
                                width={460}
                                alt="Before"
                                src="https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png"
                            />
                        </div>
                    </div>
                    <div id="infoStages">
                        <button
                            onClick={() => stageClicked(0)}
                            className={`${
                                selectedButton === 0 ? 'selected' : ''
                            }`}
                        >
                            Find your nearest provider
                        </button>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/159/159666.png"
                            alt="Arrow"
                        />
                        <button
                            onClick={() => stageClicked(1)}
                            className={`${
                                selectedButton === 1 ? 'selected' : ''
                            }`}
                        >
                            Schedule an appointment
                        </button>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/159/159666.png"
                            alt="Arrow"
                        />
                        <button
                            onClick={() => stageClicked(2)}
                            className={`${
                                selectedButton === 2 ? 'selected' : ''
                            }`}
                        >
                            Confirm your appointment
                        </button>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/159/159666.png"
                            alt="Arrow"
                        />
                        <button
                            onClick={() => stageClicked(3)}
                            className={`${
                                selectedButton === 3 ? 'selected' : ''
                            }`}
                        >
                            Leave a review
                        </button>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/159/159666.png"
                            alt="Arrow"
                        />
                        <button
                            onClick={() => stageClicked(4)}
                            className={`${
                                selectedButton === 4 ? 'selected' : ''
                            }`}
                        >
                            Return for a follow-up
                        </button>
                    </div>
                    <div>
                        <h2>After</h2>
                        <img
                            width={460}
                            alt=""
                            src="https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
