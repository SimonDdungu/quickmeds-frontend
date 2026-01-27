import React from 'react'
import {WelcomeScreen } from '@/components/DashBoard'
import { DashHeading } from '@/components/Global'

const Dashboard = () => {
  return (
    <section>
      <DashHeading Title='Dashboard' />
      <WelcomeScreen />

      <p className='text-center mt-20'>
        {"Work in progress :)"}
      </p>

      </section>
  )
}

export default Dashboard