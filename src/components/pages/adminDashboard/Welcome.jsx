import * as React from 'react';
import Title from './Title';


export default function Welcome({userInfo}) {
    
  return (
    <React.Fragment>
      <Title>Welcome {userInfo}</Title>
      
    </React.Fragment>
  );
}