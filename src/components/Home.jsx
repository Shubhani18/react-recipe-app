import React from 'react'
import Navbar from './Navbar'
import PopularSlider from './PopularSlider'
import TredingSlider from './TrendingSlider'

const Home = () => {
  return (
    <>
      <div className="main">
        <Navbar />
        <PopularSlider />
        <TredingSlider />
      </div>
    </>
  )
}

export default Home