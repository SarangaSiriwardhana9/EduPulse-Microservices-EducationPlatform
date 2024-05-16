import React from 'react'
import Banner from '../components/Home/Banner'
import Feature1 from '../components/Home/Featured/Feature1'
import Feature2 from '../components/Home/Featured/Feature2'
import Collaborate from '../components/Home/Collaborate'
import FillerDiv from '../components/Home/FillerDiv'
import Swiper from '../components/Home/Courses/Swiper'
import BecomeInstructor from '../components/Home/BecomeInstructor'
import EduPulseForBusiness from '../components/Home/EduPulseForBusiness'


export default function Home() {
  return (
    <div>
      <Banner />
      <Feature1 />
      <Collaborate/> 
      
      <FillerDiv />
      <Swiper />
      <BecomeInstructor />
      <EduPulseForBusiness />
      <Feature2 />
      
      
    </div>
  )
}
