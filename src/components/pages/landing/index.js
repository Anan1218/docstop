import React from "react";
import "./index.css"

export default function Main() {
    return (
        <main>
            <nav id="navBar">
                <a href="/" style={{marginLeft: 50, fontSize: 59}}>DentalSite</a>
                <div style={{display: 'flex', justifyContent: 'space-evenly', width: 500, fontSize: 30}}>
                    <a href="about">About</a>
                    <a href="contact">Contact</a>
                    <a href="register">Sign Up</a>
                </div>
            </nav>

            <div id="mainSplash">
                <h1>Booking Reimagined.</h1> 
                <p>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut</p>
                <div className="buttonDiv">
                    <button>Book Now</button>
                    <button>Learn More</button>
                </div>
            </div>
        </main>
    )
}
