import React, { useEffect, useState } from 'react';
import './index.css';

export default function Main() {
  const [showing, setShowing] = useState(false);
  const [selectedButton, setSelectedButton] = useState(0);

  const stageImages = [
    'https://t3.ftcdn.net/jpg/03/67/62/24/360_F_367622414_caYXN5n4chd9XjDbMAFi5BnaHgRTsRzK.jpg',
    'https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png',
  ];

  function stageClicked(idx) {
    setSelectedButton(idx);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowing(true);
    }, 0);
  }, []);

  return (
    <main className='page'>
      <nav id='navBar'>
        <a href='/' className='navLink'>DentalSite</a>
        <div className='linksSection'>
          <a className='navLink' href='about'>About</a>
          <a className='navLink' href='contact'>Contact</a>
          <a className='navLink' href='/signup'>Sign Up</a>
        </div>
      </nav>
      <div className={`responsiveDiv ${showing ? 'showing' : ''}`}>
        <div id='mainSplash'>
          <h1>Booking Reimagined.</h1>
          <p>
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut
          </p>
          <div
            className={`buttonDiv responsiveDiv ${showing ? 'showing' : ''}`}
          >
            <button id='bookNow'>Book Now</button>
            <button id='learnMore'>Learn More</button>
          </div>
        </div>
        <div className='imageDiv'>
          <div className='imageBg'></div>
          <img
            height={280}
            width={400}
            src='https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png'
            alt='Some graphic here'
            style={{ border: '1px solid black' }}
          >
          </img>
        </div>
      </div>
      <div id='infoSection'>
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
            <img
              alt='Before'
              src='https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png'
            />
          </div>
          <div id='infoStages'>
            <h1>D</h1>
            <img
              src='https://cdn-icons-png.flaticon.com/512/159/159666.png'
              alt='Arrow'
            />
            <button
              onClick={() => stageClicked(0)}
              className={`${selectedButton === 0 ? 'selected' : ''}`}
            >
              Find your nearest provider
            </button>
            <img
              src='https://cdn-icons-png.flaticon.com/512/159/159666.png'
              alt='Arrow'
            />
            <button
              onClick={() => stageClicked(1)}
              className={`${selectedButton === 1 ? 'selected' : ''}`}
            >
              Schedule an appointment
            </button>
            <img
              src='https://cdn-icons-png.flaticon.com/512/159/159666.png'
              alt='Arrow'
            />
            <button
              onClick={() => stageClicked(2)}
              className={`${selectedButton === 2 ? 'selected' : ''}`}
            >
              Confirm your appointment
            </button>
            <img
              src='https://cdn-icons-png.flaticon.com/512/159/159666.png'
              alt='Arrow'
            />
            <button
              onClick={() => stageClicked(3)}
              className={`${selectedButton === 3 ? 'selected' : ''}`}
            >
              Leave a review
            </button>
            <img
              src='https://cdn-icons-png.flaticon.com/512/159/159666.png'
              alt='Arrow'
            />
            <button
              onClick={() => stageClicked(4)}
              className={`${selectedButton === 4 ? 'selected' : ''}`}
            >
              Return for a follow-up
            </button>
          </div>
          <div>
            <h2>After</h2>
            <img
              alt=''
              src='https://png.pngtree.com/png-vector/20220525/ourmid/pngtree-business-people-arranging-appointment-in-digital-booking-app-png-image_4739402.png'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
