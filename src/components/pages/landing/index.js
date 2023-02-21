import React from "react";
import "./index.css"

export default function Main() {
    return (
        <main className="page">
            <nav id="navBar">
                <a href="/" className="navLink">DentalSite</a>
                <div className="linksSection">
                    <a className="navLink" href="about">About</a>
                    <a className="navLink" href="contact">Contact</a>
                    <a className="navLink" href="/signup">Sign Up</a>
                </div>
            </nav>
            <div className="responsiveDiv">
                <div id="mainSplash">
                    <h1>Booking Reimagined.</h1> 
                    <p>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut</p>
                    <div className="buttonDiv responsiveDiv">
                        <button id="bookNow">Book Now</button>
                        <button id="learnMore">Learn More</button>
                    </div>
                </div>
                <div className="imageDiv">
                    <div className="imageBg"></div>
                    <img height={280} width={400} src="https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png" alt="Some graphic here" style={{border: '1px solid black'}}></img>
                </div>
            </div>
        </main>
    )
}
