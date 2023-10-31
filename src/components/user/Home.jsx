import React from 'react';
import AboutApp from './homePageComponents/AboutApp';
import KnowledgeCard from './homePageComponents/KnowledgeCard';
import AboutUs from './homePageComponents/AboutUs';
import Footer from './homePageComponents/Footer';

function Home() {
  return (
    <div className=''>
        <AboutApp />
        <KnowledgeCard />
        <AboutUs />
        <Footer />
    </div>
  )
}

export default Home
