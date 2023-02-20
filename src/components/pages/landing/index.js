import React from "react";
import "./index.css"

export default function Main() {
    return (
        <main>
            <nav id="navBar">
                <a href="/" className="navLink" style={{marginLeft: 50, fontSize: 59}}>DentalSite</a>
                <div style={{display: 'flex', justifyContent: 'space-evenly', width: 500, fontSize: 30}}>
                    <a className="navLink" href="about">About</a>
                    <a className="navLink" href="contact">Contact</a>
                    <a className="navLink" href="register">Sign Up</a>
                </div>
            </nav>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div id="mainSplash">
                    <h1>Booking Reimagined.</h1> 
                    <p>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut</p>
                    <div className="buttonDiv">
                        <button id="bookNow">Book Now</button>
                        <button id="learnMore">Learn More</button>
                    </div>
                </div>
                <div style={{height: 'inherit', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '50%'}}>
                    <img height={280} width={400} alt="Some graphic here" style={{border: '1px solid black'}}></img>
                </div>
            </div>
        </main>
    )
}
