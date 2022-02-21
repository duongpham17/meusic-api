import React from 'react';

import Header from './header';
import Introduction from './introduction';
import Information from './information';
import Get from './get/Get';

const Home = () => {
  return (
    <>
        <Header/>
        <Introduction/>
        <Information/>
        <Get />
    </>
  )
}

export default Home