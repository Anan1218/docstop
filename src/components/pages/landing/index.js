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
            <h1>Booking Reimagined.</h1> 
        </main>
    )
}
