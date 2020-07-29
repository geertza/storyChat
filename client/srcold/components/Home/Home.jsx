import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {

  return (
    <p style={{ fontSize: '32px' }}>
      Home Path Reached
      <Link to={'/about'}>
        Change Path to About page
      </Link>
    </p>
  );
};

export default Home;